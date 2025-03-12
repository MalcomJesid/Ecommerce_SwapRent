import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import "./Login.css";
import logo from '../../assets/entity/logosinfondo.png';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (email === "prueba@swaprent.com" && password === "1234") {
        navigate("/"); 
      } else {
        alert("Correo o contraseña incorrectos");
      }
    };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <Mail className="icon" />
            <input
              type="email"
              placeholder="     Correo electrónico"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="icon" />
            <input
              type="password"
              placeholder="     Contraseña"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
        <div className="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
}
