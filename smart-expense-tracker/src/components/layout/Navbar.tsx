import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

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
            
            bg-white/95
            border-b
            dark:border-white/10
            border-gray-200
            backdrop-blur-xl

            md:static
            md:w-auto
            md:bg-transparent
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
            <div className="relative">
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
                  transition-all
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
                    top-12
                    w-64
                    rounded-3xl
                    dark:bg-[#121218]/95
                    bg-white/95
                    backdrop-blur-xl
                    border
                    dark:border-white/10
                    border-gray-200
                    shadow-[0_10px_40px_rgba(0,0,0,0.15)]
                    p-5
                    z-50
                    flex
                    flex-col
                    gap-4
                  "
                >
                  {/* User Profile Details */}
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {isEditing ? (
                      <div className="flex flex-col gap-2 mt-2 w-full">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="
                            w-full
                            px-3
                            py-1.5
                            text-sm
                            rounded-xl
                            border
                            dark:border-white/20
                            border-gray-300
                            dark:bg-white/5
                            bg-gray-50
                            dark:text-white
                            text-gray-800
                            outline-none
                            focus:border-purple-400
                          "
                          placeholder="Edit Name"
                          required
                        />
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={async () => {
                              if (editName.trim()) {
                                try {
                                  await updateUserName(editName.trim());
                                  setIsEditing(false);
                                } catch (err) {
                                  alert("Failed to update name");
                                }
                              }
                            }}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditName(user.name);
                            }}
                            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-gray-800 dark:text-white text-base">
                          {user.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          @{user.email.split("@")[0]}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="h-[1px] dark:bg-white/10 bg-gray-200 w-full" />

                  {/* Options */}
                  <div className="flex flex-col gap-2">
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="
                          w-full
                          text-left
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                          dark:text-gray-200
                          text-gray-700
                          dark:hover:bg-white/5
                          hover:bg-gray-100
                          transition-all
                          cursor-pointer
                          border-none
                          bg-transparent
                        "
                      >
                        ✏️ Edit Profile
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="
                        w-full
                        text-left
                        px-4
                        py-2
                        rounded-xl
                        text-sm
                        font-medium
                        text-red-500
                        dark:hover:bg-red-500/10
                        hover:bg-red-50
                        transition-all
                        cursor-pointer
                        border-none
                        bg-transparent
                      "
                    >
                      🚪 Logout
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