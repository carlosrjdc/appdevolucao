import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export default function FinalizarConferencia() {
  const { infoDemanda, numId } = useContext(GlobalContext);
  const [dadosresultado, setDadosResultado] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`conferencia/resultadoconferencia/${numId}`)
      .then((response) => {
        setDadosResultado(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  return (
    <div>
      <MenuSuperior />
      <div
        style={{
          padding: "2%",
          marginTop: "2%",
          textAlign: "center",
        }}
      >
        <BiEditAlt onClick={() => navigate("/editarConferencia")} size={35} />
      </div>
      {dadosresultado.map((item) => (
        <div
          style={{
            padding: "1.5%",
            margin: "1%",
            background: "#ccecf4",
            fontWeight: "bold",
          }}
          key={item.produto}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{item.produto} </div>
            <div>
              {item.diferenca > 0 ? (
                <div
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Sobra: {item.diferenca}
                </div>
              ) : (
                <div
                  style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}
                >
                  Falta: {item.diferenca}
                </div>
              )}
            </div>
          </div>
          <div>{item.descricao} </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1%",
            }}
          >
            <div>CONTABIL: {item.contabil} </div>
            <div>FISICO: {item.fisico} </div>
          </div>
        </div>
      ))}
    </div>
  );
}
