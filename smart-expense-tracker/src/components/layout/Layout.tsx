import type { ReactNode } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import LoginModal from "./LoginModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div
      className="
        min-h-screen
        min-w-[250px]
        transition-colors
        duration-300
        dark:bg-gradient-to-br
        dark:from-black
        dark:via-gray-900
        dark:to-gray-800
        bg-[#FAF9F6]
      "
    >
      <Navbar onLoginClick={() => setOpenLogin(true)} />
      <main className="pt-14 w-full">
        {children}
      </main>
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </div>
  );
};

export default Layout;