import { Lock, User } from "lucide-react";
import { useState } from "react";
import { useStyle } from "../../Context/StyleContext";
import type { Theme } from "../../types/theme";

type Props = {
  theme: Theme;
};

export default function RegisterCard({ theme }: Props) {
  const { getCardStyle, getButtonStyle } = useStyle();
  const cardStyle = getCardStyle(theme);
  const buttonStyle = getButtonStyle(theme);

  const [accept, setAccept] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  return (
    <div
      className={`w-full rounded-2xl p-4 md:p-5 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div
          className="h-9 w-9 rounded-full grid place-items-center"
          style={{ backgroundColor: theme.primary + "22", color: theme.primary }}
        >
          <User size={16} />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Create new account</h3>
          <p className="text-xs opacity-70">
            Registration is free and only takes a minute
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <div className="relative">
          <User
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
          />
          <input
            className="w-full rounded-xl border bg-transparent px-9 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="Username"
            autoComplete="new-password"
            style={{
              borderColor: theme.primary + "33",
              color: theme.text,
            }}
          />
        </div>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
          />
          <input
            type="password"
            autoComplete="new-password"
            className="w-full rounded-xl border bg-transparent px-9 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="Password"
            style={{
              borderColor: theme.primary + "33",
              color: theme.text,
            }}
          />
        </div>

        <p className="text-xs text-red-400">
          Password must be 8+ characters
        </p>
      </div>

      {/* Toggles */}
      <div className="mt-3 space-y-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accept}
            onChange={() => setAccept(!accept)}
            className="accent-current"
            style={{ accentColor: theme.primary }}
          />
          <span className="opacity-80">Accept terms without reading</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={subscribe}
            onChange={() => setSubscribe(!subscribe)}
            className="accent-current"
            style={{ accentColor: theme.primary }}
          />
          <span className="opacity-80">Subscribe to spam emails</span>
        </label>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <button
          className={`px-5 py-2.5 rounded-xl text-sm font-medium ${buttonStyle.className}`}
          style={buttonStyle.style.color ? buttonStyle.style : { background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.background }}
        >
          Register
        </button>

        <button
          className="text-xs underline opacity-80 hover:opacity-100"
          style={{ color: theme.primary }}
        >
          Or login
        </button>
      </div>
    </div>
  );
}
