import type { Theme } from "../types/theme";
import { themes } from "../data/themes";
import { useStyle, type ComponentStyleType } from "../Context/StyleContext";
import { useAnimation } from "../Context/AnimationContext";

type Props = {
  currentTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
  mobileTab?: "themes" | "styles" | "fx";
};

export default function Sidebar({ currentTheme, onChangeTheme, mobileTab }: Props) {
  const { componentStyle, setComponentStyle } = useStyle();
  const { animations, setAnimation } = useAnimation();

  const styleOptions: { label: string; value: ComponentStyleType }[] = [
    { label: "Glassmorphism", value: "glass" },
    { label: "Flat", value: "flat" },
    { label: "Neumorphism", value: "neo" },
    { label: "Gradient", value: "gradient" },
  ];

  return (
    <aside
      className={!mobileTab ? "bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-[0_20px_60px_-20px_rgba(79,124,255,0.25)] h-full min-h-[600px] flex flex-col" : "flex flex-col h-full"}
    >
      {(!mobileTab || mobileTab === "themes") && (
        <div className={`flex flex-col ${!mobileTab ? "flex-1 min-h-0" : "flex-1 mt-2"}`}>
          {/* Header */}
          <h2 className="text-lg font-semibold text-slate-100 mb-4">
            Choose a Theme
          </h2>

          {/* Theme List */}
          <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {Object.values(themes).map((t) => {
          const active = currentTheme.name === t.name;

          return (
            <button
              key={t.name}
              onClick={() => onChangeTheme(t)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${active
                  ? "bg-blue-500/20 text-blue-300"
                  : "text-slate-300 hover:bg-white/10 hover:text-slate-100"
                }`}
            >
              {/* Icon Dot */}
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: t.primary }}
              />

              {/* Theme Name */}
              <span className="truncate">{t.name}</span>
            </button>
          );
        })}
      </div>
      </div>
      )}

      {(!mobileTab || mobileTab === "styles") && (
      <div className={!mobileTab ? "mt-6 border-t border-white/10 pt-4 shrink-0" : ""}>
        <h2 className="text-md font-semibold text-slate-100 mb-3">
          Component Style
        </h2>
        <div className="space-y-2">
          {styleOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-slate-100 transition"
            >
              <input
                type="radio"
                name="componentStyle"
                value={opt.value}
                checked={componentStyle === opt.value}
                onChange={() => setComponentStyle(opt.value)}
                className="w-4 h-4 accent-blue-500 cursor-pointer bg-black/20 border border-white/20"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      )}

      {(!mobileTab || mobileTab === "fx") && (
        <div className={!mobileTab ? "shrink-0" : ""}>
      {/* Animations Section */}
      <div className={!mobileTab ? "mt-6 border-t border-white/10 pt-4" : ""}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-md font-semibold text-slate-100">Animations</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-slate-300 font-medium">Enable Animations</span>
            <input
              type="checkbox"
              checked={animations.animationsEnabled}
              onChange={(e) => setAnimation("animationsEnabled", e.target.checked)}
              className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
            />
          </label>

          <div className={`space-y-3 pl-2 border-l-2 border-white/10 transition-opacity ${!animations.animationsEnabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-400">Hover Effects</span>
              <input
                type="checkbox"
                checked={animations.hoverEffects}
                onChange={(e) => setAnimation("hoverEffects", e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-400">Card Glow</span>
              <input
                type="checkbox"
                checked={animations.cardGlow}
                onChange={(e) => setAnimation("cardGlow", e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-400">Button Ripple</span>
              <input
                type="checkbox"
                checked={animations.buttonRipple}
                onChange={(e) => setAnimation("buttonRipple", e.target.checked)}
                className="w-4 h-4 accent-blue-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>
        </div>
      </div>
      )}

      {/* Footer */}
      {!mobileTab && (
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400 shrink-0">
          {Object.keys(themes).length} themes available
        </div>
      )}
    </aside>
  );
}
