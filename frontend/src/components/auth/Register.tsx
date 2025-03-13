import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Toaster, toast } from 'sonner';

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
            toast.error("Las contraseñas no coinciden");
            return;
        }

        
        toast.success("Registro exitoso");

            setTimeout(() => {
            navigate("/login");
            }, 400); // Redirige al login después del registro
    };

    return (<> <Toaster />
        <div className="register-container">
            <div className="register-box">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="Nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                        <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" className="size-6">
                                <path 
                                stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="apellido" 
                            placeholder="Apellido" 
                            value={formData.apellido} 
                            onChange={handleChange} 
                            required 
                        />
                         <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" className="size-6">
                                <path 
                                stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div className="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Correo electrónico" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" stroke="currentColor" 
                                className="size-6">
                                <path 
                                stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Contraseña" 
                            value={formData.password} 
                            onChange={handleChange} 
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
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="Confirmar contraseña" 
                            value={formData.confirmPassword} 
                            onChange={handleChange} 
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
        </>
        
    );
}
