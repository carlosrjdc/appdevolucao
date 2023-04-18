import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export default function FinalizarConferencia() {
  const { infoDemanda, numId, idFiltrarSku, setIdFiltrarSku } =
    useContext(GlobalContext);
  const [dadosresultado, setDadosResultado] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`conferencia/resultadoconferencia/${numId}`)
      .then((response) => {
        setDadosResultado(
          response.data.filter((filtrar) => filtrar.diferenca !== 0)
        );
      })
      .catch((erro) => console.log(erro));
  }, []);

  function filtrarConferenciaPorItem(id) {
    setIdFiltrarSku(id);
    navigate("/editarconferenciafiltrado");
  }

  return (
    <div>
      <MenuSuperior
        botao1={"Voltar"}
        botao2={"Finalizar"}
        voltar={() => {
          navigate("/listaconferencia");
        }}
        finalizar={() => {
          navigate("/fecharconferencia");
        }}
      />
      <div
        style={{
          padding: "0.5%",
          marginTop: "0.1%",
          textAlign: "center",
        }}
      ></div>
      {dadosresultado.map((item) => (
        <div
          style={{
            padding: "1.5%",
            margin: "1%",
            background: "#ccecf4",
            fontWeight: "bold",
          }}
          key={item.produto}
          onClick={() => {
            filtrarConferenciaPorItem(item.produto);
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{item.produto} </div>
          </div>
          <div>{item.descricao} </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1%",
            }}
          >
            <div>FISICO: {item.fisico} </div>
          </div>
        </div>
      ))}
    </div>
  );
}
