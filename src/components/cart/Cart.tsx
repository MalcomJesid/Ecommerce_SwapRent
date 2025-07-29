import React, { useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Mesa de lujo + 6 sillas",
      pricePerDay: 65500,
      quantity: 1,
      image: "/src/assets/product/mesas-con6sillas.png",
    },
    {
      id: "2",
      name: "Vestido de gala",
      pricePerDay: 45000,
      quantity: 2,
      image: "/src/assets/product/vestido.png",
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.pricePerDay * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1>Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Precio por día: ${item.pricePerDay.toLocaleString()}</p>
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
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