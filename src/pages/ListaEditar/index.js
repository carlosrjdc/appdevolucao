import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export function EditarConferenciaFisicaLista() {
  const { numId, itemEditar, setItemEditar, setIdTabela } =
    useContext(GlobalContext);
  const [listagemItens, setListagemItens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`conferencia/buscarlistadetodositensfisicos/${numId}`)
      .then((response) => {
        setListagemItens(response.data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  function abrirEditarFinal(item) {
    setItemEditar(item);
    setIdTabela("conferencia");
    navigate("/editarfinal");
  }

  return (
    <div>
      <br></br>
      {listagemItens.map((item) => (
        <div
          style={{
            padding: "3%",
            margin: "0.5%",
            background: "#ccecf4",
            fontWeight: "bold",
            fontSize: "15px",
          }}
          key={item.id}
          onClick={() => {
            abrirEditarFinal(item);
          }}
        >
          <div>{item?.materiais?.descricao}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
            <div>SKU: {item.produto}</div>
            <div>QTD: {item.quantidade}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
            <div>SIF: {item.sif}</div>
            <div>FABRICAÇÃO: {item.lote}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
