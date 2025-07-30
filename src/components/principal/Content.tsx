import banner1 from '../../assets/banners/Banner1.png';
import banner2 from '../../assets/banners/Banner2.png';
import banner3 from '../../assets/banners/Banner3.png';
import bannerpromocional from '../../assets/banners/bannerpromocional.png';
import oferta from '../../assets/product/oferta.png';
import gratis from '../../assets/product/gratis.png';
import cupon from '../../assets/product/cupon.png';
import vestido from '../../assets/product/vestido.png';
import auto from '../../assets/product/auto.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { getProducts } from '../../firebase/servicesFirebase'; // Importa la función para obtener productos

const Content = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [products, setProducts] = useState<any[]>([]); // Estado para almacenar los productos
  const banners = [banner1, banner2, banner3];
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Llama a saveProductsToFirestore cuando el componente se monte
   // El array vacío asegura que esto solo se ejecute una vez al montar el componente

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [autoSlide, banners.length]);

  const plusSlides = (n: any) => {
    setAutoSlide(false);
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;
      if (newIndex >= banners.length) return 0;
      if (newIndex < 0) return banners.length - 1;
      return newIndex;
    });
  };

  // Obtiene los productos desde Firestore cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts); // Almacena los productos en el estado
        console.log("Productos obtenidos:", fetchedProducts);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="slider">
        <div className="slides">
          {banners.map((banner, index) => (
            <div key={index} className="slide" style={{ display: index === slideIndex ? "block" : "none" }}>
              <img src={banner} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </button>
        <button className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </button>
      </div>

      <div className="grid-section">
        <div className="grid-container">
          <div className="grid-item">
            <img src={oferta} alt="Image 1" />
            <button>OFERTA</button>
          </div>
          <div className="grid-item">
            <img src={gratis} alt="Image 2" />
            <button>GRATIS</button>
          </div>
          <div className="grid-item">
            <img src={cupon} alt="Image 3" />
            <button>CUPÓN</button>
          </div>
          <div className="grid-item">
            <img src={vestido} alt="Image 4" />
            <button>MODA</button>
          </div>
          <div className="grid-item">
            <img src={auto} alt="Image 5" />
            <button>VEHÍCULOS</button>
          </div>
        </div>
      </div>

      <div className="banner">
        <img src={bannerpromocional} alt="Promotional-Banner" />
      </div>

      <div className="grid-item-products">
        <div className="grid-container-products">
          {products.map((product) => (
            <div
              key={product.id} // Usa el ID del documento generado por Firestore
              className="grid-products"
              onClick={() => {
                console.log("Navegando al producto con ID:", product.id); // Depuración
                navigate(`/product/${product.id}`); // Navega usando el ID del documento
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">
                  Precio por día: <strong>${product.pricePerDay.toLocaleString()}</strong>
                </p>
                <p className="shipping">
                  Envío: <strong>{product.shipping}</strong>
                </p>
              </div>
              <button className="rentable-button">PRODUCTO RENTABLE</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content;
