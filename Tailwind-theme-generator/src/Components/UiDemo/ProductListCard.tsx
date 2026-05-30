import type { Theme } from "../../types/theme";
import { Trash2 } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";
import wheat from "../../assets/p1.png"
import berry from "../../assets/p2.png"
import red from "../../assets/p3.png"

type Props = {
  theme: Theme;
};

type Product = {
  id: string;
  name: string;
  desc: string;
  price: string;
  stock: number;
  img: string;
};

const PRODUCTS: Product[] = [
  {
    id: "bread",
    name: "Whole Wheat Loaf",
    desc: "Nutritious, fiber-rich, and wholesome loaves.",
    price: "$4.50",
    stock: 40,
    img: wheat,
  },
  {
    id: "muffin",
    name: "Sweet Berry Muffin",
    desc: "Soft muffin filled with fresh, juicy blueberries.",
    price: "$6.50",
    stock: 40,
    img: berry,
  },
  {
    id: "cake",
    name: "Red Velvet Treat",
    desc: "Rich, moist red velvet with creamy frosting.",
    price: "$7.00",
    stock: 40,
    img: red,
  },
  {
    id: "donut",
    name: "Frosted Bliss Donut",
    desc: "Soft blue donut with vibrant pink sprinkles delight.",
    price: "$5.00",
    stock: 10,
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300",
  },
];

export default function ProductListCard({ theme }: Props) {
  const { getCardStyle } = useStyle();
  const cardStyle = getCardStyle(theme);

  return (
    <div
      className={`w-full rounded-2xl p-4 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      <p className="mb-3 text-sm font-medium">🛍️ Products Lists </p>

      <div className="space-y-3">
        {PRODUCTS.map((p) => {
          const lowStock = p.stock <= 10;

          return (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-xl p-2.5 border transition hover:scale-[1.01]"
              style={{
                backgroundColor: theme.background,
                borderColor: theme.primary + "22",
              }}
            >
              {/* Image */}
              <img
                src={p.img}
                alt={p.name}
                className="h-14 w-14 rounded-lg object-cover"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{p.name}</p>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: lowStock
                        ? "#F59E0B22"
                        : theme.primary + "22",
                      color: lowStock ? "#F59E0B" : theme.primary,
                    }}
                  >
                    {lowStock ? "Low Stock" : "In Stock"} : {p.stock}
                  </span>
                </div>

                <p className="mt-0.5 text-[11px] opacity-70">{p.desc}</p>

                <p className="mt-1 text-sm font-semibold" style={{ color: theme.primary }}>
                  {p.price}
                </p>
              </div>

              {/* Action */}
              <button
                className="h-9 w-9 rounded-full grid place-items-center border transition hover:scale-105"
                style={{
                  borderColor: theme.primary + "44",
                  color: theme.primary,
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
