import type { Theme } from "../../types/theme";
import { Heart } from "lucide-react";
import bagImg from "../../assets/Bag.jpg";
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

export default function BagCard({ theme }: Props) {
  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  return (
    <div
      className={`w-full rounded-3xl overflow-hidden transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Image area */}
      <div
        className="relative h-[200px] flex items-center justify-center"
        style={{
          backgroundColor: "#7B4A2E", // 👈 fixed brown shade
        }}
      >
        {/* Wishlist icon */}
        <button
          className="absolute right-3 top-3 h-9 w-9 rounded-full grid place-items-center backdrop-blur-md"
          style={{
            backgroundColor: theme.background + "cc",
            color: theme.text,
          }}
        >
          <Heart size={16} />
        </button>

        <img
          src={bagImg}
          alt="Classic Leather Handbag"
          className="h-[150px] w-auto object-contain drop-shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold">Classic Leather Handbag</h3>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
          <span
            className="px-2 py-0.5 rounded-md border"
            style={{ borderColor: theme.primary + "44" }}
          >
            Premium
          </span>
          <span
            className="px-2 py-0.5 rounded-md border"
            style={{ borderColor: theme.primary + "44" }}
          >
            Brown
          </span>
          <span
            className="px-2 py-0.5 rounded-md border"
            style={{ borderColor: theme.primary + "44" }}
          >
            Vegan Leather
          </span>
        </div>

        <p className="mt-2 text-xs opacity-70 leading-relaxed">
          Elegant everyday handbag with spacious compartments, durable vegan
          leather finish, and premium stitching for long-lasting style.
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase opacity-60">Price</p>
            <p className="text-lg font-semibold">$89.99</p>
          </div>

          <button
            className="px-4 py-2 rounded-xl text-sm font-medium transition hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: theme.background,
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
