import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function InfoProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o usuário está logado
  const [isUser, setIsUser] = useState(""); // Estado para verificar se o usuário está logado
  const [dadosSelecionado, setDadosSelecionado] = useState({}); // Estado para verificar se o usuário está logado
  const [infoDemanda, setInfoDemanda] = useState([]);
  const [itemEditar, setItemEditar] = useState({});
  const [numId, setNumId] = useState("");
  const [dadosConferencia, setDadosConferencia] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState("");
  const [idFiltrarSku, setIdFiltrarSku] = useState("");
  const [idTabela, setIdTabela] = useState("reentrega");

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
        dadosConferencia,
        setDadosConferencia,
        idSelecionado,
        setIdSelecionado,
        idTabela,
        setIdTabela,
        idFiltrarSku,
        setIdFiltrarSku,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
