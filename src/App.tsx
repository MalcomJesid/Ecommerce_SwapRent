import "./App.css";
import { Routes, Route } from "react-router-dom"; // Importa las rutas desde react-router-dom
import Layout from "./components/principal/Layout";
import Content from "./components/principal/Content";
import ProductDetail from "./components/product/ProductDetail";
import Category from "./components/product/Category";
import Offer from "./components/product/Offer";
import Rent from "./components/product/Rent";
import Exchange from "./components/product/Exchange";
import History from "./components/chat/History";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Error404 from "./components/error/Error404";
import { Modal } from "reactstrap";
import { Toaster } from "sonner";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/Cart";

const App = () => {
  return (
    <>
      {/* Notificaciones */}
      <Toaster position="top-right" richColors />

      {/* Configuración de rutas */}
      <Routes>
        {/* Ruta principal que usa el Layout */}
        <Route path="/" element={<Layout />}>
          {/* Rutas anidadas */}
          <Route index element={<Content />} /> {/* Página principal */}
          <Route path="product/:productId" element={<ProductDetail />} /> {/* Detalles del producto */}
          <Route path="category" element={<Category />} />
          <Route path="offer" element={<Offer />} />
          <Route path="history" element={<History />} />
          <Route path="rent" element={<Rent />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="modal" element={<Modal />} />
          <Route path="profile" element={<Profile />} />
          <Route path="modal" element={<Modal />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Ruta para error 404 */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
