import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function InfoProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado
  const [isUser, setIsUser] = useState(""); // Estado para verificar se o usuário está logado
  const [dadosSelecionado, setDadosSelecionado] = useState({}); // Estado para verificar se o usuário está logado
  const [infoDemanda, setInfoDemanda] = useState([]);
  const [itemEditar, setItemEditar] = useState({});
  const [numId, setNumId] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isUser,
        setIsUser,
        dadosSelecionado,
        setDadosSelecionado,
        infoDemanda,
        setInfoDemanda,
        numId,
        setNumId,
        itemEditar,
        setItemEditar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
