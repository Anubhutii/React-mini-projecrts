import { useState, useEffect } from "react";
import ParticlesBackground from "../sections/ParticlesBackground";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import resume from "../../assets/Anubhuti-resume .pdf";
import profile from "../../assets/Anubhuti.jpeg";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiMysql,
} from "react-icons/si";

const Hero = () => {
  const [radius, setRadius] = useState(225);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 480) {
        setRadius(115); // Small mobile
      } else if (window.innerWidth < 640) {
        setRadius(140); // Large mobile
      } else if (window.innerWidth < 768) {
        setRadius(170); // Tablets/Small desktop
      } else if (window.innerWidth < 1024) {
        setRadius(200); // Medium screen
      } else {
        setRadius(225); // Large desktop
      }
    };
    
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const techIcons = [
    { icon: <FaHtml5 />, color: "#E34F26" },          // HTML
    { icon: <FaCss3Alt />, color: "#1572B6" },        // CSS
    { icon: <FaJs />, color: "#F7DF1E" },             // JavaScript
    { icon: <FaReact />, color: "#61DAFB" },          // React
    { icon: <SiTailwindcss />, color: "#06B6D4" },    // Tailwind
    { icon: <FaBootstrap />, color: "#7952B3" },      // Bootstrap
    { icon: <FaNodeJs />, color: "#339933" },         // Node
    { icon: <SiExpress />, color: "#FFFFFF" },        // Express
    { icon: <SiMongodb />, color: "#47A248" },        // MongoDB
    { icon: <SiMysql />, color: "#4479A1" },          // MySQL
    { icon: <FaGithub />, color: "#FFFFFF" },         // GitHub
  ];
  
  const isMobile = window.innerWidth < 640;

  const orbitSize =  window.innerWidth < 640 ? radius * 2.8 : radius * 2;
  const profileSize = Math.floor(radius * (window.innerWidth < 640 ? 1.9 : 1.5));
  const containerSize = radius * 2 + 60;

  

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712] text-white min-w-[320px] py-20 lg:py-0">
      <ParticlesBackground />

      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-500/20 blur-[100px] sm:blur-[140px] z-0" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-600/20 blur-[100px] sm:blur-[140px] z-0" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row w-full">

        {/* LEFT */}
        <div className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start w-full">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <p className="text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
              Available for Freelance & Full-Time Opportunities
            </p>
          </div>

          <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">Anubhutii</span> — <br />
            <span className="text-gray-300 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl">Full Stack Developer & UI Enthusiast</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-gray-300">
            I design and develop fast, scalable, and visually engaging web
            applications using React, Next.js, TypeScript, Node.js, and MongoDB.
            My focus is creating intuitive user experiences backed by clean,
            maintainable code.
          </p>

          <button
            onClick={() => window.open(resume, "_blank")}
            className="mt-6 flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 sm:px-7 sm:py-4 font-semibold transition hover:bg-cyan-400 text-sm sm:text-base cursor-pointer"
          >
            Preview Resume
            <Eye size={20} />
          </button>
        </div>

        {/* RIGHT */}
        <div 
          className="relative flex items-center justify-center w-full"
          style={{ height: `${containerSize}px` }}
        >
          {/* Glow */}
          <div 
            className="absolute rounded-full bg-cyan-500/20 blur-[80px] sm:blur-[100px]"
            style={{ 
              width: `${Math.floor(containerSize * 0.73)}px`, 
              height: `${Math.floor(containerSize * 0.73)}px` 
            }}
          />

          {/* Profile Image */}
          <motion.div 
            className="relative z-20 rounded-full overflow-hidden border-4 border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,.2)] sm:shadow-[0_0_60px_rgba(34,211,238,.25)]"
            animate={{
              y: [0, -12, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ 
              width: `${profileSize}px`, 
              height: `${profileSize}px` 
            }}
          >
            <img
              src={profile}
              alt="Anubhutii"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Orbit */}
          <div 
            className="absolute"
            style={{ 
              width: `${orbitSize}px`, 
              height: `${orbitSize}px` 
            }}
          >
            <svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 500 500"
>
  <defs>
    <linearGradient
      id="orbitGradient"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="100%"
    >
      <stop offset="0%" stopColor="#38bdf8" />
      <stop offset="50%" stopColor="#8b5cf6" />
      <stop offset="100%" stopColor="#f59e0b" />
    </linearGradient>
  </defs>

  {isMobile ? (
    <circle
      cx="250"
      cy="250"
      r="225"
      fill="none"
      stroke="url(#orbitGradient)"
      strokeWidth="3"
      strokeDasharray="8 8"
    />
  ) : (
    <path
      d="M250 25 A225 225 0 0 1 250 475"
      fill="none"
      stroke="url(#orbitGradient)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  )}
</svg>

            {techIcons.map((item, index) => {
              let angle;

if (isMobile) {
  // Full circle
  angle = (index * 360) / techIcons.length - 90;
} else {
  // Half circle
  const startAngle = -90;
  const endAngle = 90;

  angle =
    startAngle +
    (index * (endAngle - startAngle)) /
      (techIcons.length - 1);
}
              const rad = (angle * Math.PI) / 180;
              const r = 225; // radius in the 500x500 viewBox

              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);

              const percentX = ((250 + x) / 500) * 100;
              const percentY = ((250 + y) / 500) * 100;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute flex items-center justify-center
                             w-12 h-12 lg:w-14 lg:h-14
                             -translate-x-1/2 -translate-y-1/2
                             rounded-full
                             bg-[#0f172a]
                             border border-white/10
                             backdrop-blur-xl
                             shadow-[0_0_20px_rgba(255,255,255,.08)]"
                  style={{
                    left: `${percentX}%`,
                    top: `${percentY}%`,
                  }}
                >
                  <span
                    className="text-[24px] lg:text-[28px]"
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
        ↓
      </div>
    </section>
  );
};

export default Hero;