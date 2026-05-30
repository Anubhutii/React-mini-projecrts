import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import type { Theme } from "../types/theme";

import { themes } from "../data/themes";

type Props = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const items = [
  { id: "home", label: "Home", badge: 4 },
  { id: "products", label: "Products" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" },
];

export default function Navbar({ theme, setTheme }: Props) {
  const [active, setActive] = useState("home");

  // Determine if the current theme is considered "dark"
  const isDarkTheme = !["#FFFFFF", "#F8FAFC"].includes(theme.background.toUpperCase());

  const handleToggleTheme = () => {
    // We want to keep primary and secondary colors the same, but switch background/surface/text
    const baseTheme = Object.values(themes).find((t) => t.name === theme.name) || theme;
    const isBaseDark = !["#FFFFFF", "#F8FAFC"].includes(baseTheme.background.toUpperCase());

    if (isDarkTheme) {
      // Currently Dark, switch to Light
      setTheme({
        ...theme,
        background: !isBaseDark ? baseTheme.background : "#F8FAFC",
        surface: !isBaseDark ? baseTheme.surface : "#FFFFFF",
        text: !isBaseDark ? baseTheme.text : "#0F172A",
      });
    } else {
      // Currently Light, switch to Dark
      setTheme({
        ...theme,
        background: isBaseDark ? baseTheme.background : "#0B0F1A",
        surface: isBaseDark ? baseTheme.surface : "#111827",
        text: isBaseDark ? baseTheme.text : "#E5E7EB",
      });
    }
  };

  return (
    <nav className="w-full mb-6 mt-4 md:mt-5 px-2 md:px-5">
      <div className="w-full flex items-center justify-between gap-2 md:gap-4">
        {/* 🔹 LOGO / BRAND */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <div
            className="h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center font-bold text-xs md:text-base"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: "#020617",
            }}
          >
            L
          </div>
          <span
            className="hidden sm:inline font-semibold tracking-wide text-xs md:text-sm"
            style={{ color: theme.text }}
          >
            LOGO
          </span>
        </div>

        {/* 🔹 PILL NAV */}
        <div className="flex-1 flex justify-center min-w-0">
          <div
            className="
              w-full
              max-w-[500px]
              flex items-center justify-between gap-0.5 md:gap-1
              p-1 rounded-full border
              overflow-x-auto no-scrollbar
            "
            style={{
              backgroundColor: theme.surface,
              borderColor: `${theme.primary}33`,
            }}
          >
            {items.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className="
                    relative
                    px-2.5 md:px-4 py-1.5 md:py-2
                    rounded-full
                    text-[10px] md:text-sm
                    font-medium
                    transition
                    flex items-center gap-1 md:gap-2
                    whitespace-nowrap
                  "
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                      : "transparent",
                    color: isActive ? "#0b1020" : theme.text,
                    boxShadow: isActive
                      ? `0 6px 20px ${theme.primary}55`
                      : "none",
                  }}
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span
                      className="hidden md:inline text-[11px] font-semibold px-2 py-[2px] rounded-full"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.9)"
                          : theme.primary,
                        color: isActive ? theme.primary : "#020617",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🔹 VISUAL TOGGLE */}
        <button
          onClick={handleToggleTheme}
          className="
            relative
            w-11 h-6 md:w-16 md:h-9
            rounded-full
            p-1
            flex items-center
            border
            shrink-0
          "
          style={{
            backgroundColor: theme.surface,
            borderColor: `${theme.primary}33`,
          }}
          title="Toggle icon"
        >
          {/* Icons */}
          <div className="absolute inset-0 flex items-center justify-between px-1.5 md:px-3 text-slate-400">
            <Sun size={10} className="md:w-4 md:h-4 text-yellow-300" />
            <Moon size={10} className="md:w-4 md:h-4" />
          </div>

          {/* Knob */}
          <span
            className={`
              absolute
              top-0.5 left-0.5
              h-5 w-5 md:h-7 md:w-7
              rounded-full
              bg-white
              shadow-md
              transition-transform duration-300
              ${isDarkTheme ? 'translate-x-[20px] md:translate-x-[28px]' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
    </nav>
  );
}
