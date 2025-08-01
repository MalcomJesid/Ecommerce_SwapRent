import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./Cart.css";

interface Producto {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  shipping: string;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          const cartRef = collection(db, `usuarios/${currentUser.email}/cart`);
          const cartSnapshot = await getDocs(cartRef);
          const items = cartSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Producto[];

          setCartItems(items);
        } else {
          console.error("No hay un usuario logueado.");
        }
      } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.pricePerDay ,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1>Mi Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p className="price">${item.pricePerDay.toLocaleString()} / día</p>
                <p className="shipping">Envío: {item.shipping}</p>
                <div className="cart-item-quantity">
                  <button
                    
                  >
                    -
                  </button>
                  <span></span>
                  <button
                    
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h2>Total: ${calculateTotal().toLocaleString()}</h2>
        <button className="checkout-button">Proceder al pago</button>
      </div>
    </div>
  );
};

export default Cart;