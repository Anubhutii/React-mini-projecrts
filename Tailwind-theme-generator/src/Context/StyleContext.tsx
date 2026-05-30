import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAnimation } from "./AnimationContext";

export type ComponentStyleType = "glass" | "flat" | "neo" | "gradient";

export type StyleProps = {
  className: string;
  style: React.CSSProperties;
};

type StyleContextType = {
  componentStyle: ComponentStyleType;
  setComponentStyle: (style: ComponentStyleType) => void;
  getCardStyle: (theme: any) => StyleProps;
  getButtonStyle: (theme: any) => StyleProps;
};

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const { getAnimationClasses } = useAnimation();
  const [componentStyle, setComponentStyle] = useState<ComponentStyleType>(() => {
    const saved = localStorage.getItem("componentStyle");
    return (saved as ComponentStyleType) || "glass";
  });

  useEffect(() => {
    localStorage.setItem("componentStyle", componentStyle);
  }, [componentStyle]);

  const getCardStyle = (theme: any): StyleProps => {
    const animClasses = getAnimationClasses("card", theme.primary);
    const isDarkTheme = theme && theme.background && !["#FFFFFF", "#F8FAFC"].includes(theme.background.toUpperCase());
    switch (componentStyle) {
      case "glass":
        return {
          className: `backdrop-blur-xl ${isDarkTheme ? "bg-white/10 border-white/20 shadow-lg" : "bg-black/[0.03] border-black/[0.08] shadow-md"} ${animClasses}`,
          style: { color: theme.text, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "flat":
        return {
          className: `${isDarkTheme ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"} border-2 shadow-none ${animClasses}`,
          style: { color: theme.text, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "neo":
        return {
          className: `${isDarkTheme ? "bg-slate-900 shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#1a1a1a]" : "bg-slate-50 shadow-[8px_8px_16px_#cbd5e1,-8px_-8px_16px_#ffffff]"} border-none ${animClasses}`,
          style: { color: theme.text, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "gradient":
        return {
          className: `text-white border-none shadow-xl ${animClasses}`,
          style: {
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: "#ffffff",
            "--theme-glow": `${theme.primary}66`
          } as any,
        };
      default:
        return { className: animClasses, style: { "--theme-glow": `${theme.primary}66` } as any };
    }
  };

  const getButtonStyle = (theme: any): StyleProps => {
    const animClasses = getAnimationClasses("button", theme.primary);
    const isDarkTheme = theme && theme.background && !["#FFFFFF", "#F8FAFC"].includes(theme.background.toUpperCase());
    switch (componentStyle) {
      case "glass":
        return {
          className: `backdrop-blur-md ${isDarkTheme ? "bg-white/20 border-white/30" : "bg-black/[0.05] border-black/[0.1]"} shadow-md ${animClasses}`,
          style: { color: theme.primary, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "flat":
        return {
          className: `${isDarkTheme ? "bg-slate-700 border-slate-600" : "bg-slate-100 border-slate-200"} border shadow-none ${animClasses}`,
          style: { color: theme.primary, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "neo":
        return {
          className: `${isDarkTheme ? "bg-slate-800 shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#1a1a1a] hover:shadow-[inset_4px_4px_8px_#0a0a0a,inset_-4px_-4px_8px_#1a1a1a]" : "bg-slate-100 shadow-[4px_4px_8px_#cbd5e1,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#cbd5e1,inset_-4px_-4px_8px_#ffffff]"} border-none ${animClasses}`,
          style: { color: theme.primary, "--theme-glow": `${theme.primary}66` } as any,
        };
      case "gradient":
        return {
          className: `text-white border-none shadow-lg ${animClasses}`,
          style: {
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: "#ffffff",
            "--theme-glow": `${theme.primary}66`
          } as any,
        };
      default:
        return { className: animClasses, style: { "--theme-glow": `${theme.primary}66` } as any };
    }
  };

  return (
    <StyleContext.Provider value={{ componentStyle, setComponentStyle, getCardStyle, getButtonStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error("useStyle must be used within a StyleProvider");
  }
  return context;
};

