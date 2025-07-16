import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const UseContext = () => useContext(Context);
