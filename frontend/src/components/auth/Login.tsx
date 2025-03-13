import { useState } from "react";
import "./Login.css";
import logo from '../../assets/entity/logosinfondo.png';
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    //const modalHook = useModal();


    const [isOpen,setIsOpen] = useState(false)
    //const handleModal = () => {setIsOpen(!isOpen)}

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (email === "prueba@swaprent.com" && password === "1234") {
        navigate("/"); 
      } else {
        alert("Correo o contraseña incorrectos");
      }
      
    };

    

    
  return (<>

    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" stroke="currentColor" 
                className="size-6">
                  <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>

          </div>
          <div className="input-group">
        
            <input
              type="password"
              placeholder="Contraseña"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" stroke="currentColor" 
                className="size-6">
                <path 
                stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>

          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <button type="button"  className="register-button-login" onClick={() => navigate("/Register")}>Registrarse</button>
          </div>
          <button type="submit" className="login-button">INGRESAR</button>
        </form>
        <div className="social-login">
            <button className="google-button">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" className="google-icon" />
                Iniciar sesión con Google
            </button>
        </div>

             <div className="Olcontraseña">
          <button onClick={() => setIsOpen(true)}>¿Olvidaste tu contraseña?</button>
            </div>

        {/* Modal de recuperación de contraseña */}
        {isOpen && <ForgotPassword close={() => setIsOpen(false)} />}      
            </div>

    </div>
</>  

);
}
