import React from "react";
import styled from "styled-components";

// 📌 INTERFACE - Define las propiedades del modal
interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

// 📌 COMPONENTE PRINCIPAL
const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onClose, onConfirm }) => {
  return (
    <Backdrop>
      <ModalContainer>
        <Title>¿Estás seguro?</Title>
        <Message>Esta acción no se puede deshacer.</Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <Button onClick={onConfirm}>Eliminar</Button>
        </ButtonContainer>
      </ModalContainer>
    </Backdrop>
  );
};

export default ConfirmDeleteModal;

// 📌 ESTILOS
const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: rgba(0, 121, 107, 0.9); /* Verde translúcido */
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Title = styled.h2`
  color: white;
  font-size: 18px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  background: white;
  color: #00796b;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background: #004d40;
    color: white;
  }
`;

const CancelButton = styled(Button)`
  background: #d32f2f;
  color: white;

  &:hover {
    background: #b71c1c;
  }
`;