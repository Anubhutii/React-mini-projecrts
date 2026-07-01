import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#070c18] text-white/70 pt-20 pb-10 px-6 md:px-16 overflow-hidden">

      {/* TOP GRADIENT LINE */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/30 via-cyan-500/40 to-teal-500/30" />

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* BRAND */}
          <div className="max-w-sm">
            <h2 className="text-xl font-semibold text-white">
              ExpenseAI
            </h2>

            <p className="mt-4 text-sm leading-relaxed">
              Smart expense tracking to help you control spending,
              understand habits, and grow your savings effortlessly.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6 text-lg">
              <FaTwitter className="hover:text-white transition cursor-pointer hover:scale-110" />
              <FaGithub className="hover:text-white transition cursor-pointer hover:scale-110" />
              <FaLinkedin className="hover:text-white transition cursor-pointer hover:scale-110" />
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">

            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Analytics</li>
                <li className="hover:text-white cursor-pointer">Reports</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Privacy</li>
                <li className="hover:text-white cursor-pointer">Terms</li>
              </ul>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">

          <span>
            By Anubhuti S. © {new Date().getFullYear()} ExpenseAI. All rights reserved.
          </span>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;