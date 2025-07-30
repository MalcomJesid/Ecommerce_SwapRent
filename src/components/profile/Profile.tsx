import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "./Profile.css";
import Update_user from "./Update_user";
import avatar from "../../assets/product/images.jpeg";

interface Usuario {
  nombre: string;
  email: string;
  avatar: string;
  intercambios: number;
  miembroDesde: string;
  tiempoMiembro: string;
}

interface Producto {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  shipping: string;
  image: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [mostrarActualizarUsuario, setMostrarActualizarUsuario] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]); // Estado para almacenar los productos del usuario
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    const userData: Usuario = {
      nombre: "Sandra Torres",
      email: "sandraswaprent@gmail.com",
      avatar: avatar,
      intercambios: 14,
      miembroDesde: "2025",
      tiempoMiembro: "1 año 4 meses",
    };
    setUser(userData);

    // Simulación de productos agregados por el usuario
    const userProducts: Producto[] = [
      {
        id: "1",
        name: "Mesa de lujo + 6 sillas",
        description: "Mesa de lujo con 6 sillas para reuniones especiales.",
        pricePerDay: 65500,
        shipping: "Envío gratis",
        image: "/src/assets/product/mesas-con6sillas.png",
      },
      {
        id: "2",
        name: "Vestido de gala",
        description: "Vestido elegante para eventos especiales.",
        pricePerDay: 45000,
        shipping: "Envío gratis",
        image: "/src/assets/product/vestido.png",
      },
    ];
    setProductos(userProducts);
  }, []);

  const handleActualizarUsuario = () => {
    setMostrarActualizarUsuario(!mostrarActualizarUsuario);
  };

  const handleActualizarProductos = () => {
    navigate("/create-product"); // Navega a la ruta /create-product
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="sidebar-avatar">
          {user.avatar && <img src={user.avatar} alt="Avatar del usuario" className="avatar" />}
          <h2>{user.nombre}</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Mi Perfil</li>
          <li>Mis Productos</li>
          <li>Configuración</li>
          <li>Cerrar sesión</li>
        </ul>
      </aside>

      <main className="main-profile">
        <h1>Mi cuenta</h1>

        <div className="buttons-row">
          <button className="update-btn" onClick={handleActualizarUsuario}>
            {mostrarActualizarUsuario ? "Cerrar formulario" : "Actualizar Información del Usuario"}
          </button>
          <button className="update-btn" onClick={handleActualizarProductos}>
            Crear Productos
          </button>
        </div>

        {/* Formulario para actualizar usuario */}
        {mostrarActualizarUsuario && <Update_user />}

        <section className="profile-section">
          <div className="card">
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div className="card">
            <h3>Intercambios</h3>
            <p>{user.intercambios}</p>
          </div>
          <div className="card">
            <h3>Miembro desde</h3>
            <p>{user.miembroDesde}</p>
          </div>
          <div className="card">
            <h3>Tiempo como miembro</h3>
            <p>{user.tiempoMiembro}</p>
          </div>
        </section>
<section className="products-section">
  <h2>Mis Productos</h2>
  <div className="products-list">
    {productos.map((producto) => (
      <div key={producto.id} className="product-item">
        <img src={producto.image} alt={producto.name} className="product-image" />
        <div className="product-details">
          <h3>{producto.name}</h3>
          <p className="price">${producto.pricePerDay.toLocaleString()} / día</p>
        </div>
      </div>
    ))}
  </div>
</section>
      </main>
    </div>
  );
};

export default Profile;