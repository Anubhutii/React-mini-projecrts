import { useState } from "react";
import type { Theme } from "../../types/theme";
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

const DATA = [
  { month: "Jan", male: 28, female: 23 },
  { month: "Feb", male: 13, female: 18 },
  { month: "Mar", male: 33, female: 28 },
  { month: "Apr", male: 22, female: 18 },
  { month: "May", male: 27, female: 33 },
  { month: "Jun", male: 38, female: 28 },
];

export default function StatsGraphCard({ theme }: Props) {
  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);
  const max = 40;
  const [hover, setHover] = useState<{
    month: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div
      className={`w-full rounded-2xl p-5 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium">Gender</p>
          <p className="mt-1 text-xs" style={{ color: theme.text + "99" }}>
            Sessions
          </p>
          <p className="mt-2 text-2xl font-semibold">18,567</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <i
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            Male
          </span>
          <span className="flex items-center gap-1">
            <i
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: theme.secondary }}
            />
            Female
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Grid */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 10, 20, 30, 40].map((v) => (
            <div
              key={v}
              className="border-t"
              style={{ borderColor: theme.text + "22" }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="relative z-10 flex items-end justify-between gap-4 h-44 px-4">
          {DATA.map((d) => (
            <div key={d.month} className="flex flex-col items-center gap-2">
              <div className="flex items-end gap-2 h-36">
                {/* Male */}
                <div
                  className="w-3 rounded-md transition-all duration-700 ease-out shadow-md"
                  style={{
                    height: `${(d.male / max) * 100}%`,
                    background: `linear-gradient(to top, ${theme.primary}, ${theme.primary}cc)`,
                    boxShadow: `0 6px 16px ${theme.primary}44`,
                  }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHover({
                      month: d.month,
                      value: d.male,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                />

                {/* Female */}
                <div
                  className="w-3 rounded-md transition-all duration-700 ease-out shadow-md"
                  style={{
                    height: `${(d.female / max) * 100}%`,
                    background: `linear-gradient(to top, ${theme.secondary}, ${theme.secondary}cc)`,
                    boxShadow: `0 6px 16px ${theme.secondary}44`,
                  }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHover({
                      month: d.month,
                      value: d.female,
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                />
              </div>

              <span className="text-[10px]" style={{ color: theme.text + "99" }}>
                {d.month}
              </span>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hover && (
          <div
            className="fixed z-50 px-3 py-1.5 rounded-full text-xs shadow-lg"
            style={{
              top: hover.y - 28,
              left: hover.x - 16,
              backgroundColor: "#111827",
              color: "#fff",
            }}
          >
            {hover.value}k
          </div>
        )}

        {/* Y-axis labels */}
        <div
          className="absolute -left-1 top-0 h-full flex flex-col justify-between text-[10px]"
          style={{ color: theme.text + "66" }}
        >
          {["40k", "30k", "20k", "10k", "0"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
