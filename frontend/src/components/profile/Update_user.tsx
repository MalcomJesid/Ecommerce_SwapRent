import { useState } from "react";
import "./Update_user.css";
import ConfirmDeleteModal from "../auth/ConfirmDeleteModal";

const Update_user = () => {
  const [formData, setFormData] = useState({
    name: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simular actualización de datos
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
    setMessage("✅ Datos actualizados correctamente.");
  };

  // Manejar eliminación del usuario
  const handleDeleteUser = () => {
    console.log("Usuario eliminado");
    setIsOpen(false);
  };

  return (
    <div className="update-container">
      <div className="update-box">
        <h2>Actualizar Usuario</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </div>

          <div className="button-group">
            <button type="submit" className="update-button">
              Actualizar
            </button>
          </div>
        </form>

        {/* Botón para abrir el Modal de confirmación */}
        <div className="Olcontraseña">
          <button onClick={() => setIsOpen(true)}>Eliminar Usuario</button>
        </div>

        {/* Modal de confirmación */}
        {isOpen && <ConfirmDeleteModal onClose={() => setIsOpen(false)} onConfirm={handleDeleteUser} />}
      </div>
    </div>
  );
};

export default Update_user;