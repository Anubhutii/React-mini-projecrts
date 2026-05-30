import { Sun, Moon } from "lucide-react";

type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="
        relative
        w-16 h-9
        rounded-full
        p-1
        transition-colors duration-300
        flex items-center
      "
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
      }}
      aria-label="Toggle theme"
    >
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-3">
        <Sun size={16} className="text-yellow-300" />
        <Moon size={16} className="text-white/70" />
      </div>

      {/* Knob */}
      <span
        className="
          absolute
          top-1 left-1
          h-7 w-7
          rounded-full
          bg-white
          shadow-md
          transition-transform duration-300
        "
        style={{
          transform: isDark ? "translateX(28px)" : "translateX(0px)",
        }}
      />
    </button>
  );
}
