import { useState } from "react";
import type { Theme } from "../../types/theme";
import { X } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";

type Item = {
  id: string;
  label: string;
  count: number;
};

type Props = {
  theme: Theme;
};

const ITEMS: Item[] = [
  { id: "hoodies", label: "Hoodies", count: 25 },
  { id: "bags", label: "Bags", count: 3 },
  { id: "shoes", label: "Shoes", count: 0 },
  { id: "accessories", label: "Accessories", count: 4 },
];

export default function FilterChecklist({ theme }: Props) {
  const [selected, setSelected] = useState<string[]>(["hoodies", "shoes"]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const removeChip = (id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  return (
    <div
      className={`w-full rounded-xl p-4 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          📊 <span>Preview</span>
        </div>
        <button
          className="text-xs underline"
          style={{ color: theme.primary }}
        >
          more
        </button>
      </div>

      {/* Selected chips */}
      <div className="mb-3 flex flex-wrap gap-2">
        {selected.map((id) => {
          const item = ITEMS.find((i) => i.id === id)!;
          return (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
              style={{
                backgroundColor: theme.primary + "22",
                color: theme.text,
              }}
            >
              {item.label}
              <button onClick={() => removeChip(id)}>
                <X size={12} />
              </button>
            </span>
          );
        })}
        {selected.length === 0 && (
          <span className="text-xs opacity-60">No filters selected</span>
        )}
      </div>

      {/* Checklist */}
      <ul className="divide-y divide-white/10">
        {ITEMS.map((item) => {
          const checked = selected.includes(item.id);

          return (
            <li
              key={item.id}
              className="flex items-center justify-between py-2 cursor-pointer"
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-center gap-2">
                {/* Custom checkbox */}
                {/* Custom checkbox (SQUARE) */}
                <span
                  className="
    h-5 w-5 
    rounded-[6px]     /* 👈 square with soft corners */
    border 
    flex items-center justify-center
    transition
  "
                  style={{
                    borderColor: checked ? theme.primary : theme.text + "55",
                    backgroundColor: checked ? theme.primary : "transparent",
                  }}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 text-black"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  )}
                </span>


                <span className="text-sm">{item.label}</span>
              </div>

              {/* Count badge */}
              <span
                className="min-w-6 px-2 py-0.5 rounded-full text-xs text-center"
                style={{
                  backgroundColor:
                    item.count === 0 ? "#F59E0B" : theme.primary + "22",
                  color: item.count === 0 ? "#020617" : theme.primary,
                }}
              >
                {item.count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
