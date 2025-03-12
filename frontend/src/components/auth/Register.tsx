import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        alert("Registro exitoso");
        navigate("/login"); // Redirige al login después del registro
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="fas fa-user icon"></i>
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="   Nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-user icon"></i>
                        <input 
                            type="text" 
                            name="apellido" 
                            placeholder="   Apellido" 
                            value={formData.apellido} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-envelope icon"></i>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="   Correo electrónico" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock icon"></i>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="   Contraseña" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock icon"></i>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="   Confirmar contraseña" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="register-button-new">Registrarse</button>
                </form>
                 
                <div className="social-login">
                        <button className="google-button">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" className="google-icon" />
                            Continuar con Google
                        </button>
                </div>
                <p>¿Ya tienes cuenta? <span onClick={() => navigate("/login")} className="login-link">Inicia sesión</span></p>
            </div>
        </div>
    );
}
