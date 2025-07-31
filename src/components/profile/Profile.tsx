import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import avatarPlaceholder from "../../assets/product/images.jpeg";
import { getAuth, signOut } from "firebase/auth"; // Importa Firebase Auth y signOut
import { doc, getDoc, setDoc } from "firebase/firestore"; // Importa Firestore
import { db } from "../../firebase/firebase"; // Importa la configuración de Firebase

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
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          console.log("Correo del usuario logueado:", currentUser.email); // Depuración

          const userDocRef = doc(db, "usuarios", currentUser.email!);
          let userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({
              nombre: userDoc.data().nombre,
              email: userDoc.data().email,
              avatar: userDoc.data().avatar || avatarPlaceholder,
              intercambios: userDoc.data().intercambios,
              miembroDesde: userDoc.data().miembroDesde,
              tiempoMiembro: userDoc.data().tiempoMiembro,
            });

            setProductos(userDoc.data().productos || []);
          } else {
            console.log("El documento no existe. Creando uno nuevo...");
            await setDoc(userDocRef, {
              nombre: currentUser.displayName || "Usuario",
              email: currentUser.email,
              avatar: avatarPlaceholder,
              intercambios: 0,
              miembroDesde: new Date().toISOString(),
              tiempoMiembro: "0 días",
              productos: [],
            });
            console.log("Documento creado exitosamente.");
          }
        } else {
          console.error("No hay un usuario logueado.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleActualizarProductos = () => {
    navigate("/create-product");
  };

  const handleCerrarSesion = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("Sesión cerrada exitosamente.");
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="sidebar-avatar">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar del usuario"
              className="avatar"
            />
          )}
          <h2>{user.nombre}</h2>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/profile")}>Mi Perfil</li>
          <li onClick={() => navigate("/my-products")}>Mis Productos</li>
          <li onClick={handleCerrarSesion}>Cerrar sesión</li>
        </ul>
      </aside>

      <main className="main-profile">
        <h1>Mi cuenta</h1>
        <div className="buttons-row">
          <button className="update-btn">
            Actualizar información del usuario
          </button>

          <button className="update-btn" onClick={handleActualizarProductos}>
            Crear Productos
          </button>
        </div>

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
                <img
                  src={producto.image}
                  alt={producto.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{producto.name}</h3>
                  <p className="price">
                    ${producto.pricePerDay.toLocaleString()} / día
                  </p>
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
