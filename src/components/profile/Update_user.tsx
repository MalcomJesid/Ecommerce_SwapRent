import { useState } from "react";
import "./Update_user.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Importa la configuración de Firebase

const Update_user = () => {
  const [formData, setFormData] = useState({
    name: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Actualizar datos del usuario en Firebase
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Referencia al documento del usuario en Firestore
      const userDocRef = doc(db, "usuarios", formData.email); // Usa el email como ID del documento

      // Actualiza los datos del usuario
      await updateDoc(userDocRef, {
        nombre: formData.name,
        apellido: formData.apellido,
        password: formData.password,
      });

      setMessage("✅ Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      setMessage("❌ Hubo un error al actualizar los datos.");
    }
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
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="update-button">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_user;