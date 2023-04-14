import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../config/Api";
import { GlobalContext } from "../../context";
import MenuSuperior from "../../components/NavBar";
import AddAppBar from "../../components/AddAppBar";

export default function ListaConferenciaDevolucao() {
  const [dadosConferencia, setDadosConferencia] = useState([]);
  const { dadosSelecionado, setDadosSelecionado, numId } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/conferencia/retornoreentrega/${numId}`).then((response) => {
      setDadosConferencia(
        response.data.filter((filtrar) => filtrar.motivo === "Devolução")
      );
    });
  }, []);

  function selecionarItem(objdados) {
    console.log(objdados);
    setDadosSelecionado(objdados);
    navigate("/conferencia");
  }

  return (
    <div>
      <br></br>
      {dadosConferencia.map((item) => (
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
        </div>
      ))}
      <div onClick={() => navigate("/addmanual")}>
        <AddAppBar />
      </div>
    </div>
  );
}
