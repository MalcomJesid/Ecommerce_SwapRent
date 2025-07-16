import "./App.css";
import Category from "./components/product/Category";
import Error404 from "./components/error/Error404";
import Layout from "./components/principal/Layout";
import { Routes, Route } from "react-router-dom"; // Asegúrate de importar desde 'react-router-dom'
import Offer from "./components/product/Offer";
import Rent from "./components/product/Rent";
import Exchange from "./ascomponents/product/Exchange";
import History from "./components/chat/History";
import Content from "./components/principal/Content";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Modal } from "reactstrap";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Ruta principal que usa el Layout */}
        <Route path="/" element={<Layout />}>
          {/* Rutas anidadas */}
          <Route path="" element={<Content />} />
          <Route path="category" element={<Category />} />
          <Route path="offer" element={<Offer />} />
          <Route path="history" element={<History />} />
          <Route path="rent" element={<Rent />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="modal" element={<Modal />} />
        </Route>

        {/* Ruta para error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
