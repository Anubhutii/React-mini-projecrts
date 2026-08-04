import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Building2,
  Sparkles,
  Code2,
  Award,
  CheckCircle2,
  GraduationCap,
  FileText,
  ExternalLink,
  FolderGit2,
  Layers,
  MapPin,
  Briefcase,
  ShieldCheck,
  BookOpen,
  Check,
  CheckCircle,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import { experienceData } from "../data/experience";

const Experience = () => {
  const categories = useMemo(
    () => experienceData.map((item) => item.category),
    []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const activeItem = useMemo(() => {
    return experienceData.find((item) => item.category === activeCategory);
  }, [activeCategory]);

  const isEducation = useMemo(() => {
    if (!activeItem?.category) return false;
    const cat = activeItem.category.toLowerCase();
    return (
      cat.includes("graduation") ||
      cat.includes("diploma") ||
      cat.includes("b.tech") ||
      cat.includes("education")
    );
  }, [activeItem]);

  const isInternship = useMemo(() => {
    return (
      activeItem?.category.toLowerCase().includes("internship") ||
      Boolean(activeItem?.projectsWorkedOn)
    );
  }, [activeItem]);

  return (
    <section className="relative min-h-screen bg-[#050816] overflow-hidden py-16 md:py-24">
      {/* Background Blur Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="uppercase tracking-[6px] text-cyan-400 text-xs sm:text-sm font-semibold mb-3">
            My Journey
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Experience &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Explore my academic qualifications, professional milestones, and technical accomplishments.
          </p>
        </motion.div>

        {/* Main Layout Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
          {/* Sidebar Navigation */}
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          {/* Details Card */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl overflow-hidden hover:border-cyan-500/30 transition-colors duration-500 min-h-[420px] lg:h-[580px] flex flex-col"
                >
                  {/* Background Glow */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

                  {/* Header Row (Fixed at Top): Category Badge, Location, Title, Subtitle, & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10 shrink-0">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                          {isEducation ? (
                            <GraduationCap size={14} className="text-cyan-400" />
                          ) : (
                            <Briefcase size={14} className="text-cyan-400" />
                          )}
                          {activeItem.category}
                        </div>

                        {activeItem.location && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10">
                            <MapPin size={13} className="text-cyan-400" />
                            {activeItem.location}
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {activeItem.title}
                      </h3>

                      <p className="text-cyan-400/90 font-medium text-sm sm:text-base flex items-center gap-2">
                        <Building2 size={16} className="text-cyan-400 shrink-0" />
                        {activeItem.subtitle}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-white/5 border border-white/10 backdrop-blur-md self-start sm:self-center shrink-0">
                      <Calendar size={15} className="text-cyan-400" />
                      {activeItem.duration}
                    </div>
                  </div>

                  {/* Scrollable Content Body */}
                  <div className="flex-1 overflow-y-auto no-scrollbar my-3 space-y-6">
                    {/* Top Row: Left Overview (7 Cols) | Right Highlights & Details Card (5 Cols - NO IMAGES) */}
                    <div className="grid lg:grid-cols-12 gap-6 items-stretch pt-2">
                      {/* Left Side: Overview & Description */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-[2px] font-bold text-slate-400 flex items-center gap-2 mb-3">
                            <Sparkles size={14} className="text-cyan-400" />
                            {isEducation ? "Overview & Academic Journey" : "Role Overview & Impact"}
                          </h4>

                          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            {activeItem.description}
                          </p>
                        </div>

                        {/* Education Highlights / Core Subjects */}
                        {isEducation && (
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                              <BookOpen size={14} className="text-cyan-400" />
                              Key Focus & Domain Areas
                            </h5>
                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                                <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                                <span>Software Engineering</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                                <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                                <span>Full Stack Web Architecture</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                                <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                                <span>Database Systems & APIs</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                                <CheckCircle size={14} className="text-cyan-400 shrink-0" />
                                <span>Responsive UI / UX</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side UI: Sleek Metrics, Highlights & Verification Card (NO IMAGES) */}
                      <div className="lg:col-span-5 flex flex-col">
                        <div className="group/right relative w-full h-full min-h-[260px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 shadow-xl">
                          <div>
                            {/* Card Top Title & Badge */}
                            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                  {isEducation ? (
                                    <GraduationCap size={18} />
                                  ) : isInternship ? (
                                    <Briefcase size={18} />
                                  ) : (
                                    <Award size={18} />
                                  )}
                                </div>
                                <h4 className="text-sm font-bold text-white tracking-tight">
                                  {isEducation ? "Academic Summary" : isInternship ? "Internship Highlights" : "Credential Details"}
                                </h4>
                              </div>

                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                                <ShieldCheck size={13} className="text-cyan-400" />
                                Verified
                              </span>
                            </div>

                            {/* 2x2 Quick Info Grid */}
                            <div className="grid grid-cols-2 gap-2.5 mb-4">
                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                                  Type
                                </p>
                                <p className="text-xs font-bold text-white truncate">
                                  {isEducation ? "Degree / Diploma" : isInternship ? "Professional Intern" : "Certification"}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                                  Timeline
                                </p>
                                <p className="text-xs font-bold text-cyan-300 truncate">
                                  {activeItem.duration}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                                  Organization
                                </p>
                                <p className="text-xs font-bold text-white truncate">
                                  {activeItem.subtitle}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                                  {isInternship ? "Projects" : "Skills Count"}
                                </p>
                                <p className="text-xs font-bold text-cyan-300 truncate">
                                  {isInternship && activeItem.projectsWorkedOn
                                    ? `${activeItem.projectsWorkedOn.length} Delivered`
                                    : `${activeItem.skills?.length || 0} Core Skills`}
                                </p>
                              </div>
                            </div>

                            {/* Highlights List */}
                            <div className="space-y-2">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Key Takeaways
                              </p>
                              <ul className="space-y-1.5 text-xs text-slate-300">
                                <li className="flex items-start gap-2">
                                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{isEducation ? "Rigorous practical & theoretical coursework" : "Worked on production-level features and UI flows"}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{isEducation ? "Collaborative team projects & lab experiments" : "Collaborated using Git, GitHub, & modern tools"}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{isEducation ? "Strong foundations in software & algorithms" : "Optimized application performance & responsive design"}</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* PDF / External Document Button (If available) */}
                          {(activeItem.certificatePdf || activeItem.degreePdf || activeItem.resultPdf) && (
                            <div className="pt-3 mt-4 border-t border-white/10">
                              <a
                                href={activeItem.certificatePdf || activeItem.degreePdf || activeItem.resultPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all group/btn"
                              >
                                <span className="flex items-center gap-2">
                                  <FileText size={15} className="text-cyan-400" />
                                  View Official Document (PDF)
                                </span>
                                <ExternalLink size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* INTERNSHIP PROJECTS SECTION (3 Cards: Name, 3 Bullet Points, Tech Stack) */}
                    {isInternship && activeItem.projectsWorkedOn && activeItem.projectsWorkedOn.length > 0 && (
                      <div className="pt-4 border-t border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs uppercase tracking-[2px] font-bold text-slate-300 flex items-center gap-2">
                            <FolderGit2 size={15} className="text-cyan-400" />
                            Key Projects Worked On During Internship
                          </h4>
                          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                            {activeItem.projectsWorkedOn.length} Projects
                          </span>
                        </div>

                        {/* 3 Project Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {activeItem.projectsWorkedOn.map((project, idx) => (
                            <div
                              key={idx}
                              className="group/proj relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 flex flex-col justify-between hover:border-cyan-400/40 hover:bg-cyan-500/[0.04] transition-all duration-300 shadow-md"
                            >
                              <div className="space-y-3">
                                {/* Project Header: Name */}
                                <div className="flex items-start gap-2.5">
                                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                                    <Layers size={14} />
                                  </div>
                                  <h5 className="text-sm font-bold text-white group-hover/proj:text-cyan-300 transition-colors leading-snug">
                                    {project.name}
                                  </h5>
                                </div>

                                {/* 3 Bullet Points */}
                                <ul className="space-y-2 text-xs text-slate-300">
                                  {project.points.slice(0, 3).map((point, ptIdx) => (
                                    <li key={ptIdx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Tech Stack Badges */}
                              {project.tech && project.tech.length > 0 && (
                                <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                                  {project.tech.map((tItem, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20"
                                    >
                                      {tItem}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills & Technologies Applied */}
                    {activeItem.skills && activeItem.skills.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-xs uppercase tracking-[2px] font-bold text-slate-400 flex items-center gap-2 mb-3">
                          <Code2 size={14} className="text-cyan-400" />
                          Technologies & Skills Applied
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {activeItem.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
                            >
                              <CheckCircle2 size={13} className="text-cyan-400" />
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-12 text-center min-h-[350px] lg:h-[580px] flex items-center justify-center">
                  <p className="text-slate-400">Select a section from the sidebar to view details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;