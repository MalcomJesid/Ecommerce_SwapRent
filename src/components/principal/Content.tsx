import banner1 from '../../assets/banners/Banner1.png';
import banner2 from '../../assets/banners/Banner2.png';
import banner3 from '../../assets/banners/Banner3.png';
import bannerpromocional from '../../assets/banners/bannerpromocional.png';
import oferta from '../../assets/product/oferta.png';
import gratis from '../../assets/product/gratis.png';
import cupon from '../../assets/product/cupon.png';
import vestido from '../../assets/product/vestido.png';
import auto from '../../assets/product/auto.png';
import mesas from '../../assets/product/mesas-con6sillas.png';
import { useEffect, useState } from 'react';

const Content = () => {
       
    const [slideIndex, setSlideIndex] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const banners = [banner1, banner2, banner3];
  

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




    
    return(
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
                <img src={oferta}alt="Image 1" />
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
        <img src={bannerpromocional}alt="Promotional-Banner" />
    </div>

    <div className="grid-item-products">
        <div className="grid-container-products">
            <a href={`/product/1`} className="button-link-products">
                <div className="grid-products">
                    <img src={mesas} alt="Image 1" />
                    <p className="product-label">PRODUCTO RENTABLE</p>
                    <p className="product-price">$65.500<span>por día</span></p>
                    <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                    <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                </div>
            </a>
            <a href={`/product/1`} className="button-link-products">
                <div className="grid-products">
                    <img src={mesas} alt="Image 1" />
                    <p className="product-label">PRODUCTO RENTABLE</p>
                    <p className="product-price">$65.500<span>por día</span></p>
                    <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                    <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                </div>
            </a>
            <a href={`/product/1`} className="button-link-products">
                <div className="grid-products">
                    <img src={mesas}  alt="Image 1" />
                    <p className="product-label">PRODUCTO RENTABLE</p>
                    <p className="product-price">$65.500<span>por día</span></p>
                    <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                    <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                </div>
            </a>
            <a href={`/product/1`} className="button-link-products">
                <div className="grid-products">
                    <img src={mesas}  alt="Image 1" />
                    <p className="product-label">PRODUCTO RENTABLE</p>
                    <p className="product-price">$65.500<span>por día</span></p>
                    <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                    <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                </div>
            </a>
            <a href={`/product/1`} className="button-link-products">
                <div className="grid-products">
                    <img src={mesas} alt="Image 1" />
                    <p className="product-label">PRODUCTO RENTABLE</p>
                    <p className="product-price">$65.500<span>por día</span></p>
                    <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                    <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                </div>
            </a>
        </div>
    </div> 
       
        </>
 );       
};

export default Content;
