import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar onLoginClick={() => {}} />
      <main>{children}</main>
    </>
  );
};

export default Layout;