import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#050714] text-slate-400 border-t border-white/10 py-4 px-4 overflow-hidden">
      {/* 3D Papercut Developer Workspace Illustration Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none mix-blend-luminosity scale-105 transition-all duration-700"
        style={{ backgroundImage: "url('/papercut_footer_bg.jpg')" }}
      />

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050714]/90 via-[#050714]/75 to-[#050714]/95 pointer-events-none" />

      {/* Paper-Cut Ambient Neon Lighting Bleeds */}
      <div className="absolute -top-10 left-1/4 w-72 h-48 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-48 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Dotted Paper Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#22d3ee12_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Top Cyan Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />

      <div className="max-w-[1300px] mx-auto relative z-10 flex items-center justify-between gap-4 text-xs">
        {/* Copyright Notice */}
        <p className="text-slate-400">
          © {new Date().getFullYear()} <span className="text-white font-semibold">Anubhuti Singh</span>. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Anubhutii"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            <FaGithub size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/anubhuti-s-3402b1299"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            <FaLinkedin size={15} />
          </a>
          <a
            href="https://instagram.com/anubhuti._.singh"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            <FaInstagram size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;