import { useState } from "react";
import type { Theme } from "../types/theme";

type Props = {
  theme: Theme;
};

export default function ConfigPanel({ theme }: Props) {
  const [copied, setCopied] = useState(false);

  const configText = `tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: "${theme.primary}",  
      secondary: "${theme.secondary}", 
      background: "${theme.background}", 
      surface: "${theme.surface}",   
      text: "${theme.text}"          
    }
  }
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const palette = [
    { label: "Primary", value: theme.primary },
    { label: "Secondary", value: theme.secondary },
    { label: "Background", value: theme.background },
    { label: "Surface", value: theme.surface },
    { label: "Text", value: theme.text },
  ];

  return (
    <section
      className="col-span-12 md:col-span-3 
                 bg-white/5 backdrop-blur-xl rounded-2xl p-5 
                 border border-white/10 
                 shadow-[0_20px_60px_-20px_rgba(79,124,255,0.25)]"
    >
      <h2 className="text-lg font-semibold mb-4 text-slate-100">
        Tailwind Config
      </h2>

      {/* Pretty code block */}
      <pre className="text-xs bg-black/40 rounded-lg p-4 overflow-auto text-slate-200 border border-white/10 leading-relaxed">
        {configText}
      </pre>

      {/* Visual palette */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {palette.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2 rounded-lg border border-white/10 p-2 bg-black/30"
          >
            <span
              className="h-6 w-6 rounded-md border border-white/20"
              style={{ backgroundColor: c.value }}
            />
            <div className="text-xs">
              <div className="font-medium text-slate-200">{c.label}</div>
              <div className="opacity-70 text-slate-400">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`
          mt-4 w-full py-2.5 rounded-lg text-sm font-medium
          border transition
          ${copied
            ? "bg-green-500/20 border-green-400/50 text-green-300"
            : "bg-blue-500/20 border-blue-400/40 hover:bg-blue-500/30 text-white"
          }
        `}
      >
        {copied ? "Copied ✓" : "Copy Config"}
      </button>
    </section>
  );
}
