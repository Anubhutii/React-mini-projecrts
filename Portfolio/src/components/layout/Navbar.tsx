
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-wide"
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

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center rounded-full border border-violet-500 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-violet-600"
          >
            Resume
          </a>

          {/* Mobile Menu */}
          <button className="md:hidden">
            <Menu className="text-white" size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;