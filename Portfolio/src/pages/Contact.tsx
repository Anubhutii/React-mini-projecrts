import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  User,
  Tag,
  MessageSquare
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("s.anubhuti25@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      alert("Failed to send message.");
    }
  };

  return (
    <section className="relative min-h-screen bg-[#050714] text-white flex items-center justify-center pt-24 sm:pt-28 lg:pt-24 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* 3D Papercut Developer Illustration Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none mix-blend-luminosity scale-105 transition-all duration-700"
        style={{ backgroundImage: "url('/papercut_dev_bg.jpg')" }}
      />

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050714]/80 via-[#050714]/60 to-[#050714]/90 pointer-events-none" />

      {/* Paper-Cut Ambient Neon Lighting Bleeds */}
      <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Dotted Paper Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#22d3ee12_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-[1300px] w-full mx-auto relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* ==================== LEFT SIDE ==================== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 space-y-4 relative"
        >
          {/* FLOATING DEVELOPER UI ELEMENTS */}
          
          {/* 1. Floating Code Snippet Card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden xl:flex absolute top-6 right-4 z-20 p-2.5 rounded-xl bg-[#0A1026]/95 border border-cyan-500/30 backdrop-blur-xl text-[10px] font-mono text-cyan-300 shadow-lg"
          >
            <div>
              <p className="text-purple-400 font-bold">const developer = &#123;</p>
              <p className="pl-2 text-slate-300">stack: <span className="text-cyan-300">"MERN"</span></p>
              <p className="text-purple-400 font-bold">&#125;;</p>
            </div>
          </motion.div>

          {/* Small Top Label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono uppercase tracking-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>CONTACT</span>
            <span className="text-slate-400">// Let's Connect</span>
          </div>

          {/* Hero Heading */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
              <span className="uppercase tracking-tight font-sans">Let's Build</span> <br />
              <span className="font-serif italic font-medium tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.45)] px-1">
                Something
              </span> <br />
              <span className="uppercase tracking-tight font-sans text-slate-100">Amazing Together.</span>
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Have a project idea or want to collaborate? I'm open to discussing new opportunities.
            </p>
          </div>

          {/* Thin Cyan Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/50 via-blue-500/30 to-transparent my-3" />

          {/* Four Glass Information Cards (Compact 2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2 max-w-[480px]">
            {/* Location */}
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 shadow-md group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <MapPin size={15} />
                </div>
                <div className="truncate">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Location</p>
                  <p className="text-xs font-semibold text-white truncate">Noida, India</p>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 shadow-md group"
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform shrink-0">
                    <Mail size={15} />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Email</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=s.anubhuti25@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 truncate block"
                    >
                      s.anubhuti25@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer"
                  title="Copy Email"
                >
                  {isCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </button>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 shadow-md group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div className="truncate">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Availability</p>
                  <p className="text-xs font-semibold text-white flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    Open to Work
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-2.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all duration-300 shadow-md group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <Clock size={15} />
                </div>
                <div className="truncate">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Response Time</p>
                  <p className="text-xs font-semibold text-white truncate">Within 24 Hours</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Icons Section */}
          <div className="pt-2 space-y-3">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              Let's Connect On
            </p>

            <div className="flex items-center gap-3.5">
              <motion.a
                whileHover={{ y: -5, scale: 1.1, rotate: 6 }}
                href="https://github.com/Anubhutii"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 shadow-lg"
              >
                <FaGithub size={22} />
              </motion.a>

              <motion.a
                whileHover={{ y: -5, scale: 1.1, rotate: -6 }}
                href="https://www.linkedin.com/in/anubhuti-s-3402b1299"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 shadow-lg"
              >
                <FaLinkedin size={22} />
              </motion.a>

              <motion.a
                whileHover={{ y: -5, scale: 1.1, rotate: 6 }}
                href="https://instagram.com/anubhuti._.singh"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300 shadow-lg"
              >
                <FaInstagram size={22} />
              </motion.a>
            </div>

            {/* Server Status Badge Below Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A1026]/90 border border-purple-500/30 text-xs font-mono shadow-md mt-2"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>✓ Server Running</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <span>✓ Ready to Connect</span>
              </div>
            </motion.div>
          </div>

          {/* CENTRAL CREATIVE VERTICAL LASER DIVIDER & 4 SEPARATE MERN BADGES WITH ALTERNATING SMALL & BIG CONNECTING LINES */}
          <div className="hidden lg:flex flex-col items-center justify-between absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 h-[85%] z-20 pointer-events-none">
            {/* Top Laser Line Segment */}
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/60 to-purple-500/60 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            
            {/* 1. MongoDB Circular Glowing Badge + Small/Big Laser Line */}
            <div className="relative flex items-center justify-center my-1">
              {/* Left Small Laser Branch */}
              <div className="absolute right-full mr-1 flex items-center">
                <div className="w-5 h-[1.5px] bg-gradient-to-l from-emerald-400 to-transparent shadow-[0_0_8px_#10b981]" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
              </div>

              <motion.div 
                whileHover={{ scale: 1.2, rotate: 12 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="p-2 rounded-full bg-[#0A1026] border border-emerald-400/90 shadow-[0_0_20px_rgba(16,185,129,0.8)] text-emerald-400 pointer-events-auto"
                title="MongoDB"
              >
                <SiMongodb size={15} />
              </motion.div>

              {/* Right Big Laser Branch */}
              <div className="absolute left-full ml-1 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                <div className="w-14 h-[1.5px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-transparent shadow-[0_0_8px_#10b981]" />
              </div>
            </div>

            {/* Laser Line Segment 1 */}
            <div className="w-[1px] h-full bg-gradient-to-b from-emerald-500/60 via-purple-500/60 to-cyan-500/60 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

            {/* 2. Express.js Circular Glowing Badge + Big/Small Laser Line */}
            <div className="relative flex items-center justify-center my-1">
              {/* Left Big Laser Branch */}
              <div className="absolute right-full mr-1 flex items-center">
                <div className="w-14 h-[1.5px] bg-gradient-to-l from-purple-400 via-cyan-400 to-transparent shadow-[0_0_8px_#a855f7]" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#a855f7]" />
              </div>

              <motion.div 
                whileHover={{ scale: 1.2, rotate: -12 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="p-2 rounded-full bg-[#0A1026] border border-purple-400/90 shadow-[0_0_20px_rgba(168,85,247,0.8)] text-purple-300 pointer-events-auto"
                title="Express.js"
              >
                <SiExpress size={15} />
              </motion.div>

              {/* Right Small Laser Branch */}
              <div className="absolute left-full ml-1 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_6px_#a855f7]" />
                <div className="w-5 h-[1.5px] bg-gradient-to-r from-purple-400 to-transparent shadow-[0_0_8px_#a855f7]" />
              </div>
            </div>

            {/* Laser Line Segment 2 */}
            <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/60 via-cyan-500/60 to-blue-500/60 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            {/* 3. React.js Circular Glowing Badge + Small/Big Laser Line */}
            <div className="relative flex items-center justify-center my-1">
              {/* Left Small Laser Branch */}
              <div className="absolute right-full mr-1 flex items-center">
                <div className="w-6 h-[1.5px] bg-gradient-to-l from-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee]" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
              </div>

              <motion.div 
                whileHover={{ scale: 1.2, rotate: 180 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="p-2 rounded-full bg-[#0A1026] border border-cyan-400/90 shadow-[0_0_20px_rgba(34,211,238,0.9)] text-cyan-400 pointer-events-auto"
                title="React.js"
              >
                <FaReact size={15} className="animate-[spin_10s_linear_infinite]" />
              </motion.div>

              {/* Right Big Laser Branch */}
              <div className="absolute left-full ml-1 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent shadow-[0_0_8px_#22d3ee]" />
              </div>
            </div>

            {/* Laser Line Segment 3 */}
            <div className="w-[1px] h-full bg-gradient-to-b from-cyan-500/60 via-green-500/60 to-transparent shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

            {/* 4. Node.js Circular Glowing Badge + Big/Small Laser Line */}
            <div className="relative flex items-center justify-center my-1">
              {/* Left Big Laser Branch */}
              <div className="absolute right-full mr-1 flex items-center">
                <div className="w-16 h-[1.5px] bg-gradient-to-l from-green-400 via-emerald-400 to-transparent shadow-[0_0_8px_#22c55e]" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#22c55e]" />
              </div>

              <motion.div 
                whileHover={{ scale: 1.2, rotate: -12 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                className="p-2 rounded-full bg-[#0A1026] border border-green-400/90 shadow-[0_0_20px_rgba(34,197,94,0.8)] text-green-400 pointer-events-auto"
                title="Node.js"
              >
                <FaNodeJs size={15} />
              </motion.div>

              {/* Right Small Laser Branch */}
              <div className="absolute left-full ml-1 flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#22c55e]" />
                <div className="w-6 h-[1.5px] bg-gradient-to-r from-green-400 to-transparent shadow-[0_0_8px_#22c55e]" />
              </div>
            </div>

            {/* Bottom Laser Line Segment */}
            <div className="w-[1px] h-full bg-gradient-to-b from-green-500/60 to-transparent shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
        </motion.div>

        {/* ==================== RIGHT SIDE ==================== */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-3"
        >
          {/* Floating Contact Form Card (Balanced Medium Height) */}
          <div className="relative max-w-[420px] w-full bg-[#0B1024]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 sm:p-5.5 shadow-xl hover:border-cyan-500/30 transition-all duration-500 group/card">
            
            {/* GLOWING FUTURISTIC CORNER BRACKETS */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400 rounded-tr-lg drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400 rounded-bl-lg drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

            {/* Form Top Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Send size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight uppercase">Send Message</h3>
                  <p className="text-[10px] text-slate-400">Encrypted Transmission Channel</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                <Sparkles size={11} className="text-cyan-400" />
                <span>ONLINE</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-6 flex flex-col items-center text-center space-y-2.5"
                >
                  <CheckCircle2 size={42} className="text-cyan-400 mb-1 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">
                    Message Sent
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                    Thank you! Your message was sent directly to my Email.
                  </p>
                  
                  <button
                    onClick={() => {
                      setFormData({ name: "", email: "", subject: "", message: "" });
                      setIsSubmitted(false);
                    }}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Your Name Input */}
                  <div className="relative flex items-center border-b border-white/20 focus-within:border-cyan-400 transition-colors">
                    <User size={14} className="text-slate-500 mr-2 shrink-0" />
                    <input
                      id="ref-contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-none focus:outline-none transition-all duration-300"
                    />
                    {formData.name.trim().length > 0 && (
                      <Check size={13} className="text-cyan-400 shrink-0 ml-2 animate-in fade-in" />
                    )}
                  </div>

                  {/* Your Email Input */}
                  <div className="relative flex items-center border-b border-white/20 focus-within:border-cyan-400 transition-colors">
                    <Mail size={14} className="text-slate-500 mr-2 shrink-0" />
                    <input
                      id="ref-contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-none focus:outline-none transition-all duration-300"
                    />
                    {formData.email.includes("@") && (
                      <Check size={13} className="text-cyan-400 shrink-0 ml-2 animate-in fade-in" />
                    )}
                  </div>

                  {/* Quick Subject Tag Selector Chips */}
                  <div className="space-y-1 pt-0.5">
                    <p className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider">Project Type</p>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "Full-Time Role",
                        "Freelance Project",
                        "Consultation",
                        "General Inquiry"
                      ].map((subj) => (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: subj })}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all cursor-pointer ${
                            formData.subject === subj
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30"
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative flex items-center border-b border-white/20 focus-within:border-cyan-400 transition-colors">
                    <Tag size={14} className="text-slate-500 mr-2 shrink-0" />
                    <input
                      id="ref-contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-none focus:outline-none transition-all duration-300"
                    />
                    {formData.subject.trim().length > 0 && (
                      <Check size={13} className="text-cyan-400 shrink-0 ml-2 animate-in fade-in" />
                    )}
                  </div>

                  {/* Message Input with Character Meter */}
                  <div className="relative border-b border-white/20 focus-within:border-cyan-400 transition-colors pt-0.5">
                    <div className="flex items-start">
                      <MessageSquare size={14} className="text-slate-500 mr-2 mt-2 shrink-0" />
                      <textarea
                        id="ref-contact-message"
                        name="message"
                        required
                        rows={3}
                        maxLength={500}
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent py-1.5 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-none focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>
                    {/* Live Progress Bar */}
                    <div className="w-full h-0.5 bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-200"
                        style={{ width: `${Math.min((formData.message.length / 500) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Full Width Gradient Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50 mt-1 flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* BOTTOM GLASS STATS BAR */}
          <div className="max-w-[420px] w-full grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-2 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-center shadow-lg">
            <motion.div whileHover={{ y: -1 }} className="p-1 space-y-0.5 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-xs">🚀</span>
              <p className="text-[10px] font-extrabold text-cyan-300">10+</p>
              <p className="text-[9px] text-slate-400 font-medium">Projects Built</p>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} className="p-1 space-y-0.5 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-xs">⚛</span>
              <p className="text-[10px] font-extrabold text-blue-300">MERN</p>
              <p className="text-[9px] text-slate-400 font-medium">Stack Expert</p>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} className="p-1 space-y-0.5 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-xs font-mono text-purple-400">&lt;/&gt;</span>
              <p className="text-[10px] font-extrabold text-purple-300">Clean</p>
              <p className="text-[9px] text-slate-400 font-medium">Code Lover</p>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} className="p-1 space-y-0.5 rounded-lg hover:bg-white/5 transition-all">
              <span className="text-xs">🧠</span>
              <p className="text-[10px] font-extrabold text-emerald-300">Always</p>
              <p className="text-[9px] text-slate-400 font-medium">Learning</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;