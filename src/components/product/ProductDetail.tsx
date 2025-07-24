import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams(); // Obtiene el ID del producto desde la URL
  const [days, setDays] = useState(1);

  // Simulación de datos del producto (puedes reemplazar esto con datos reales de Firestore)
  const product = {
    id: productId,
    name: "Mesa de lujo + 6 sillas",
    pricePerDay: 65500,
    description: "Mesa de lujo con 6 sillas para reuniones especiales.",
    image: "/src/assets/product/mesas-con6sillas.png",
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setDays(value > 0 ? value : 1); // Asegúrate de que los días sean al menos 1
  };

  const handleRent = () => {
    alert(`Has rentado el producto "${product.name}" por ${days} días.`);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">
          Precio por día: <strong>${product.pricePerDay.toLocaleString()}</strong>
        </p>
        <div className="rent-options">
          <label htmlFor="days">Días de renta:</label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={handleDaysChange}
            min="1"
          />
        </div>
        <p className="total-price">
          Total: <strong>${(product.pricePerDay * days).toLocaleString()}</strong>
        </p>
        <button className="rent-button" onClick={handleRent}>
          Rentar
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;