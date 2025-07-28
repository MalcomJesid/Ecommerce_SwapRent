import { Link } from "react-router-dom";
import logo from "../../assets/entity/logo.png";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <div className="top-bar">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="SwapRentLogo" />
            </Link>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos, servicios de intercambio y más..."
            />
            <button type="button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="right-icons">
            <button className="button-header">Artículos más rentados</button>
          </div>
        </div>

        <nav className="bottom-bar">
          <ul>
            <li>
              <Link to="category">Categorías</Link>
            </li>
            <li>
              <Link to="offer">Ofertas</Link>
            </li>
            <li>
              <Link to="rent">Rentar</Link>
            </li>
            <li>
              <Link to="exchange">Intercambiar</Link>
            </li>
          </ul>
          <div className="user-menu">
            <Link to="profile">Mi Cuenta</Link>
            <Link to="login">inicio sesión</Link>
            <Link to="#">Favoritos</Link>
            <Link to="#">
              <i className="fa-solid fa-bell"></i>
            </Link>
            <Link to="history">
              <i className="fa-solid fa-comments"></i>
            </Link>
          </div>
          
        </nav>
      </div>
    </>
  );
};
export default Navbar;
