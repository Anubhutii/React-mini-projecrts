import loginBg from "../../assets/light-bg.png";
import loginbg2 from "../../assets/dark_bg.png"; 

import { FcGoogle } from "react-icons/fc";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({
  open,
  onClose,
}: LoginModalProps) => {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        px-4
      "
    >

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          h-[600px]
          rounded-[40px]
          overflow-hidden
          flex
          dark:bg-transparent
          bg-white
          shadow-[0_20px_80px_rgba(0,0,0,0.35)]
        "
      >

        {/* LEFT SIDE IMAGE */}
        <div
          className="
            hidden
            md:block
            w-1/2
            h-full
            relative
          "
        >

          {/* Light Mode Image */}
          <img
            src={loginBg}
            alt="light-login"
            className="
              w-full
              h-full
              object-cover
              dark:hidden
            "
          />

          {/* Dark Mode Image */}
          <img
            src={loginbg2}
            alt="dark-login"
            className="
              w-full
              h-full
              object-cover
              hidden
              dark:block
            "
          />

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
            "
          />

        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            w-full
            md:w-1/2
            h-full

            dark:bg-white/10
            bg-[#FAF9F6]
            dark:backdrop-blur-2xl

            border-l
            dark:border-white/20
            border-gray-200

            flex
            items-center
            justify-center

            relative
            overflow-hidden
          "
        >

          {/* Glow Effect */}
          <div
            className="
              absolute
              top-[-100px]
              right-[-100px]
              w-[250px]
              h-[250px]
              bg-purple-400/30
              blur-[120px]
              rounded-full
            "
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute
              top-6
              right-6
              dark:text-white
              text-gray-800
              text-2xl
              hover:scale-110
              transition-all
            "
          >
            ✕
          </button>

          {/* FORM */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-md
              px-8
            "
          >

            {/* Heading */}
            <h1
              className="
                text-3xl
                font-bold
                dark:text-white
                text-gray-800
                mb-3
              "
            >
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p
              className="
                text-sm
                dark:text-gray-200
                text-gray-600
                mb-5
              "
            >
              Continue managing your expenses with ExpenseAI.
            </p>

            {/* Google Button */}
            <button
              type="button"
              className="
                w-[220px]
                ml-20
                py-3

                flex
                items-center
                justify-center
                gap-3
                border
                dark:border-white/20
                border-gray-200
                rounded-xl

                dark:text-white
                text-gray-800
                font-medium
                cursor-pointer

                dark:bg-white/5
                bg-white
                dark:hover:bg-white/10
                hover:bg-gray-100

                transition-all
                duration-300
              "
            >
              <FcGoogle size={26} />
              Continue with Google
            </button>

            {/* Divider */}
            <div
              className="
                flex
                items-center
                gap-4
                my-6
              "
            >
              <div className="flex-1 h-[1px] dark:bg-white/20 bg-gray-200" />
              <span className="dark:text-gray-300 text-gray-500 text-sm">
                OR
              </span>
              <div className="flex-1 h-[1px] dark:bg-white/20 bg-gray-200" />
            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Email */}
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full

                  dark:bg-white/5
                  bg-white
                  border
                  dark:border-white/20
                  border-gray-200

                  rounded-2xl

                  px-5
                  py-2

                  dark:text-white
                  text-gray-800
                  placeholder:text-gray-400

                  outline-none

                  focus:border-purple-400
                  dark:focus:bg-white/20
                  focus:bg-white

                  transition-all
                "
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full

                  dark:bg-white/5
                  bg-white
                  border
                  dark:border-white/20
                  border-gray-200

                  rounded-2xl

                  px-5
                  py-2

                  dark:text-white
                  text-gray-800
                  placeholder:text-gray-400

                  outline-none

                  focus:border-purple-400
                  dark:focus:bg-white/20
                  focus:bg-white

                  transition-all
                "
              />

              {/* Remember + Forgot */}
              <div
                className="
                  flex
                  items-center
                  justify-between

                  text-sm
                  dark:text-gray-200
                  text-gray-600
                "
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-cyan-400"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="
                    dark:hover:text-cyan-300
                    hover:text-purple-600
                    transition-all
                  "
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="
                  w-[230px]
                  ml-20

                  py-3

                  rounded-2xl

                  font-semibold
                  text-white

                  bg-gradient-to-r
                  from-[#7C3AED]
                  via-[#8B5CF6]
                  to-[#06B6D4]

                  hover:scale-[1.02]

                  transition-all
                  duration-300

                  shadow-[0_10px_30px_rgba(124,58,237,0.35)]
                "
              >
                Login
              </button>

            </form>

            {/* Footer */}
            <p
              className="
                text-center
                dark:text-gray-300
                text-gray-600
                mt-8
                text-sm
              "
            >
              Don’t have an account?
              <span
                className="
                  ml-2
                  dark:text-cyan-300
                  text-purple-600
                  cursor-pointer
                  dark:hover:text-cyan-200
                  hover:text-purple-500
                "
              >
                Sign Up
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginModal;