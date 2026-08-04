import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TypeAnimation } from "react-type-animation";

import {
  FaWhatsapp,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { Copy, Check, ExternalLink, X} from "lucide-react";

import Profile from "../assets/Anubhuti.jpeg";

import {
  FaReact,
  FaNodeJs,
  
} from "react-icons/fa";

import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
} from "react-icons/si";

const techStack = [
  {
    icon: <FaReact className="text-sky-400 text-2xl" />,
    title: "React",
    desc: "Interactive UI",
    project: "10+ Projects",
    cardBg: "bg-gradient-to-b from-sky-500/20 via-sky-500/5 to-slate-950/80 border-sky-400/30 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/20",
    badgeClass: "border-sky-400/40 bg-sky-500/20 text-sky-300 font-semibold shadow-sky-500/10",
    glowColor: "bg-sky-400/30",
  },
  {
    icon: <SiTypescript className="text-blue-400 text-2xl" />,
    title: "TypeScript",
    desc: "Type Safety",
    project: "Learning",
    cardBg: "bg-gradient-to-b from-blue-500/20 via-blue-500/5 to-slate-950/80 border-blue-400/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20",
    badgeClass: "border-blue-400/40 bg-blue-500/20 text-blue-300 font-semibold shadow-blue-500/10",
    glowColor: "bg-blue-400/30",
  },
  {
    icon: <SiTailwindcss className="text-cyan-400 text-2xl" />,
    title: "Tailwind",
    desc: "Modern UI",
    project: "Responsive",
    cardBg: "bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-slate-950/80 border-cyan-400/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20",
    badgeClass: "border-cyan-400/40 bg-cyan-500/20 text-cyan-300 font-semibold shadow-cyan-500/10",
    glowColor: "bg-cyan-400/30",
  },
  {
    icon: <FaNodeJs className="text-emerald-400 text-2xl" />,
    title: "Node.js",
    desc: "REST APIs",
    project: "Backend",
    cardBg: "bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-slate-950/80 border-emerald-400/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20",
    badgeClass: "border-emerald-400/40 bg-emerald-500/20 text-emerald-300 font-semibold shadow-emerald-500/10",
    glowColor: "bg-emerald-400/30",
  },
  {
    icon: <SiExpress className="text-purple-300 text-2xl" />,
    title: "Express",
    desc: "Server Side",
    project: "API Dev",
    cardBg: "bg-gradient-to-b from-purple-500/20 via-purple-500/5 to-slate-950/80 border-purple-400/30 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20",
    badgeClass: "border-purple-400/40 bg-purple-500/20 text-purple-300 font-semibold shadow-purple-500/10",
    glowColor: "bg-purple-400/30",
  },
  {
    icon: <SiMongodb className="text-green-400 text-2xl" />,
    title: "MongoDB",
    desc: "Database",
    project: "NoSQL",
    cardBg: "bg-gradient-to-b from-green-500/20 via-green-500/5 to-slate-950/80 border-green-400/30 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20",
    badgeClass: "border-green-400/40 bg-green-500/20 text-green-300 font-semibold shadow-green-500/10",
    glowColor: "bg-green-400/30",
  },
  {
    icon: <SiNextdotjs className="text-pink-300 text-2xl" />,
    title: "Next.js",
    desc: "SSR",
    project: "Learning",
    cardBg: "bg-gradient-to-b from-pink-500/20 via-pink-500/5 to-slate-950/80 border-pink-400/30 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20",
    badgeClass: "border-pink-400/40 bg-pink-500/20 text-pink-300 font-semibold shadow-pink-500/10",
    glowColor: "bg-pink-400/30",
  },
  {
    icon: <FaGithub className="text-indigo-300 text-2xl" />,
    title: "GitHub",
    desc: "Version Control",
    project: "Daily",
    cardBg: "bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-slate-950/80 border-indigo-400/30 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20",
    badgeClass: "border-indigo-400/40 bg-indigo-500/20 text-indigo-300 font-semibold shadow-indigo-500/10",
    glowColor: "bg-indigo-400/30",
  },
];
const About = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("s.anubhuti25@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-[#070B1E] text-white py-12 md:py-24 px-6">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />

      {/* Interactive Email Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsEmailModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0B1024] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-500/20 to-pink-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg">
                  <MdEmail size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Let's Connect via Email</h3>
                  <p className="text-xs text-slate-400">Choose your preferred email action</p>
                </div>
              </div>

              {/* Email Display & Copy Box */}
              <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-2">
                <div className="truncate">
                  <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Email Address</p>
                  <p className="text-sm font-bold text-cyan-300 truncate">s.anubhuti25@gmail.com</p>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Actions */}
              <div className="space-y-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=s.anubhuti25@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 text-white font-semibold text-sm transition-all group shadow-lg"
                >
                  <span className="flex items-center gap-2.5">
                    <MdEmail className="text-red-400 text-lg" />
                    Compose in Gmail Web
                  </span>
                  <ExternalLink size={15} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium shadow-lg shadow-cyan-500/5">
            <span>👋 About Me</span>
          </div>
        </motion.div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
  <motion.div
    whileHover={{
      rotateX: 8,
      rotateY: -8,
      scale: 1.04,
    }}
    transition={{
      type: "spring",
      stiffness: 250,
      damping: 18,
    }}
    style={{
      transformStyle: "preserve-3d",
      perspective: 1000,
    }}
    className="relative"
  >
    {/* Glow */}
    <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-3xl" />

    {/* Gradient Border */}
    <div className="rounded-[32px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-[2px]">

      {/* Glass Card */}
      <div className="relative rounded-[30px] bg-[#0B1024]/90 backdrop-blur-2xl border border-white/10 overflow-hidden">

        {/* Top Reflection */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/20 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute top-5 left-5 w-3 h-3 rounded-full bg-red-400/80" />
        <div className="absolute top-5 left-11 w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="absolute top-5 left-[68px] w-3 h-3 rounded-full bg-green-400/80" />

        {/* Image */}
        <img
          src={Profile}
          alt="Anubhuti"
          className="w-[340px] md:w-[420px] object-cover"
        />

        {/* Bottom Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#070B1E] via-[#070B1E]/60 to-transparent p-6">

          <h3 className="text-xl font-bold text-white">
            Anubhuti
          </h3>

          <p className="text-cyan-400 text-sm mt-1">
            MERN Stack Developer
          </p>

        </div>

      </div>
    </div>

    {/* Floating Badge */}
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
      }}
      className="absolute -top-5 -right-5 px-5 py-2 rounded-full bg-cyan-500 text-white text-sm font-semibold shadow-xl"
    >
      🚀 Open to Work
    </motion.div>

    {/* Experience Card */}
   

 {/* Desktop Badge */}
<motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
      }}
      className="absolute -bottom-5 -left-5 px-5 py-1 rounded-full bg-white text-cyan-500 text-md font-semibold shadow-xl"
    >
       10+ Projects
    </motion.div>

              </motion.div>
              </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            viewport={{ once: true }}
          >

            <h3 className="text-3xl md:text-3xl font-bold mb-4 mt-8 md:mt-0">
  Hi, I'm{" "}
  <span className="text-green-400">
    Anubhuti 👋
  </span>
</h3>

<div className="text-lg md:text-xl font-semibold h-10">
  <TypeAnimation
    sequence={[
      "I'm a Frontend Developer",
      1500,
      "I'm a React.js Developer",
      1500,
      "I'm a MERN Stack Developer",
      1500,
      "I'm a Full Stack Developer",
      1500,
    ]}
    wrapper="span"
    speed={60}
    repeat={Infinity}
    className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
  />
</div>

            <p className="text-gray-300 leading-8 text-md mb-4">
  I'm a passionate MERN Stack Developer who loves transforming ideas into
  modern, responsive, and high-performance web applications. I specialize in
  building scalable solutions using <span className="text-cyan-400">React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS</span>, and modern JavaScript, with a strong focus on clean code, intuitive UI/UX, REST APIs. 
</p>

            <p className="text-gray-300 leading-8 mb-4">
  Started with a curiosity for web development and evolved into a passion for
  building <span className="text-cyan-400">modern MERN Stack</span> applications.
  I enjoy creating <span className="text-cyan-400">responsive</span>,
  <span className="text-cyan-400"> scalable</span>, and
  <span className="text-cyan-400"> high-performance</span> digital experiences.
</p>

            <div className="space-y-8">

  {/* Personal Info Card */}

  <div className="border border-cyan-500/30 rounded-2xl bg-white/5 backdrop-blur-xl p-6">

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">

      <div>
        <span className="font-semibold text-white">Name:</span>{" "}
        <span className="text-gray-400">Anubhuti Singh</span>
      </div>

      <div>
        <span className="font-semibold text-white">Location:</span>{" "}
        <span className="text-gray-400">Noida, India</span>
      </div>

      <div>
        <span className="font-semibold text-white">Email:</span>{" "}
        <span className="text-gray-400">s.anubhuti25@gmail.com</span>
      </div>

      <div>
        <span className="font-semibold text-white">Availability:</span>{" "}
        <span className="text-green-400">Open to Work</span>
      </div>

      <div>
        <span className="font-semibold text-white">Experience:</span>{" "}
        <span className="text-gray-400">Fresher / Entry-Level</span>
      </div>

      <div>
        <span className="font-semibold text-white">Role:</span>{" "}
        <span className="text-cyan-400">
          MERN Stack Developer
        </span>
      </div>

    </div>
  </div>

  {/* Social Icons */}

  <div className="flex items-center justify-center gap-5">

    <a
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300"
    >
      <FaWhatsapp size={22} />
    </a>

    <a
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all duration-300"
    >
      <FaInstagram size={22} />
    </a>

    <a
      href="https://github.com/Anubhutii"
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all duration-300"
    >
      <FaGithub size={22} />
    </a>

    <a
      href="https://www.linkedin.com/in/anubhuti-s-3402b1299"
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300"
    >
      <FaLinkedin size={22} />
    </a>

    <button
      onClick={() => setIsEmailModalOpen(true)}
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all duration-300 cursor-pointer"
      title="Contact via Email"
    >
      <MdEmail size={22} />
    </button>

  </div>

</div>

          </motion.div>

        </div>

      </div>
      <section className="mt-2">

  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
    My <span className="text-cyan-400">Tech Stack</span>
  </h2>

  <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4">

    {techStack.map((tech, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        whileHover={{
          y: -8,
          scale: 1.05,
        }}
        className={`group relative w-[140px] h-[165px] flex-shrink-0 overflow-hidden rounded-2xl border backdrop-blur-xl p-4 transition-all duration-300 shadow-xl ${tech.cardBg}`}
      >

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full blur-3xl ${tech.glowColor}`} />
        </div>

        <div className="relative z-10 flex flex-col items-center h-full text-center">

          {/* Icon */}
          <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
            {tech.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold">
            {tech.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs text-gray-400 leading-5">
            {tech.desc}
          </p>

          {/* Colorful Badge */}
          <span className={`mt-auto rounded-full border px-3 py-1 text-[11px] backdrop-blur-md shadow-sm transition-all ${tech.badgeClass}`}>
            {tech.project}
          </span>

        </div>

      </motion.div>
    ))}

  </div>

</section>
    </section>
    
  );
};

export default About;