import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"; // Importa addDoc
import { getAuth } from "firebase/auth"; // Importa getAuth
import { db } from "../../firebase/firebase";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams(); // Obtiene el ID del producto desde la URL
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("El ID del producto no está definido");
        return;
      }

      try {
        console.log("Obteniendo producto con ID:", productId);

        // Realiza una consulta en Firestore para buscar el producto por el campo `id`
        const productsRef = collection(db, "productos");
        const q = query(productsRef, where("id", "==", productId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data();
          console.log("Producto encontrado:", productData);
          setProduct(productData);
        } else {
          console.error("No se encontró el producto");
          setError("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al obtener el producto");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAgregarAlCarrito = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("No hay un usuario logueado.");
        return;
      }

      const cartRef = collection(db, `usuarios/${currentUser.email}/cart`);
      await addDoc(cartRef, product);

      alert("Producto agregado al carrito.");
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">
          Precio por día: <strong>${product.pricePerDay?.toLocaleString()}</strong>
        </p>
        <p>Envío: {product.shipping || "Sin información de envío"}</p>
        <button className="add-to-cart-btn" onClick={handleAgregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;