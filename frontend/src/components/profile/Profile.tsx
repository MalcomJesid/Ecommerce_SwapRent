import React, { useEffect, useState } from 'react';
import './Profile.css';
import Update_user from './Update_user'; 
import avatar from '../../assets/product/images.jpeg';


interface Usuario {
  nombre: string;
  email: string;
  avatar: string;
  intercambios: number;
  miembroDesde: string;
  tiempoMiembro: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [mostrarActualizarUsuario, setMostrarActualizarUsuario] = useState(false);

  useEffect(() => {
    const userData: Usuario = {
      nombre: 'Sandra Torres',
      email: 'sandraswaprent@gmail.com',
      avatar: avatar,
      intercambios: 14,
      miembroDesde: '2025',
      tiempoMiembro: '1 año 4 meses',
    };
    setUser(userData);
  }, []);

  const handleActualizarUsuario = () => {
    setMostrarActualizarUsuario(!mostrarActualizarUsuario);
  };

  const handleActualizarProductos = () => {
    alert('Función para actualizar productos');
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="sidebar-avatar">
          {user.avatar && (<img src={user.avatar} alt="Avatar del usuario" className="avatar" />)}
          <h2>{user.nombre}</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Mi Perfil</li>
          <li>Mis Intercambios</li>
          <li>Mis Productos</li>
          <li>Configuración</li>
          <li>Cerrar sesión</li>
        </ul>
      </aside>

      <main className="main-profile">
        <h1>Mi cuenta</h1>

        <div className="buttons-row">
          <button className="update-btn" onClick={handleActualizarUsuario}>
            {mostrarActualizarUsuario ? 'Cerrar formulario' : 'Actualizar Información del Usuario'}
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
      </main>
    </div>
  );
};

export default Profile;
