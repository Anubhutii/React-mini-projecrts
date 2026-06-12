const Features = () => {
  const features = [
    {
      icon: "⚡",
      title: "Real-time Tracking",
      desc: "Track every expense instantly.",
      gradient: "from-cyan-100 to-blue-200",
    },
    {
      icon: "🧠",
      title: "Smart Insights",
      desc: "Understand spending patterns.",
      gradient: "from-purple-100 to-pink-200",
    },
    {
      icon: "🔔",
      title: "Budget Alerts",
      desc: "Never overspend again.",
      gradient: "from-orange-100 to-red-200",
    },
    {
      icon: "📊",
      title: "Visual Analytics",
      desc: "Beautiful financial charts.",
      gradient: "from-green-100 to-emerald-200",
    },
    {
      icon: "📅",
      title: "Monthly Reports",
      desc: "Track your growth monthly.",
      gradient: "from-indigo-100 to-purple-200",
    },
    {
      icon: "💰",
      title: "Smart Saving",
      desc: "Save more with insights.",
      gradient: "from-rose-100 to-pink-200",
    },
  ];

  const steps = [
    { no: "01", title: "Add Expense", desc: "Quickly add your daily expenses." },
    { no: "02", title: "Track Spending", desc: "Monitor where your money goes." },
    { no: "03", title: "Get Insights", desc: "Understand your habits clearly." },
    { no: "04", title: "Improve Budget", desc: "Control spending & save more." },
  ];

  return (
    <>
      {/* FEATURES */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Why use ExpenseAI?
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Track, analyze, and improve your financial habits effortlessly.
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>✔ Track every rupee</div>
              <div>✔ Stay within budget</div>
              <div>✔ Smart insights instantly</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl bg-gradient-to-br ${f.gradient}
                border border-white/40 shadow-sm hover:-translate-y-1 transition`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_70%)] opacity-60" />
                <div className="relative z-10">
                  <div className="w-9 h-9 flex items-center justify-center bg-white/70 rounded-lg mb-2 text-sm">
                    {f.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-xs text-gray-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (FLOW STYLE) */}
      <section className="py-14 px-32 text-center relative">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How it works
        </h2>

        {/* Line */}
        <div className="hidden md:block absolute top-[140px] left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-purple-500/20 blur-[1px]" />

        <div className="mt-16 grid md:grid-cols-4 gap-6 relative z-10">
          {steps.map((s, i) => (
            <div
              key={i}
              className="group relative p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl
              hover:-translate-y-2 hover:bg-white/10 transition-all duration-300"
            >
              {/* Dot */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />

              <div className="text-lg font-bold text-blue-400">{s.no}</div>

              <h3 className="text-sm font-semibold text-white mt-2">
                {s.title}
              </h3>

              <p className="text-xs text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

    <section className="py-6">

  <div className="w-full bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-900 px-2 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10">

    {/* LEFT */}
    <div className="max-w-xl">
      <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug">
        Ready to simplify your expense management?
      </h2>

      <p className="mt-4 text-white/70 text-sm md:text-base">
        Enter your email or phone number to start tracking your expenses smarter and take control of your finances.
      </p>
    </div>

    {/* RIGHT */}
    <div className="w-full md:w-auto">

      {/* Input + Button */}
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">

        <input
          type="text"
          placeholder="Enter your email or phone number"
          className="px-5 py-3 w-full md:w-[260px] text-sm text-gray-700 outline-none"
        />

        <button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-3 text-sm font-medium transition rounded-full">
          Get started
        </button>
      </div>

      {/* Google Button */}
      <div className="mt-4 flex items-center justify-center md:justify-start gap-3 text-white/70 text-sm">

        <span>Or continue with</span>

        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white text-gray-700 text-sm font-medium cursor-pointer hover:shadow-md hover:scale-105 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          <span>Google</span>
        </div>

      </div>

    </div>
  </div>

</section>
    </>
  );
};

export default Features;