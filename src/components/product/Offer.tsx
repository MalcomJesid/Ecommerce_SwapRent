import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebase";
import "./Offer.css";

interface Producto {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  shipping: string;
  image: string;
}

const Offer: React.FC = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "productos");
        const q = query(productsRef, orderBy("pricePerDay", sortOrder));
        const querySnapshot = await getDocs(q);

        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Producto[];

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [sortOrder]);

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
    <div className="offer-container">
      <h1>Ofertas</h1>
      <div className="sort-options">
        <button
          className={`sort-btn ${sortOrder === "asc" ? "active" : ""}`}
          onClick={() => setSortOrder("asc")}
        >
          Precio Ascendente
        </button>
        <button
          className={`sort-btn ${sortOrder === "desc" ? "active" : ""}`}
          onClick={() => setSortOrder("desc")}
        >
          Precio Descendente
        </button>
      </div>

      <div className="products-list">
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map((producto) => (
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

export default Offer;