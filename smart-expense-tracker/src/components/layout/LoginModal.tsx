import loginBg from "../../assets/loginbg_light.png";

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

          <img
            src={loginBg}
            alt="login"
            className="
              w-full
              h-full
              object-cover
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

            bg-white/10
            backdrop-blur-2xl

            border-l
            border-white/20

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
              text-white
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
                text-white
                mb-3
              "
            >
              Welcome Back
            </h1>

            {/* Subtitle */}
            <p
                          className="
                text-sm
                text-gray-200
                mb-5
              "
            >
              Continue managing your expenses
              with ExpenseAI.
            </p>

            {/* Google Button */}
            <button
              type="button"
              className="
                w-[220px]
                ml-22
                py-2

                flex
                items-center
                justify-center
                gap-3
                border-b-1
                py-3`3
                rounded-xl

                text-white
                font-medium
                cursor-pointer

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

              <div className="flex-1 h-[1px] bg-white/20" />

              <span className="text-gray-300 text-sm">
                OR
              </span>

              <div className="flex-1 h-[1px] bg-white/20" />

            </div>

            {/* Form */}
            <form className="space-y-5">

              {/* Email */}
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full

                  bg-white/5
                  border
                  border-white/20

                  rounded-2xl

                  px-5
                  py-2

                  text-white
                  placeholder:text-gray-400

                  outline-none

                  focus:border-purple-400
                  focus:bg-white/20

                  transition-all
                "
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full

                  bg-white/5
                  border
                  border-white/20

                  rounded-2xl

                  px-5
                  py-2

                  text-white
                  placeholder:text-gray-400

                  outline-none

                  focus:border-purple-400
                  focus:bg-white/20

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
                  text-gray-200
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
                    hover:text-cyan-300
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
                text-gray-300
                mt-8
                text-sm
              "
            >
              Don’t have an account?

              <span
                className="
                  ml-2
                  text-cyan-300
                  cursor-pointer
                  hover:text-cyan-200
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