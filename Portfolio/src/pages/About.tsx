import { motion } from "framer-motion";

import { TypeAnimation } from "react-type-animation";

import {
  FaWhatsapp,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

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
    icon: <FaReact className="text-sky-400 text-lg" />,
    title: "React",
    desc: "Interactive UI",
    project: "10+ Projects",
  },
  {
    icon: <SiTypescript className="text-blue-500 text-lg" />,
    title: "TypeScript",
    desc: "Type Safety",
    project: "Learning",
  },
  {
    icon: <SiTailwindcss className="text-cyan-400 text-lg" />,
    title: "Tailwind",
    desc: "Modern UI",
    project: "Responsive",
  },
  {
    icon: <FaNodeJs className="text-green-500 text-lg" />,
    title: "Node.js",
    desc: "REST APIs",
    project: "Backend",
  },
  {
    icon: <SiExpress className="text-gray-300 text-lg" />,
    title: "Express",
    desc: "Server Side",
    project: "API Dev",
  },
  {
    icon: <SiMongodb className="text-green-600 text-lg" />,
    title: "MongoDB",
    desc: "Database",
    project: "NoSQL",
  },
  {
    icon: <SiNextdotjs className="text-white text-lg" />,
    title: "Next.js",
    desc: "SSR",
    project: "Learning",
  },
  {
    icon: <FaGithub className="text-white text-lg" />,
    title: "GitHub",
    desc: "Version Control",
    project: "Daily",
  },
];
const About = () => {
  return (
    <section className="relative overflow-hidden min-h-screen bg-[#070B1E] text-white py-24 px-6">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm">
  <span>👋 About Me</span>
</div>
        </motion.div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-2 gap-1 items-center ">

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
    y: [0, 8, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 4,
  }}
  className="
    hidden md:block
    absolute
    -bottom-6
    -left-6
    bg-[#10162F]
    border border-white/10
    backdrop-blur-xl
    rounded-2xl
    px-5 py-4
    shadow-xl
    z-30
  "
>
  <p className="text-2xl font-bold text-cyan-400">
    10+
  </p>

  <p className="text-xs text-gray-300">
    Projects Built
  </p>
</motion.div>

{/* Mobile Badge */}
<motion.div
  animate={{
    y: [0, 8, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 4,
  }}
  className="
    md:hidden
    absolute
    bottom-3
    right-3
    bg-[#10162F]/90
    border border-white/10
    backdrop-blur-xl
    rounded-xl
    px-3 py-2
    shadow-xl
    z-30
  "
>
  <p className="text-lg font-bold text-cyan-400">
    10+
  </p>

  <p className="text-[10px] text-gray-300">
    Projects
  </p>
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

            <h3 className="text-3xl md:text-4xl font-bold mb-4 mt-8 md:mt-0">
  Hi, I'm{" "}
  <span className="text-green-400">
    Anubhuti 👋
  </span>
</h3>

<div className="text-xl md:text-3xl font-semibold h-12">
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

            <p className="text-gray-300 leading-8 text-lg mb-6">
  I'm a passionate MERN Stack Developer who loves transforming ideas into
  modern, responsive, and high-performance web applications. I specialize in
  building scalable solutions using <span className="text-cyan-400">React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS</span>, and modern JavaScript, with a strong focus on clean code, intuitive UI/UX, REST APIs. 
</p>

            <p className="text-gray-300 leading-8 mb-10">
               My journey into web development began with a simple curiosity about how
  websites are built. Today, I specialize in developing modern MERN stack
  applications with a strong focus on performance, responsive design, and clean
  architecture. I’m always exploring new technologies to create better digital
  experiences.
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
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300"
    >
      <FaWhatsapp size={22} />
    </a>

    <a
      href="https://instagram.com/anubhuti._.singh"
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

    <a
      href="mailto:s.anubhuti25@gmail.com"
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:scale-110 transition-all duration-300"
    >
      <MdEmail size={22} />
    </a>

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
        className="group relative w-[140px] h-[160px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 hover:border-cyan-400/40 transition-all duration-300"
      >

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-cyan-500/20 blur-3xl" />
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

          {/* Badge */}
          <span className="mt-auto rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] text-cyan-300">
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