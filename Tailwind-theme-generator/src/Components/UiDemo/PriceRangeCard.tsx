import { useState } from "react";
import type { Theme } from "../../types/theme";
import { Sparkles, Scissors, Droplet, Shield } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

export default function PriceRangeCard({ theme }: Props) {
  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(6000);

  const avg = Math.round((min + max) / 2);

  const categories = [
    { id: "skin", label: "Skin Care", icon: <Droplet size={18} /> },
    { id: "mens", label: "Mens Grooming", icon: <Scissors size={18} /> },
    { id: "beauty", label: "Beauty & Hygiene", icon: <Sparkles size={18} /> },
    { id: "elderly", label: "Elderly Care", icon: <Shield size={18} /> },
  ];

  return (
    <div className="w-full space-y-4">
      {/* ================= PRICE RANGE CARD ================= */}
      <div
        className={`w-full h-44 rounded-2xl p-5 transition ${cardStyle.className}`}
        style={cardStyle.style}
      >
        {/* Header */}
        <h3 className="text-xl font-semibold">
          <span style={{ color: theme.primary }}>Price</span>{" "}
          <span style={{ color: theme.text }}>Range</span>
        </h3>

        {/* Values */}
        <div className="mt-3">
          <p className="text-lg font-semibold">
            ${min.toLocaleString()} – ${max.toLocaleString()}
          </p>
          <p className="text-sm opacity-70">
            Average price: ${avg.toLocaleString()}
          </p>
        </div>

        {/* Slider */}
        <div className="mt-6 relative">
          {/* Track */}
          <div className="h-1.5 w-full rounded-full bg-white/10" />

          {/* Active range */}
          <div
            className="absolute top-0 h-1.5 rounded-full"
            style={{
              left: `${(min / 12000) * 100}%`,
              width: `${((max - min) / 12000) * 100}%`,
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
            }}
          />

          {/* Min thumb */}
          <input
            type="range"
            min={0}
            max={12000}
            step={100}
            value={min}
            onChange={(e) => setMin(Math.min(+e.target.value, max - 500))}
            className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-auto"
            style={{ accentColor: theme.primary }}
          />

          {/* Max thumb */}
          <input
            type="range"
            min={0}
            max={12000}
            step={100}
            value={max}
            onChange={(e) => setMax(Math.max(+e.target.value, min + 500))}
            className="absolute -top-2 w-full appearance-none bg-transparent pointer-events-auto"
            style={{ accentColor: theme.primary }}
          />
        </div>
      </div>

      {/* ================= SHOP BY CATEGORY CARD ================= */}
      <div
        className={`w-full rounded-2xl p-4 mt-10 transition ${cardStyle.className}`}
        style={cardStyle.style}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Shop By Category</h3>
          <button
            className="text-xs hover:underline"
            style={{ color: theme.primary }}
          >
            View All
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl p-3 border transition hover:scale-[1.02] cursor-pointer"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.primary + "22",
              }}
            >
              <div
                className="h-9 w-9 rounded-lg grid place-items-center"
                style={{
                  backgroundColor: theme.primary + "22",
                  color: theme.primary,
                }}
              >
                {c.icon}
              </div>
              <span className="text-sm font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
