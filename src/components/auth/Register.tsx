import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importa el método de registro
import {auth} from '../../firebase/firebase' // Importa la configuración de Firebase
import "./Register.css";
import { Toaster, toast } from "sonner";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            // Registro del usuario en Firebase Authentication
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success("Registro exitoso");
            setTimeout(() => {
                navigate("/login");
            }, 400); // Redirige al login después del registro
        } catch (error: any) {
            console.error("Error al registrar el usuario:", error);
            toast.error("Error al registrar el usuario");
        }
    };

    return (
        <>
            <Toaster />
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
                        </div>
                        <button type="submit" className="register-button-new">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
