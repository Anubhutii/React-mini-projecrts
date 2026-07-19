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
  FileCheck,
  Eye,
  FileText,
  ExternalLink,
  FolderGit2,
  Layers,
  X,
  Maximize2,
  MapPin,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import { experienceData } from "../data/experience";

const Experience = () => {
  const categories = useMemo(
    () => experienceData.map((item) => item.category),
    []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  const activeItem = useMemo(() => {
    return experienceData.find((item) => item.category === activeCategory);
  }, [activeCategory]);

  const isEducation = useMemo(() => {
    if (!activeItem?.category) return false;
    const cat = activeItem.category.toLowerCase();
    return cat.includes("graduation") || cat.includes("diploma") || cat.includes("b.tech") || cat.includes("education");
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

      {/* High-Definition Full Document Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#0B1224] border border-cyan-500/30 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col justify-between shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Maximize2 size={16} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {previewImage.title}
                  </h4>
                </div>

                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* HD Uncompressed Image Container (Hidden Scrollbar) */}
              <div className="flex-1 overflow-auto no-scrollbar flex items-center justify-center bg-black/60 rounded-2xl p-2 min-h-[300px] border border-white/5">
                <img
                  src={previewImage.src}
                  alt={previewImage.title}
                  className="max-h-[74vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            Explore my academic qualifications, certificates, results, and career milestones.
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
                          <Award size={14} className="text-cyan-400" />
                          {activeItem.category}
                        </div>

                        {isEducation && activeItem.location && (
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

                  {/* Scrollable Content Body (Hidden Scrollbar) */}
                  <div className="flex-1 overflow-y-auto no-scrollbar my-3 space-y-6">
                    
                    {/* Top Row: Left Overview | Right Documents / Showcase */}
                    <div className="grid lg:grid-cols-12 gap-6 items-stretch pt-2">
                      {/* Left Side: Overview & Description */}
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-[2px] font-bold text-slate-400 flex items-center gap-2 mb-2">
                            <Sparkles size={14} className="text-cyan-400" />
                            {isEducation ? "Overview & Key Details" : "Summary & Role Details"}
                          </h4>

                          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            {activeItem.description}
                          </p>
                        </div>

                        {/* Education Document Showcase Cards (Full-Bleed Zero Space Preview) */}
                        {isEducation && (
                          <div className="grid sm:grid-cols-2 gap-4 pt-1">
                            {/* Degree Card */}
                            <div className="group/doc relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <GraduationCap size={15} className="text-cyan-400" />
                                  Degree Certificate
                                </span>
                                {activeItem.degreeImage && (
                                  <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                                    <CheckCircle2 size={10} /> Verified
                                  </span>
                                )}
                              </div>

                              {activeItem.degreeImage ? (
                                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-1">
                                  <img
                                    src={activeItem.degreeImage}
                                    alt="Degree Certificate"
                                    className="w-full h-full object-cover object-top group-hover/doc:scale-105 transition-transform duration-500"
                                  />
                                  <button
                                    onClick={() =>
                                      setPreviewImage({
                                        src: activeItem.degreeImage!,
                                        title: `${activeItem.title} - Degree Certificate`,
                                      })
                                    }
                                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                  >
                                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold text-xs shadow-lg backdrop-blur-md">
                                      <Eye size={14} /> Expand HD Document
                                    </span>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-44 sm:h-48 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 text-center mb-1">
                                  <GraduationCap size={24} className="text-slate-500 mb-1.5" />
                                  <span className="text-xs font-bold text-white">Degree Certificate</span>
                                  <span className="text-[10px] text-slate-400 mt-0.5">Not Uploaded</span>
                                </div>
                              )}
                            </div>

                            {/* Result Card */}
                            <div className="group/doc relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3.5 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <FileCheck size={15} className="text-cyan-400" />
                                  Result Marksheet
                                </span>
                                {activeItem.resultImage && (
                                  <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                                    <CheckCircle2 size={10} /> Verified
                                  </span>
                                )}
                              </div>

                              {activeItem.resultImage ? (
                                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-1">
                                  <img
                                    src={activeItem.resultImage}
                                    alt="Result / Marksheet"
                                    className="w-full h-full object-cover object-top group-hover/doc:scale-105 transition-transform duration-500"
                                  />
                                  <button
                                    onClick={() =>
                                      setPreviewImage({
                                        src: activeItem.resultImage!,
                                        title: `${activeItem.title} - Result Marksheet`,
                                      })
                                    }
                                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                  >
                                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold text-xs shadow-lg backdrop-blur-md">
                                      <Eye size={14} /> Expand HD Marksheet
                                    </span>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-44 sm:h-48 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3 text-center mb-1">
                                  <FileCheck size={24} className="text-slate-500 mb-1.5" />
                                  <span className="text-xs font-bold text-white">Result Marksheet</span>
                                  <span className="text-[10px] text-slate-400 mt-0.5">Not Uploaded</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Side Showcase: Campus Photo Showcase (For Education) OR Certificate Showcase (For Internship/Certifications) */}
                      <div className="lg:col-span-5 flex flex-col">
                        {isEducation ? (
                          /* Campus Photo Showcase Card (For Education) */
                          <div className="group/univ relative w-full h-full min-h-[280px] rounded-2xl border border-white/10 bg-slate-950 overflow-hidden flex flex-col justify-end transition-all duration-300 hover:border-cyan-400/40 shadow-lg">
                            {activeItem.universityImage || activeItem.image ? (
                              <>
                                <img
                                  src={activeItem.universityImage || activeItem.image}
                                  alt={activeItem.subtitle || "Institution"}
                                  className="absolute inset-0 w-full h-full object-cover group-hover/univ:scale-105 transition-transform duration-700"
                                />
                                <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 pt-8 flex flex-col justify-end">
                                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                                    {activeItem.subtitle}
                                  </span>
                                  <span className="text-xs font-semibold text-white">
                                    Campus Photo
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-4 text-center h-full">
                                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
                                  <Building2 size={22} />
                                </div>
                                <span className="text-xs font-bold text-white mb-0.5">
                                  {activeItem.subtitle || "Institution"}
                                </span>
                                <span className="text-[10px] text-slate-400">Campus Photo</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Certificate Showcase Card (For Internships & Certifications) */
                          <div className="group/cert relative w-full h-full min-h-[190px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                <Award size={15} className="text-cyan-400" />
                                Verified Certificate
                              </span>
                            </div>

                            {activeItem.certificateImage ? (
                              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-1">
                                <img
                                  src={activeItem.certificateImage}
                                  alt={`${activeItem.title} Certificate`}
                                  className="w-full h-full object-cover object-top group-hover/cert:scale-105 transition-transform duration-500"
                                />
                                <button
                                  onClick={() =>
                                    setPreviewImage({
                                      src: activeItem.certificateImage!,
                                      title: `${activeItem.title} Certificate`,
                                    })
                                  }
                                  className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                  <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold text-xs shadow-lg backdrop-blur-md">
                                    <Eye size={14} /> Expand HD Certificate
                                  </span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-center py-6 my-auto">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover/cert:scale-110 transition-transform">
                                  <Award size={24} />
                                </div>
                                <h5 className="text-sm font-bold text-white mb-1">
                                  {activeItem.title} Certificate
                                </h5>
                                <span className="text-xs text-slate-400 mb-2">
                                  {activeItem.subtitle} Verified Credential
                                </span>
                                {activeItem.certificatePdf && (
                                  <a
                                    href={activeItem.certificatePdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1 mt-1"
                                  >
                                    <FileText size={13} /> View Certificate PDF <ExternalLink size={11} />
                                  </a>
                                )}
                              </div>
                            )}

                            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                              <span className="font-medium text-cyan-300 flex items-center gap-1">
                                <FileCheck size={12} /> Verified Credential
                              </span>
                              <span>{activeItem.duration}</span>
                            </div>
                          </div>
                        )}
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