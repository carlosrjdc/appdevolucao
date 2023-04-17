import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../config/Api";
import { GlobalContext } from "../../context";
import MenuSuperior from "../../components/NavBar";
import AddAppBar from "../../components/AddAppBar";

export default function ListaConferenciaDevolucao() {
  const {
    dadosSelecionado,
    setDadosSelecionado,
    numId,
    dadosConferencia,
    setDadosConferencia,
    idSelecionado,
    setIdSelecionado,
    setIdTabela,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  function selecionarItem(objdados) {
    console.log(objdados);
    setDadosSelecionado(objdados);
    setIdTabela("devolucao");
    navigate("/conferencia");
  }

  const devolucao = dadosConferencia.filter(
    (filtrar) => filtrar.motivo !== "Reentrega"
  );

  return (
    <div>
      <br></br>
      {devolucao?.map((item) => (
        <div
          style={{
            fontWeight: "bold",
            padding: "4%",
            margin: "1%",
            background: "#ccecf4",
            borderRadius: "4px",
          }}
          key={item.id}
          onClick={() => {
            selecionarItem(item);
          }}
        >
          <div>Item: {item.produto}</div>
          <div>{item.descricao}</div>
        </div>
      ))}
      <div onClick={() => navigate("/addmanual")}>
        <AddAppBar />
      </div>
    </div>
  );
}
