import heroBg from "../../assets/herobg.png";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className=" transition-colors duration-300 px-6 sm:px-12 md:px-20 py-12 md:py-24">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          
          {/* Heading */}
          <div className=" text-3xl md:text-5xl font-bold leading-tight dark:text-white text-gray-900">
            Track Smarter.
            <br />
            <span
              className="
                text-transparent
                bg-clip-text
                bg-[linear-gradient(90deg,#48dbfb,#5f27cd,#ff6b6b)]
                bg-[length:300%_300%]
                animate-[gradient_5s_ease_infinite]
              "
            >
              Spend Better.
            </span>
          </div>

          {/* Subheading */}
          <div className="mt-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Track your expenses with ease and efficiency. Our dashboard
              provides real-time insights, helping you make informed financial
              decisions and stay on top of your budget.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">
            
            {/* Get Started */}
            <button
              onClick={() => navigate("/dashboard")}
              className="
                relative overflow-hidden rounded-full p-[2px]
                cursor-pointer transition-transform
                hover:scale-[1.03] active:scale-[0.97]
              "
            >
              <span
                className="
                  absolute inset-[-1000%]
                  animate-spin
                  bg-[conic-gradient(from_0deg,#ff6b6b,#feca57,#48dbfb,#5f27cd,#ff6b6b)]
                "
              />
              <span
                className="
                  relative block px-8 py-4 rounded-full
                  dark:bg-black bg-white
                  dark:text-white text-gray-800 font-medium
                "
              >
                Get Started free →
              </span>
            </button>

            {/* Demo */}
            <button
              className="
                px-8 py-4 rounded-full border
                dark:border-white/10 border-gray-200
                dark:bg-white/5 bg-white
                dark:text-white text-gray-800
                hover:bg-gray-100 dark:hover:bg-white/10
                shadow-sm cursor-pointer transition-all
                hover:scale-[1.03] active:scale-[0.97]
              "
            >
              Watch Demo
            </button>
          </div>

          {/* Tagline + Pills */}
          <div className="mt-6 max-w-xl">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Stop guessing where your money went.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">
                Start knowing.
              </span>
            </p>

            <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/70">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">⚡ Track every expense</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">🧠 Smart insights</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">💰 Save smarter</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">📊 Visual analytics</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">🔔 Budget alerts</span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">📅 Monthly reports</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-[320px] sm:h-[450px] md:h-[650px] overflow-hidden md:overflow-visible">

          {/* TOP RIGHT FLOATING CARDS */}
          <div className="absolute top-10 right-10 space-y-4 hidden md:block z-10">

  {/* Back Card */}
  <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg opacity-50 blur-[1px] scale-95">
    💰 Manage pocket money easily
  </div>

  {/* Focus Card */}
  <div className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 text-white text-sm shadow-2xl scale-105">
    📊 Track rent, food & daily spend
  </div>

  {/* Back Card */}
  <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm shadow-lg opacity-50 blur-[1px] scale-95">
    📅 Set monthly budgets & goals
  </div>

</div>

          {/* EXTRA TOP GLOW */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl rounded-full opacity-60" />

          {/* EXISTING GLOW (unchanged) */}
          <div
            className="
              absolute bottom-0 right-0
              w-[150px] h-[150px] sm:w-[250px] sm:h-[250px]
              md:w-[500px] md:h-[500px]
              bg-gradient-to-tr
              from-cyan-400/30 via-blue-500/20 to-purple-500/30
              blur-3xl rounded-full opacity-70
            "
          />

          {/* IMAGE (UNCHANGED ✅) */}
          <img
            src={heroBg}
            alt="Expense dashboard"
            className="
              absolute bottom-0 right-0
              w-[320px] sm:w-[480px] md:w-[700px] mb-14 max-w-none
              translate-y-10
              hover:scale-[1.03]
              transition-all duration-500
              drop-shadow-[0_20px_60px_rgba(59,130,246,0.3)] md:drop-shadow-[0_40px_120px_rgba(59,130,246,0.35)]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;