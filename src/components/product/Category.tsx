import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
import "./Category.css";

interface Producto {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  shipping: string;
  image: string;
  category: string;
}

const Category: React.FC = () => {
  const [categories] = useState(["Vehículos", "Moda", "Muebles", "Promociones"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!selectedCategory) return;

      try {
        const productsRef = collection(db, "productos");
        const q = query(productsRef, where("category", "==", selectedCategory));
        const querySnapshot = await getDocs(q);

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Producto[];

        setFilteredProducts(products);
      } catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  const handleAgregarAlCarrito = async (producto: Producto) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("No hay un usuario logueado.");
        return;
      }

      const cartRef = collection(db, `usuarios/${currentUser.email}/cart`);
      await addDoc(cartRef, producto);

      alert("Producto agregado al carrito.");
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  return (
    <div className="category-container">
      <h1>Filtrar por Categoría</h1>
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-list">
        {filteredProducts.length === 0 ? (
          <p>No hay productos en esta categoría.</p>
        ) : (
          filteredProducts.map((producto) => (
            <div key={producto.id} className="product-item">
              <img src={producto.image} alt={producto.name} className="product-image" />
              <div className="product-details">
                <h3>{producto.name}</h3>
                <p>{producto.description}</p>
                <p className="price">${producto.pricePerDay.toLocaleString()} / día</p>
                <p className="shipping">Envío: {producto.shipping}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAgregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;