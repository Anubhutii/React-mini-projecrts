import type { Theme } from "../types/theme";

export const themes: Record<string, Theme> = {
  // ===== EXISTING THEMES (UNCHANGED) =====
  calm: {
    name: "Calm",
    primary: "#6D5CE8",
    secondary: "#A29BFE",
    background: "#0B0F1A",
    surface: "#111827",
    text: "#E5E7EB",
  },

  dark: {
    name: "Dark Hacker",
    primary: "#22D3EE",
    secondary: "#A78BFA",
    background: "#020617",
    surface: "#0F172A",
    text: "#E5E7EB",
  },

  startup: {
    name: "Startup Clean",
    primary: "#4F7CFF",
    secondary: "#22D3EE",
    background: "#0B0F1A",
    surface: "#111827",
    text: "#E5E7EB",
  },

  midnight: {
    name: "Midnight",
    primary: "#6366F1",
    secondary: "#A78BFA",
    background: "#020617",
    surface: "#020617",
    text: "#E5E7EB",
  },

  mono: {
    name: "Mono",
    primary: "#E5E7EB",
    secondary: "#9CA3AF",
    background: "#020617",
    surface: "#111827",
    text: "#E5E7EB",
  },

  Neon: {
    name: "Neon",
    primary: "#00E5FF",
    secondary: "#7C7CFF",
    background: "#060B14",
    surface: "#0B1220",
    text: "#E6F1FF",
  },

  cyberpunk: {
    name: "Cyberpunk Glow",
    primary: "#00F5D4",
    secondary: "#F72585",
    background: "#05070F",
    surface: "#0E1220",
    text: "#F1F5F9",
  },

  // ===== NEW DAISYUI-INSPIRED + PASTEL + SOLID =====
  light: {
    name: "Light",
    primary: "#2563EB",
    secondary: "#22C55E",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",
  },

  emerald: {
    name: "Emerald",
    primary: "#10B981",
    secondary: "#34D399",
    background: "#020617",
    surface: "#022C22",
    text: "#D1FAE5",
  },

  corporate: {
    name: "Corporate",
    primary: "#2563EB",
    secondary: "#64748B",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",
  },

  synthwave: {
    name: "Synthwave",
    primary: "#F72585",
    secondary: "#7209B7",
    background: "#0B032D",
    surface: "#1B065E",
    text: "#FDEBFF",
  },

  halloween: {
    name: "Halloween",
    primary: "#FB923C",
    secondary: "#A855F7",
    background: "#0B0702",
    surface: "#1C1205",
    text: "#FEF3C7",
  },

  lofi: {
    name: "Lofi",
    primary: "#A3A3A3",
    secondary: "#737373",
    background: "#0F172A",
    surface: "#111827",
    text: "#E5E7EB",
  },

  fantasy: {
    name: "Fantasy",
    primary: "#8B5CF6",
    secondary: "#F59E0B",
    background: "#0B1020",
    surface: "#1E1B4B",
    text: "#EDE9FE",
  },
};
