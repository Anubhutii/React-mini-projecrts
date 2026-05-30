import { useState } from "react";

import Navbar from "./components/layout/Navbar";

import LoginModal from "./components/layout/LoginModal";

function App() {

  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-black
        via-gray-900
        to-gray-800
      "
    >

      <Navbar onLoginClick={() => setOpenLogin(true)} />

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />

    </div>
  );
}

export default App;