import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Project {
  title: string;
  category: string;
  description: string;
  images: string[];
  tech: string[];
  github: string;
  live: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-[480px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

      {/* Swiper Image Carousel */}
      <div className="relative w-full h-56 overflow-hidden bg-slate-900">
        {project.images && project.images.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect={"fade"}
            fadeEffect={{ crossFade: true }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500 + index * 500, // Staggered delay for multiple cards
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {project.images.map((img, imgIndex) => (
              <SwiperSlide key={imgIndex} className="w-full h-full">
                <img
                  src={img}
                  alt={`${project.title} screenshot ${imgIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 text-sm">
            No Images Available
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-cyan-300 bg-black/60 border border-cyan-500/30 backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-3">
          {project.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 h-24 overflow-y-auto pr-2 card-description">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
          {project.tech.map((techItem, techIndex) => (
            <span
              key={techIndex}
              className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/20 hover:text-cyan-300 transition-all duration-300"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          {project.github && project.github !== "#" ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 font-medium text-sm"
            >
              <FaGithub size={18} />
              Code
            </a>
          ) : (
            <span className="flex items-center gap-2 text-slate-600 cursor-not-allowed font-medium text-sm">
              <FaGithub size={18} />
              Private Code
            </span>
          )}

          {project.live && project.live !== "#" ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            >
              Live Demo
              <FaExternalLinkAlt size={13} className="ml-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 cursor-not-allowed">
              Internal Only
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;