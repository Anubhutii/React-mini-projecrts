import { useState } from "react";

import {
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar = ({
  onLoginClick,
}: NavbarProps) => {

  const [darkMode, setDarkMode] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-white/10
        border-b
        border-gray-600/20
        backdrop-blur-lg
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-2
          flex
          items-center
          justify-between
        "
      >

        {/* Logo */}
        <h1
          className="
            text-2xl
            font-bold
            text-transparent
            bg-clip-text

            bg-[linear-gradient(90deg,#ff6b6b,#feca57,#48dbfb,#5f27cd,#ff6b6b)]

            bg-[length:300%_300%]

            animate-[gradient_5s_ease_infinite]
          "
        >
          ExpenseAI
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
            text-white
            text-2xl
          "
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav Links */}
        <div
          className={`
            absolute
            top-16
            left-0
            w-full
            bg-black/90
            flex
            flex-col
            items-center
            gap-6
            py-6
            transition-all
            duration-300

            md:static
            md:w-auto
            md:bg-transparent
            md:flex-row
            md:py-0

            ${
              menuOpen
                ? "flex"
                : "hidden md:flex"
            }
          `}
        >

          {/* Dashboard */}
          <button
            className="
              relative
              text-white
              text-sm
              font-medium
              transition-all
              duration-300

              after:content-['']
              after:absolute
              after:left-0
              after:-bottom-1
              after:w-0
              after:h-[2px]
              after:bg-orange-400
              after:transition-all
              after:duration-300

              hover:after:w-full
            "
          >
            Dashboard
          </button>

          {/* Reports */}
          <button
            className="
              relative
              text-white
              text-sm
              font-medium
              transition-all
              duration-300

              after:content-['']
              after:absolute
              after:left-0
              after:-bottom-1
              after:w-0
              after:h-[2px]
              after:bg-orange-400
              after:transition-all
              after:duration-300

              hover:after:w-full
            "
          >
            Reports
          </button>

          {/* Analytics */}
          <button
            className="
              relative
              text-white
              text-sm
              font-medium
              transition-all
              duration-300

              after:content-['']
              after:absolute
              after:left-0
              after:-bottom-1
              after:w-0
              after:h-[2px]
              after:bg-orange-400
              after:transition-all
              after:duration-300

              hover:after:w-full
            "
          >
            Analytics
          </button>

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Theme Toggle */}
          <div
            className={`
              relative
              flex
              items-center
              w-24
              h-12
              rounded-full
              p-1
              transition-all
              duration-300

              ${
                darkMode
                  ? "bg-[#0B1020]"
                  : "bg-gray-200"
              }
            `}
          >

            {/* Sliding Circle */}
            <div
              className={`
                absolute
                top-1
                w-10
                h-10
                rounded-full
                transition-all
                duration-300

                ${
                  darkMode
                    ? "translate-x-12 bg-[#2B3560]"
                    : "translate-x-0 bg-white"
                }
              `}
            />

            {/* Sun Button */}
            <button
              onClick={() => setDarkMode(false)}
              className="
                relative
                z-10
                flex-1
                flex
                items-center
                justify-center
              "
            >
              <FiSun
                size={20}
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-black"
                }
              />
            </button>

            {/* Moon Button */}
            <button
              onClick={() => setDarkMode(true)}
              className="
                relative
                z-10
                flex-1
                flex
                items-center
                justify-center
              "
            >
              <FiMoon
                size={20}
                className={
                  darkMode
                    ? "text-white"
                    : "text-gray-400"
                }
              />
            </button>

          </div>

          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="
              relative
              overflow-hidden
              rounded-full
              w-40
              p-[2px]
              group
            "
          >

            {/* Rotating Border */}
            <span
              className="
                absolute
                inset-[-1000%]
                animate-spin
                bg-[conic-gradient(from_0deg,#ff6b6b,#feca57,#48dbfb,#5f27cd,#ff6b6b)]
              "
            />

            {/* Inner Button */}
            <span
              className="
                relative
                flex
                items-center
                justify-center
                w-full
                bg-black
                text-white
                py-2
                rounded-full
                font-medium
                backdrop-blur-xl
              "
            >
              Login
            </span>

          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;