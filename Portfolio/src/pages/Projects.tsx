import { useState } from "react";
import { motion } from "framer-motion";

import { projects } from "../data/projects";
import { categories } from "../data/categories";
import ProjectCard from "../components/layout/ProjectCard";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const Projects = () => {

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
  activeCategory === "All"
    ? projects
    : projects.filter(
        (project) => project.category === activeCategory
      );

  return (
    <section className="relative overflow-hidden py-24 bg-[#050816]">
      {/* Background */}
      <div className="absolute -left-40 top-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-500/10 blur-[160px]" />

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-cyan-400 uppercase tracking-[6px] text-sm mb-3">
            My Work
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Here are some projects I've built using modern technologies,
            focusing on beautiful UI, performance, and scalable architecture.
          </p>
        </motion.div>

        {/* Featured Project */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="flex justify-center mb-10"
>
  <div className="flex flex-wrap justify-center gap-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`px-5 py-2 rounded-xl transition-all duration-300 font-medium ${
          activeCategory === category
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
            : "text-slate-400 hover:text-white hover:bg-white/10"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
</motion.div>

        {/* Other Projects */}
          <div className="relative">

  {/* Left Arrow */}
  <button className="project-prev absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition flex items-center justify-center text-white">
    <ChevronLeft size={22} />
  </button>

  <Swiper
    modules={[Navigation]}
    navigation={{
      prevEl: ".project-prev",
      nextEl: ".project-next",
    }}
    spaceBetween={25}
    slidesPerView={3}
    breakpoints={{
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    }}
  >
    {filteredProjects.map((project, index) => (
      <SwiperSlide key={index}>
        <ProjectCard project={project} index={index} />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Right Arrow */}
  <button className="project-next absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition flex items-center justify-center text-white">
    <ChevronRight size={22} />
  </button>

</div>
      </div>
    </section>
  );
};

export default Projects;