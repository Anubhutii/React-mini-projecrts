import type { Theme } from "../../types/theme";
import { ShoppingCart, Check, X } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

export default function ButtonsShowcase({ theme }: Props) {
  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  return (
    <div
      className={`w-full  rounded-2xl p-5 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      <p className="text-sm font-medium mb-5">Buttons Showcase</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-center">

       

        {/* 3. Soft Button */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-medium transition"
          style={{
            backgroundColor: theme.primary + "22",
            color: theme.primary,
          }}
        >
          Soft Button
        </button>

        {/* 4. Icon Button */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition hover:scale-[1.02]"
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.primary}33`,
            color: theme.text,
          }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>

        {/* 5. Success Button */}
        <button
          className="w-full py-2 rounded-xl text-sm font-medium transition hover:opacity-90"
          style={{
            backgroundColor: "#22c55e",
            color: "#022c22",
          }}
        >
          <span className="inline-flex items-center gap-2 justify-center w-full">
            <Check size={16} /> Success
          </span>
        </button>

        {/* 6. Danger Button */}
        <button
          className="w-full py-2 rounded-xl text-sm font-medium transition hover:opacity-90"
          style={{
            backgroundColor: "#ef4444",
            color: "#450a0a",
          }}
        >
          <span className="inline-flex items-center gap-2 justify-center w-full">
            <X size={16} /> Delete
          </span>
        </button>
      </div>
    </div>
  );
}
