import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import type { ExperienceItem } from "../../data/experience";

interface ExperienceContentProps {
  item: ExperienceItem;
}

const ExperienceContent = ({ item }: ExperienceContentProps) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

        {/* Top Image */}

        <div className="relative h-[280px] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
        </div>

        {/* Content */}

        <div className="p-8">

          <h2 className="text-4xl font-bold text-white">
            {item.title}
          </h2>

          <p className="text-cyan-400 mt-2 text-lg">
            {item.subtitle}
          </p>

          <div className="flex flex-wrap gap-6 mt-6 text-slate-400">

            <div className="flex items-center gap-2">
              <Building2 size={18} />
              {item.subtitle}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {item.duration}
            </div>

          </div>

          <p className="text-slate-300 leading-8 mt-8">
            {item.description}
          </p>

          {/* Skills */}

          <div className="mt-8">

            <h3 className="text-white font-semibold mb-4">
              Skills & Technologies
            </h3>

            <div className="flex flex-wrap gap-3">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ExperienceContent;