import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar = ({
  onLoginClick,
}: NavbarProps) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        dark:bg-white/10
        bg-white/60
        border-b
        dark:border-gray-600/20
        border-gray-200
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
            dark:text-white
            text-gray-800
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
            onClick={() => navigate("/")}
            className="
              relative
              dark:text-white
              text-gray-800
              text-sm
              font-medium
              transition-all
              duration-300
              cursor-pointer

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
            Home
          </button>


          {/* Contact */}
          
          <button
            onClick={() => navigate("/analytics")}
            className="
              relative
              dark:text-white
              text-gray-800
              text-sm
              font-medium
              transition-all
              duration-300
              cursor-pointer

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
            Contact
          </button>

          {/* Dashboard Link */}
          <button
            onClick={() => navigate("/dashboard")}
            className="
              relative
              dark:text-white
              text-gray-800
              text-sm
              font-medium
              transition-all
              duration-300
              cursor-pointer

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

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">

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
                dark:bg-black
                bg-white
                dark:text-white
                text-gray-800
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