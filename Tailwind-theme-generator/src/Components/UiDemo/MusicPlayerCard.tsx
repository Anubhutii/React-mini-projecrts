import { useState } from "react";
import type { Theme } from "../../types/theme";
import { Play, Pause, SkipBack, SkipForward, Heart, Cloud } from "lucide-react";
import cover from "../../assets/musicui.jpg"; // apni cover image
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

export default function MusicPlayerCard({ theme }: Props) {
  const [playing, setPlaying] = useState(false);
  const progress = 42; // %

  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  return (
    <div
      className={`w-full rounded-3xl overflow-hidden transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Cover */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={cover} alt="Album cover" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold">The Shins</h3>
            <p className="text-xs opacity-70">Port Of Morrow</p>
            <p className="mt-1 text-[11px] opacity-60">No Way Down</p>
          </div>

          <div className="flex items-center gap-2 opacity-70">
            <Cloud size={16} />
            <Heart size={16} />
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <button className="opacity-70 hover:opacity-100 transition">
            <SkipBack size={18} />
          </button>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="h-12 w-12 rounded-full grid place-items-center shadow-lg transition"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: theme.background,
            }}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button className="opacity-70 hover:opacity-100 transition">
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
