import logo from '../assets/entity/logo.png';

const Navbar =() => {

    return (
    <>
<div className="container">

<div className="top-bar">

    <div className="logo">
        <img src={logo} alt="SwapRentLogo"/>
    </div>

    <div className="search-bar">
        <input type="text" placeholder="Buscar productos, servicios de intercambio y más..."/>
        <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
    </div>

    <div className="right-icons">
        <button className="button-header">Artículos más rentados</button>
    </div>

</div>

<nav className="bottom-bar">
    <ul>
        <li><a href="category">Categorías</a></li>
        <li><a href="offer">Ofertas</a></li>
        <li><a href="history">Historial</a></li>
        <li><a href="rent">Rentar</a></li>
        <li><a href="exchange">Intercambiar</a></li>
    </ul>
    <div className="user-menu">
        <a href="#">Cuenta</a>
        <a href="#">Favoritos</a>
        <a href="#"><i className="fa-solid fa-bell"></i></a>
        <a href="#"><i className="fa-solid fa-comments"></i></a>
    </div>
</nav>
</div>
    </>)
} 
export default Navbar;