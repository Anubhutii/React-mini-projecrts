import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  const { user, logout, updateUserName } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-[100]
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
            
            dark:bg-[#121218]/95
            bg-white/95
            border-b
            dark:border-white/10
            border-gray-200
            backdrop-blur-xl

            md:static
            md:w-auto
            md:bg-transparent
            md:dark:bg-transparent
            md:flex-row
            md:py-0
            md:border-none
            md:backdrop-blur-none

            ${
              menuOpen
                ? "flex"
                : "hidden md:flex"
            }
          `}
        >
          {/* Home */}
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
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

          {/* Dashboard Link */}
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
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

        {/* Right Side / Auth & Mobile Toggle */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <div ref={dropdownRef} className="relative">
              {/* Profile Icon / Initial Avatar */}
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setIsEditing(false);
                }}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-gradient-to-r
                  from-[#7C3AED]
                  to-[#06B6D4]
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                  cursor-pointer
                  hover:scale-105
                  hover:ring-4
                  hover:ring-purple-500/20
                  transition-all duration-300
                  shadow-[0_4px_12px_rgba(124,58,237,0.3)]
                  select-none
                  outline-none
                  border-none
                "
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-13
                    w-64
                    rounded-3xl
                    dark:bg-[#0f172a]/95
                    bg-white/95
                    backdrop-blur-xl
                    border
                    dark:border-white/10
                    border-gray-200
                    shadow-[0_20px_50px_rgba(0,0,0,0.3)]
                    p-5
                    z-50
                    flex
                    flex-col
                    gap-4
                    animate-scaleIn
                    origin-top-right
                  "
                >
                  {/* User Profile Details */}
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="relative group cursor-default">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300 animate-pulse" />
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="animate-fadeIn flex flex-col items-center">
                      <h4 className="font-bold text-gray-800 dark:text-white text-base tracking-wide mt-1">
                        {user.name}
                      </h4>
                      <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2.5 py-0.5 rounded-full mt-1 border dark:border-white/5 border-gray-200 max-w-[200px] truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] dark:bg-white/10 bg-gray-200 w-full" />

                  {/* Options */}
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="
                        w-full
                        text-left
                        px-4
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        text-red-500
                        dark:hover:bg-red-500/10
                        hover:bg-red-50
                        flex
                        items-center
                        gap-2
                        transition-all duration-200
                        cursor-pointer
                        border-none
                        bg-transparent
                      "
                    >
                      <span>🚪</span> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Login Button */
            <button
              onClick={() => {
                onLoginClick();
                setMenuOpen(false);
              }}
              className="
                relative
                overflow-hidden
                rounded-full
                w-24
                sm:w-32
                md:w-40
                p-[2px]
                group
                cursor-pointer
                border-none
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
                  py-1.5
                  md:py-2
                  rounded-full
                  text-xs
                  md:text-sm
                  font-medium
                  backdrop-blur-xl
                "
              >
                Login
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              dark:text-white
              text-gray-800
              text-2xl
              focus:outline-none
              cursor-pointer
            "
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;