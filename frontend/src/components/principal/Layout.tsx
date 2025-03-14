// import Content from "./Content";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <Outlet /> {/* Aquí se renderizarán los componentes anidados */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
