import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type AnimationSettings = {
  animationsEnabled: boolean;
  hoverEffects: boolean;
  cardGlow: boolean;
  buttonRipple: boolean;
};

type AnimationContextType = {
  animations: AnimationSettings;
  setAnimation: (key: keyof AnimationSettings, value: boolean) => void;
  getAnimationClasses: (type: "card" | "button" | "panel", themePrimary?: string) => string;
};

const defaultSettings: AnimationSettings = {
  animationsEnabled: true,
  hoverEffects: true,
  cardGlow: true,
  buttonRipple: true,
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [animations, setAnimations] = useState<AnimationSettings>(() => {
    const saved = localStorage.getItem("uiAnimationsSettings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("uiAnimationsSettings", JSON.stringify(animations));
  }, [animations]);

  // Global Ripple Effect Listener
  useEffect(() => {
    if (!animations.animationsEnabled || !animations.buttonRipple) return;

    const handleRipple = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn-ripple') as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${x - radius}px`;
      circle.style.top = `${y - radius}px`;
      circle.className = "absolute rounded-full bg-white/30 pointer-events-none animate-ripple";

      // Remove existing ripples to avoid clogging the DOM
      const existing = target.getElementsByClassName("animate-ripple")[0];
      if (existing) {
        existing.remove();
      }

      target.appendChild(circle);
    };

    document.addEventListener("mousedown", handleRipple);
    return () => document.removeEventListener("mousedown", handleRipple);
  }, [animations.animationsEnabled, animations.buttonRipple]);

  const setAnimation = (key: keyof AnimationSettings, value: boolean) => {
    setAnimations((prev) => {
      const next = { ...prev, [key]: value };
      
      if (key === "animationsEnabled" && !value) {
        next.hoverEffects = false;
        next.cardGlow = false;
        next.buttonRipple = false;
      } else if (key === "animationsEnabled" && value) {
        next.hoverEffects = true;
        next.cardGlow = true;
        next.buttonRipple = true;
      } else {
        if (value) {
          next.animationsEnabled = true;
        } else {
          if (!next.hoverEffects && !next.cardGlow && !next.buttonRipple) {
            next.animationsEnabled = false;
          }
        }
      }
      return next;
    });
  };

  const getAnimationClasses = (type: "card" | "button" | "panel", themePrimary?: string) => {
    if (!animations.animationsEnabled) return "";

    let classes = "transition-all duration-300 ease-in-out ";

    if (animations.hoverEffects) {
      if (type === "card" || type === "button") {
         classes += "hover:scale-[1.02] ";
      }
    }

    if (animations.cardGlow && (type === "card" || type === "panel")) {
      classes += themePrimary ? "shadow-lg hover:shadow-xl hover:shadow-[color:var(--theme-glow)] " : "shadow-lg hover:shadow-xl hover:shadow-purple-500/40 ";
    }

    if (animations.buttonRipple && type === "button") {
      classes += "relative overflow-hidden btn-ripple ";
    }

    return classes.trim();
  };

  return (
    <AnimationContext.Provider value={{ animations, setAnimation, getAnimationClasses }}>
      <div style={{ "--theme-glow": "var(--primary-color, #a855f7) 40%" } as React.CSSProperties}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
