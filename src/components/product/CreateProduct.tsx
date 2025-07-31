import React, { useState } from "react";
import "./CreateProduct.css";
import { db } from "../../firebase/firebase"; // Importa la configuración de Firebase
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importa Firebase Auth

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    name: "",
    pricePerDay: 0,
    shipping: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Validación para el campo `shipping`
    if (name === "shipping") {
      if (value !== "Envío gratis" && isNaN(Number(value))) {
        alert("El valor de envío debe ser 'Envío gratis' o un número válido.");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("No hay un usuario logueado.");
        return;
      }

      // Genera el atributo `image` basado en la categoría seleccionada
      const image = `/src/assets/product/${formData.category.toLowerCase()}.png`;

      const newProduct = {
        ...formData,
        image,
        id: Date.now().toString(), // Genera un ID único para el producto
      };

      // Guarda el producto en la colección global `productos`
      const productsRef = collection(db, "productos");
      await addDoc(productsRef, newProduct);

      // Guarda el producto en la subcolección `productos` dentro del usuario
      const userProductsRef = collection(db, `usuarios/${currentUser.email}/productos`);
      await addDoc(userProductsRef, newProduct);

      alert("Producto creado exitosamente");
      setFormData({
        category: "",
        description: "",
        name: "",
        pricePerDay: 0,
        shipping: "",
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al crear el producto");
    }
  };

  return (
    <div className="create-product-container">
      <h1>Crear Producto</h1>
      <form className="create-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Vehículos">Vehículos</option>
            <option value="Moda">Moda</option>
            <option value="Muebles">Muebles</option>
            <option value="Promociones">Promociones</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pricePerDay">Precio por día</label>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping">Envío</label>
          <input
            type="text"
            id="shipping"
            name="shipping"
            value={formData.shipping}
            onChange={handleInputChange}
            placeholder="Envío gratis o precio en números"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;