import { useState } from "react";
import { motion } from "framer-motion";

import { projects } from "../data/projects";
import { categories } from "../data/categories";
import ProjectCard from "../components/layout/ProjectCard";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Projects = () => {

  const [activeCategory, setActiveCategory] = useState("All");
  const [swiper, setSwiper] = useState<any>(null);

  const filteredProjects =
  activeCategory === "All"
    ? projects
    : projects.filter(
        (project) => project.category === activeCategory
      );

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#050816]">
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
          <p className="text-cyan-400 uppercase tracking-[6px] text-xs md:text-sm mb-3">
            My Work
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-slate-400 mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg">
            Here are some projects I've built using modern technologies,
            focusing on beautiful UI, performance, and scalable architecture.
          </p>
        </motion.div>

        {/* Featured Project Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10 w-full px-2"
        >
          <div className="flex gap-2 md:gap-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-1.5 md:p-2 max-w-full overflow-x-auto no-scrollbar scroll-smooth">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 rounded-xl transition-all duration-300 font-semibold text-xs md:text-sm cursor-pointer ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Other Projects Slider */}
        <div className="relative px-2 md:px-0">
          {/* Left Arrow (only visible on large desktops) */}
          <button className="project-prev hidden xl:flex absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition items-center justify-center text-white cursor-pointer">
            <ChevronLeft size={22} />
          </button>

          <Swiper
            onSwiper={setSwiper}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".project-prev",
              nextEl: ".project-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            spaceBetween={25}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
            }}
            className="pb-16"
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide key={index} className="h-auto">
                <ProjectCard project={project} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile/Tablet Navigation Dock (Below the slider) */}
          <div className="flex xl:hidden justify-center items-center mt-6">
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg shadow-cyan-500/5">
              <button 
                onClick={() => swiper?.slidePrev()}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="flex flex-col items-center px-1">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[2px] animate-pulse">
                  Swipe Projects
                </span>
                <span className="text-[8px] text-slate-500 font-medium tracking-[1px] mt-0.5">
                  or use arrows
                </span>
              </div>

              <button 
                onClick={() => swiper?.slideNext()}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all duration-300 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Arrow (only visible on large desktops) */}
          <button className="project-next hidden xl:flex absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-400 transition items-center justify-center text-white cursor-pointer">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;