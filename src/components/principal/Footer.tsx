import logo from '../../assets/entity/Sin Fondo Oscuro.png'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-contact">
            <p>📞 Llamar: 311 799 0940</p>
            <p>📧 malcom.riascos@swaprent.com</p>
          </div>
  
          <div className="footer-logo">
            <img src={logo} alt="SwapRent Logo" className="footer-logo-img" />
            <h2>SwapRent</h2>
          </div>
  
          <div className="footer-social">
            <p>SÍGUENOS EN REDES SOCIALES</p>
            <div className="footer-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
  
        <div className="footer-bottom">
          <p>© 2024 SwapRent | Términos y Condiciones | Política de Privacidad</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  