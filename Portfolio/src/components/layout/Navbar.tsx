import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { NavLink } from "react-router-dom";
import resume from "../../assets/Anubhuti-resume .pdf";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold tracking-wide z-50"
          >
            <span className="text-white">ANUBHUTI S</span>
            <span className="text-violet-500">.</span>
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition duration-300 ${
                    isActive
                      ? "text-violet-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Resume Button with Download Arrow (Using the exact same resume PDF as Hero section) */}
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            download="Anubhuti-resume.pdf"
            className="hidden md:flex items-center gap-2 rounded-full border border-violet-500 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-600 shadow-md shadow-violet-500/10 group"
          >
            <span>Resume</span>
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/5 transition duration-300 focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#050816]/98 backdrop-blur-2xl border-t border-white/10 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-6 pb-20">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
              className={({ isActive }) =>
                `text-2xl font-semibold tracking-wide transition-all duration-300 transform ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${
                  isActive
                    ? "text-violet-500"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            download="Anubhuti-resume.pdf"
            onClick={() => setIsOpen(false)}
            style={{
              transitionDelay: `${navLinks.length * 50}ms`
            }}
            className={`w-full max-w-xs flex items-center justify-center gap-2 rounded-full border border-violet-500 px-6 py-3 text-lg font-medium text-white transition-all duration-300 transform hover:bg-violet-600 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span>Resume</span>
            <Download size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;