import React, { useState } from "react";
import styled from "styled-components";
import { toast } from 'sonner';

interface ForgotPasswordProps {
  close: () => void;
}

export default function ForgotPassword({ close }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      toast.error("Por favor ingresa un correo válido.");
      return;
    }

    setError("");
    toast.success(`Se ha enviado un enlace de recuperación a: ${email}`);

    // Pequeño delay para permitir que el toast se muestre antes de cerrar el modal
    setTimeout(() => {
      close();
    }, 1000);
  };

  return (
    <Backdrop onClick={close}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Recuperar contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Enviar</Button>
        </form>
        <CloseButton onClick={close}>×</CloseButton>
      </ModalContainer>
    </Backdrop>
  );
}

// Estilos con Styled Components
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  background: rgba(0, 121, 107, 0.6);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: scaleIn 0.2s ease-in-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #00796b;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  background: #00796b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #005f56;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #fff;
  transition: 0.2s;

  &:hover {
    color: #ffdddd;
    transform: scale(1.2);
  }
`;
