import type { Theme } from "../types/theme";
import Navbar from "./Navbar";
import UiDemo from "./UiDemo/UiDemo";


type Props = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export default function Preview({ theme, setTheme }: Props) {
  return (
    <main
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 
                 shadow-[0_20px_60px_-20px_rgba(79,124,255,0.35)] 
                 overflow-y-auto overflow-x-hidden w-full max-w-full"
      style={{
        backgroundColor: theme.surface,
        color: theme.text,
      }}
    >
      <Navbar theme={theme} setTheme={setTheme} />

      <UiDemo theme={theme} />
    </main>
  );
}

