import banner1 from '../assets/banners/Banner1.png';
import banner2 from '../assets/banners/Banner2.png';
import banner3 from '../assets/banners/Banner3.png';
import bannerpromocional from '../assets/banners/bannerpromocional.png';
import oferta from '../assets/product/oferta.png';
import gratis from '../assets/product/gratis.png';
import cupon from '../assets/product/cupon.png';
import vestido from '../assets/product/vestido.png';
import auto from '../assets/product/auto.png';
import mesas from '../assets/product/mesas-con6sillas.png';

const Content = () => {
    const plusSlides = (n: number) => {
        console.log(`Cambiando diapositiva: ${n}`);
    };

    return (
        <>
            <div className="slider">
                <div className="slides">
                    <div className="slide fade">
                        <img src={banner1} alt="Slide 1" />
                    </div>
                    <div className="slide fade">
                        <img src={banner2} alt="Slide 2" />
                    </div>
                    <div className="slide fade">
                        <img src={banner3} alt="Slide 3" />
                    </div>
                </div>
                <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
                <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
            </div>

            <div className="grid-section">
                <div className="grid-container">
                    <div className="grid-item">
                        <img src={oferta} alt="Image 1" />
                        <button>OFERTA</button>
                    </div>
                    <div className="grid-item">
                        <img src={gratis}alt="Image 2" />
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
                <img src={bannerpromocional} alt="Promotional Banner" />
            </div>

            <div className="grid-item-products">
                <div className="grid-container-products">
                    {[...Array(5)].map((_, index) => (
                        <a href="#" className="button-link-products" key={index}>
                            <div className="grid-products">
                                <img src={mesas} alt="Image 1" />
                                <p className="product-label">PRODUCTO RENTABLE</p>
                                <p className="product-price">$65.500<span>por día</span></p>
                                <p className="product-name">Mesa de lujo + 6 sillas para reuniones especiales</p>
                                <p className="free-shipping"><i className="fa-solid fa-truck-fast"></i> Envío gratis</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Content;
