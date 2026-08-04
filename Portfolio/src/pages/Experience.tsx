import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,Building2,Sparkles,Code2,Award,CheckCircle2,GraduationCap,FileText,ExternalLink,
  FolderGit2,Layers,MapPin,Briefcase,ShieldCheck,BookOpen,Check,CheckCircle,Eye,X,ChevronDown,ChevronUp
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import { experienceData, certificatesData, type CertificationItem } from "../data/experience";

const Experience = () => {
  const categories = useMemo(
    () => experienceData.map((item) => item.category),
    []
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size listener for Mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const isCertifications = useMemo(() => {
    return Boolean(activeItem?.category.toLowerCase().includes("certification"));
  }, [activeItem]);

  // Mobile slice calculation: 4 items on mobile initially unless expanded
  const displayedCertificates = useMemo(() => {
    if (isMobile && !showAllCertificates) {
      return certificatesData.slice(0, 4);
    }
    return certificatesData;
  }, [isMobile, showAllCertificates]);

  return (
    <section className="relative min-h-screen bg-[#050816] overflow-hidden pt-16 md:pt-22 pb-12 md:pb-16">
      {/* Background Blur Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[180px] pointer-events-none" />

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#0B1224] border border-cyan-500/30 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col justify-between shadow-2xl shadow-cyan-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {previewCert.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Certificate Image View */}
              <div className="flex-1 overflow-auto no-scrollbar flex items-center justify-center bg-[#050A18] rounded-2xl p-2 sm:p-4 my-3 border border-white/10 min-h-[360px] relative">
                <img
                  src={previewCert.image}
                  alt={previewCert.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
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
          className="text-center mb-5 md:mb-6"
        >
          <p className="uppercase tracking-[5px] text-cyan-400 text-xs sm:text-sm font-semibold mb-2">
            My Journey
          </p>

          <h2 className="text-2xl sm:text-5xl md:text-3xl font-bold text-white tracking-tight">
            Experience &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-sm leading-relaxed">
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

                  {/* Header Row (Fixed at Top) */}
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

                  {/* Content Body with Hidden Scrollbar */}
                  <div className="flex-1 overflow-y-auto no-scrollbar my-3 space-y-6">
                    {/* Top Row: Overview (for non-Certifications) */}
                    {!isCertifications && (
                      <div className="grid lg:grid-cols-12 gap-6 items-stretch pt-2">
                        <div className={`${isEducation ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col justify-between space-y-4`}>
                          <div>
                            <h4 className="text-xs uppercase tracking-[2px] font-bold text-slate-400 flex items-center gap-2 mb-3">
                              <Sparkles size={14} className="text-cyan-400" />
                              {isEducation ? "Overview & Academic Journey" : "Overview & Summary"}
                            </h4>

                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                              {activeItem.description}
                            </p>

                            {isInternship && activeItem.certificatePdf && (
                              <div className="mt-4">
                                <a
                                  href={activeItem.certificatePdf}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition-all"
                                >
                                  <FileText size={14} className="text-cyan-400" />
                                  View Internship Certificate (PDF)
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Education Highlights */}
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

                        {/* Academic Summary (for Education) */}
                        {isEducation && (
                          <div className="lg:col-span-5 flex flex-col">
                            <div className="group/right relative w-full h-full min-h-[260px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 shadow-xl">
                              <div>
                                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                      <GraduationCap size={18} />
                                    </div>
                                    <h4 className="text-sm font-bold text-white tracking-tight">
                                      Academic Summary
                                    </h4>
                                  </div>

                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                                    <ShieldCheck size={13} className="text-cyan-400" />
                                    Verified
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2.5 mb-4">
                                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                                      Type
                                    </p>
                                    <p className="text-xs font-bold text-white truncate">
                                      Degree / Diploma
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
                                      Skills Count
                                    </p>
                                    <p className="text-xs font-bold text-cyan-300 truncate">
                                      {`${activeItem.skills?.length || 0} Core Skills`}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    Key Takeaways
                                  </p>
                                  <ul className="space-y-1.5 text-xs text-slate-300">
                                    <li className="flex items-start gap-2">
                                      <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Rigorous practical & theoretical coursework</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Collaborative team projects & lab experiments</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                      <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                                      <span>Strong foundations in software & algorithms</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              {(activeItem.degreePdf || activeItem.resultPdf) && (
                                <div className="pt-3 mt-4 border-t border-white/10">
                                  <a
                                    href={activeItem.degreePdf || activeItem.resultPdf}
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
                        )}
                      </div>
                    )}

                    {/* CERTIFICATE GALLERY GRID */}
                    {isCertifications && (
                      <div className="space-y-4">
                        {/* Gallery Subheader */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400">
                              <Award size={16} />
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                              Verified Certificates ({displayedCertificates.length} / {certificatesData.length})
                            </h4>
                          </div>
                          <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                            {displayedCertificates.length} Shown
                          </span>
                        </div>

                        {/* Certificate Gallery Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                          {displayedCertificates.map((cert) => (
                            <div
                              key={cert.id}
                              onClick={() => setPreviewCert(cert)}
                              className="group/certCard relative rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl overflow-hidden hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                            >
                              {/* Certificate Image Thumbnail */}
                              <div className="relative h-28 sm:h-32 w-full bg-slate-950 overflow-hidden flex items-center justify-center border-b border-white/10">
                                <img
                                  src={cert.image}
                                  alt={cert.title}
                                  className="w-full h-full object-cover object-top group-hover/certCard:scale-105 transition-transform duration-500"
                                />

                                {/* Hover Glass Overlay */}
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/certCard:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold text-[11px] shadow-lg backdrop-blur-md">
                                    <Eye size={13} /> View Certificate
                                  </span>
                                </div>
                              </div>

                              {/* Card Footer Details - Certificate Number Only */}
                              <div className="p-2 px-2.5 bg-white/[0.02] flex items-center justify-between">
                                <p className="text-[11px] font-bold text-white truncate group-hover/certCard:text-cyan-300 transition-colors">
                                  {cert.title}
                                </p>

                                <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 shrink-0 ml-1.5 font-mono">
                                  #{cert.id}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Mobile "View More" / "Show Less" Button */}
                        {isMobile && certificatesData.length > 4 && (
                          <div className="flex justify-center pt-3">
                            <button
                              onClick={() => setShowAllCertificates((prev) => !prev)}
                              className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/5 active:scale-95"
                            >
                              {showAllCertificates ? (
                                <>
                                  <span>Show Less</span>
                                  <ChevronUp size={16} />
                                </>
                              ) : (
                                <>
                                  <span>View More ({certificatesData.length - 4} More)</span>
                                  <ChevronDown size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* INTERNSHIP PROJECTS SECTION */}
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
                                <div className="flex items-start gap-2.5">
                                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                                    <Layers size={14} />
                                  </div>
                                  <h5 className="text-sm font-bold text-white group-hover/proj:text-cyan-300 transition-colors leading-snug">
                                    {project.name}
                                  </h5>
                                </div>

                                <ul className="space-y-2 text-xs text-slate-300">
                                  {project.points.slice(0, 3).map((point, ptIdx) => (
                                    <li key={ptIdx} className="flex items-start gap-2 leading-relaxed">
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills & Technologies Applied */}
                    {!isCertifications && activeItem.skills && activeItem.skills.length > 0 && (
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
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-12 text-center min-h-[350px] flex items-center justify-center">
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