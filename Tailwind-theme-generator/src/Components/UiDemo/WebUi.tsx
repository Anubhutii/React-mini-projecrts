import type { Theme } from "../../types/theme";
import foodImg from "../../assets/webui.png";
import { Search, ShoppingCart, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";

import burger from "../../assets/burger.png";
import cake from "../../assets/cake.png";
import salad from "../../assets/salad.png";

type Props = {
  theme: Theme;
};

export default function WebUi({ theme }: Props) {
  const { getCardStyle, getButtonStyle } = useStyle();
  const cardStyle = getCardStyle(theme);
  const buttonStyle = getButtonStyle(theme);

  return (
    <section
      className={`relative overflow-hidden rounded-2xl px-4 md:px-10 py-6 transition md:mx-5 mx-1 ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Right textured dark half circle */}
      <div
        className="pointer-events-none absolute right-[-150px] lg:right-[-220px] top-1/2 -translate-y-1/2 h-[300px] w-[300px] md:h-[520px] md:w-[480px] rounded-full"
        style={{ backgroundColor: theme.background }}
      />
      <div
        className="pointer-events-none absolute right-[-150px] lg:right-[-220px] top-1/2 -translate-y-1/2 h-[300px] w-[300px] md:h-[520px] md:w-[480px] rounded-full opacity-20"
        style={{
          background:
            `radial-gradient(circle at 20% 20%, ${theme.text}22, transparent 35%), 
             radial-gradient(circle at 70% 60%, ${theme.text}11, transparent 40%)`,
        }}
      />

      {/* Top Nav */}
      <div className="relative z-10 mb-10 flex items-center justify-between">
        <div className="text-2xl font-bold" style={{ color: theme.primary }}>
          FOODS
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {["Home", "Menu", "Service", "Shop"].map((item) => (
            <button key={item} className="hover:opacity-80 transition">
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} />
            <span
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-white text-[10px] grid place-items-center"
              style={{ backgroundColor: theme.primary }}
            >
              2
            </span>
          </div>
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition`}
            style={{ borderColor: theme.primary + "55", color: theme.text }}
          >
            <User size={14} /> Sign in
          </button>
          <button
            className={`px-4 py-1.5 rounded-full text-xs transition ${buttonStyle.className}`}
            style={buttonStyle.style.color ? buttonStyle.style : { backgroundColor: theme.primary, color: theme.background }}
          >
            Login
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 grid grid-cols-12 items-center">
        {/* Left content */}
        <div className="col-span-12 lg:col-span-6 pr-0 lg:pr-6 text-center lg:text-left">
          <h1 className="text-3xl md:text-[40px] leading-tight font-bold">
            Order your <br />
            <span className="font-normal">favourite Foods</span>
          </h1>

          <p
            className="mt-3 max-w-md mx-auto lg:mx-0 text-[12.5px] leading-relaxed"
            style={{ color: theme.text + "99" }}
          >
            Fresh and tasty seafood curry sit amet, consectetur. Curabitur accumsan
            auctor pulvinar proin sit amet.
          </p>

          <p className="mt-4 text-base">
            Total order : <span className="font-semibold">$24.30</span>
          </p>

          <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
            <button
              className={`px-5 py-2.5 rounded-full text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition ${buttonStyle.className}`}
              style={buttonStyle.style.color ? buttonStyle.style : {
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: theme.background,
              }}
            >
              <ShoppingCart size={16} /> Buy Now
            </button>
          </div>

          {/* pager */}
          <div
            className="mt-4 flex items-center justify-center lg:justify-start gap-3 text-xs"
            style={{ color: theme.text + "99" }}
          >
            <button
              className="h-7 w-7 rounded-full border grid place-items-center"
              style={{ borderColor: theme.primary + "44" }}
            >
              <ChevronLeft size={13} />
            </button>
            <span>1</span>
            <span style={{ color: theme.text + "55" }}>2</span>
            <button
              className="h-7 w-7 rounded-full border grid place-items-center"
              style={{ borderColor: theme.primary + "44" }}
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Categories pills (WITH IMAGES) */}
          <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-5">
            {[
              { name: "Burger", price: "$3.25", img: burger },
              { name: "Cake", price: "$2.25", img: cake },
              { name: "Salad", price: "$5.25", img: salad },
            ].map((item) => (
              <div
                key={item.name}
                className="w-[90px] md:w-[110px] rounded-2xl px-2 md:px-4 py-3 md:py-4 text-center shadow-xl"
                style={{
                  backgroundColor: theme.surface,
                  border: `1px solid ${theme.primary}22`,
                }}
              >
                <div
                  className="mx-auto mb-2 h-10 w-10 md:h-12 md:w-12 rounded-full grid place-items-center overflow-hidden"
                  style={{ backgroundColor: theme.primary + "22" }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-6 w-6 md:h-8 md:w-8 object-contain drop-shadow-md"
                  />
                </div>

                <div className="text-[11px] md:text-sm font-semibold">{item.name}</div>
                <div className="text-[10px] md:text-xs" style={{ color: theme.text + "99" }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="col-span-12 lg:col-span-6 mt-8 lg:mt-0 relative flex justify-center">
          <div
            className="relative z-10 h-[280px] w-[280px] md:h-[440px] md:w-[440px] rounded-full overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${theme.primary}33` }}
          >
            <img src={foodImg} alt="Food" className="h-full w-full object-cover" />
          </div>

          {/* floating rating card (THEMED) */}
          <div
            className="absolute right-3 bottom-3 z-20 rounded-xl px-4 py-3 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: theme.background,
            }}
          >
            <div className="text-sm font-medium">Salad</div>
            <div className="flex items-center gap-2 text-xs opacity-90">
              ⭐ 4.7
            </div>
            <div
              className="mt-1 text-[11px] inline-block px-2 py-0.5 rounded-full"
              style={{ backgroundColor: theme.background + "55" }}
            >
              12–18 mins
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
