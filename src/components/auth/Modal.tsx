import React from "react";
import { JSX } from "react/jsx-runtime";
import styled, { keyframes } from "styled-components";


interface ModalProps {
  close: () => void;
  content: React.ReactNode;
}

export default function Modal({ close, content }: ModalProps): JSX.Element {
  return (
    <ModalBackArea onClick={close}>
      <ModalArea onClick={(e) => e.stopPropagation()}>
        <BtnClose onClick={close}>×</BtnClose>
        <ContentWrapper>{content}</ContentWrapper>
      </ModalArea>
    </ModalBackArea>
  );
}

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

// Fondo del modal con efecto de difuminado
const ModalBackArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px); /* Difuminado */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;


// Caja del modal con efecto vidrioso
const ModalArea = styled.div`
  width: 90%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-out;
`;

// Contenido del modal
const ContentWrapper = styled.div`
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 10px 0;
`;

// Botón de cerrar
const BtnClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
  border-radius: 50%;
  padding: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    color: black;
  }
`;
