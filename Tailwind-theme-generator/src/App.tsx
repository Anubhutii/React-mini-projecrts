import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Preview from "./Components/Previewdemo";
import ConfigPanel from "./Components/ConfigPanel";
import { themes } from "./data/themes";
import type { Theme } from "./types/theme";
import { IoClose } from "react-icons/io5";
import { Palette, Layers, Zap, Eye, Settings } from "lucide-react";


export default function App() {
  const [theme, setTheme] = useState<Theme>(themes.calm);
  const [showConfig, setShowConfig] = useState(false);
  const [activeTab, setActiveTab] = useState<"themes" | "styles" | "fx" | "preview" | "config">("preview");

  const mobileTabs: { id: "themes" | "styles" | "fx" | "preview" | "config"; label: string; icon: any }[] = [
    { id: "themes", label: "Themes", icon: Palette },
    { id: "styles", label: "Styles", icon: Layers },
    { id: "fx", label: "Animations", icon: Zap },
    { id: "config", label: "Config", icon: Settings },
    { id: "preview", label: "Preview", icon: Eye },
  ];

  const handleTabClick = (tabId: typeof activeTab) => {
    if (tabId === "config") {
      setShowConfig(true);
      setActiveTab("preview");
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div
      className="min-h-screen w-full text-slate-100"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(79,124,255,0.15), transparent 40%), #0B0F1A",
      }}
    >
      <div className="flex flex-col md:flex-row min-h-screen pb-20 md:pb-0">
        {/* 🔹 LEFT SIDEBAR (Desktop Only) */}
        <aside className="hidden md:block w-[260px] pl-5 pr-3 py-10 border-r border-white/10 shrink-0 h-screen sticky top-0 overflow-y-auto">
          <Sidebar currentTheme={theme} onChangeTheme={setTheme} />
        </aside>

        {/* 🔹 MOBILE DROPUP MENU */}
        {activeTab !== "preview" && (
          <div className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setActiveTab("preview")}>
            <div
              className="absolute bottom-20 left-4 right-4 max-h-[70vh] bg-[#161B22]/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 overflow-hidden flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold capitalize">{activeTab === 'fx' ? 'Animations' : activeTab}</h3>
                <button
                  onClick={() => setActiveTab("preview")}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <IoClose size={20} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                <Sidebar
                  currentTheme={theme}
                  onChangeTheme={setTheme}
                  mobileTab={activeTab as "themes" | "styles" | "fx"}
                />
              </div>
            </div>
          </div>
        )}

        {/* 🔹 RIGHT SIDE – PREVIEW AREA */}
        <main className="flex-1 relative overflow-x-hidden px-2 md:px-8 py-4 md:py-10">
          {/* 🔹 TOP RIGHT CONFIG BUTTON */}
          <button
            onClick={() => setShowConfig(true)}
            className="
              hidden md:block
              fixed top-6 right-6 z-50
              px-4 py-2 rounded-lg text-sm font-medium
              bg-blue-500/20 border border-blue-400/40
              backdrop-blur-md hover:bg-blue-500/30 transition
            "
          >
            Tailwind Config ⚙️
          </button>

          {/* 🔹 PREVIEW FULL WIDTH */}
          <div className="w-full">
            <Preview theme={theme} setTheme={setTheme} />
          </div>
        </main>
      </div>

      {/* 🔹 MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0D1117]/80 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? "text-blue-400 scale-110" : "text-slate-400 hover:text-slate-200"
                }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-blue-400/20" : ""}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 🔹 CONFIG POPUP MODAL */}
      {showConfig && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-[90%] max-w-[520px]">
            <button
              onClick={() => setShowConfig(false)}
              className="absolute -top-3 -right-3 z-10
                   h-9 w-9 rounded-full 
                   bg-black/70 border border-white/20
                   text-white grid place-items-center
                   hover:bg-black transition"
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>

            <ConfigPanel theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
}
