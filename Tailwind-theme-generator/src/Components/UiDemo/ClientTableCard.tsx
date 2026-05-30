import type { Theme } from "../../types/theme";
import { Plus, Search, Filter, Pencil, Trash2, Mail } from "lucide-react";
import { useStyle } from "../../Context/StyleContext";

type Props = {
  theme: Theme;
};

const DATA = [
  {
    name: "Netflix UK",
    country: "United Kingdom",
    contact: "Maddox Blackmore",
    email: "mblackmore@netflix.com",
    status: "Activated",
    balance: "15,000.00 GBP",
    logo: "N",
  },
  {
    name: "HBO GO",
    country: "Spain",
    contact: "Leonardo Barker",
    email: "leonardo.barker@hbo.com",
    status: "Pending",
    balance: "0.00 EUR",
    logo: "H",
  },
  {
    name: "Glovo UA",
    country: "Ukraine",
    contact: "Wallace Lambert",
    email: "eugene.smith@glovo.com",
    status: "Blocked",
    balance: "0.00 PLN",
    logo: "G",
  },
  {
    name: "DHL Parcel",
    country: "Poland",
    contact: "Khadeja Daniels",
    email: "kovalski.daniel@dhl.com",
    status: "Deactivated",
    balance: "0.00 PLN",
    logo: "D",
  },
  {
    name: "Spotify PL",
    country: "Poland",
    contact: "Maddox Blackmore",
    email: "michael.baily@spotify.com",
    status: "Activated",
    balance: "5,000.00 GBP",
    logo: "S",
  },
];

const statusColor = (status: string, theme: Theme) => {
  if (status === "Activated") return theme.primary;
  if (status === "Pending") return "#f59e0b";
  if (status === "Blocked") return "#ef4444";
  return theme.text + "66";
};

export default function ClientTableCard({ theme }: Props) {
  const { getCardStyle, getButtonStyle } = useStyle();
  const cardStyle = getCardStyle(theme);
  const buttonStyle = getButtonStyle(theme);

  return (
    <div
      className={`w-full rounded-2xl p-4 md:p-5 transition ${cardStyle.className}`}
      style={cardStyle.style}
    >
      {/* Top Bar */}
      <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          📁 <span>Clients</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 border text-xs"
            style={{ borderColor: theme.primary + "33" }}
          >
            <Search size={14} />
            <input
              placeholder="Search client"
              className="bg-transparent outline-none text-xs"
              style={{ color: theme.text }}
            />
          </div>

          {/* Filters */}
          <button
            className="flex items-center gap-1 px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: theme.primary + "33" }}
          >
            <Filter size={14} /> Filters
          </button>

          {/* New Client */}
          <button
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition ${buttonStyle.className}`}
            style={buttonStyle.style.color ? buttonStyle.style : {
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              color: theme.background,
            }}
          >
            <Plus size={14} /> New Client
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-7 gap-3 text-xs opacity-60 pb-2 border-b"
        style={{ borderColor: theme.primary + "22" }}>
        <span>Client</span>
        <span>Country</span>
        <span>Contact</span>
        <span>Email</span>
        <span>Status</span>
        <span>Balance</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div className="mt-2 space-y-2">
        {DATA.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center rounded-xl p-3 border"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.primary + "11",
            }}
          >
            {/* Client */}
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-full grid place-items-center font-bold text-sm"
                style={{
                  backgroundColor: theme.primary + "22",
                  color: theme.primary,
                }}
              >
                {item.logo}
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>

            <span className="text-xs opacity-70">{item.country}</span>
            <span className="text-xs">{item.contact}</span>
            <span className="text-xs opacity-70">{item.email}</span>

            <span
              className="text-xs font-medium"
              style={{ color: statusColor(item.status, theme) }}
            >
              {item.status}
            </span>

            <span className="text-xs">{item.balance}</span>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-md hover:opacity-80">
                <Mail size={14} />
              </button>
              <button className="p-1 rounded-md hover:opacity-80">
                <Pencil size={14} />
              </button>
              <button className="p-1 rounded-md hover:opacity-80 text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
