import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../config/Api";
import { GlobalContext } from "../../context";
import MenuSuperior from "../../components/NavBar";
import AddAppBar from "../../components/AddAppBar";

export default function ListaConferenciaReentrega() {
  const {
    dadosSelecionado,
    setDadosSelecionado,
    numId,
    dadosConferencia,
    setDadosConferencia,
    setIdTabela,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const reentrega = dadosConferencia.filter(
    (filtrar) => filtrar.motivo === "Reentrega"
  );
  function selecionarItem(objdados) {
    console.log(objdados);
    setDadosSelecionado(objdados);
    setIdTabela("reentrega");
    navigate("/conferencia");
  }

  return (
    <div>
      {reentrega?.map((item) => (
        <div
          style={{
            fontWeight: "bold",
            padding: "4%",
            margin: "1%",
            background: "#ccecf4",
            borderRadius: "4px",
          }}
          key={item.produto}
          onClick={() => {
            selecionarItem(item);
          }}
        >
          <div>Item: {item.produto}</div>
          <div>{item.descricao}</div>
          <div>Quantidade: {item.quantidade}</div>
        </div>
      ))}
      <div onClick={() => navigate("/addmanual")}>
        <AddAppBar />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
