import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../config/Api";
import { GlobalContext } from "../../context";
import MenuSuperior from "../../components/NavBar";
import AddAppBar from "../../components/AddAppBar";

export default function ListaConferencia() {
  const [dadosConferencia, setDadosConferencia] = useState([]);
  const { dadosSelecionado, setDadosSelecionado, numId } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/conferencia/resultadoconferencia/${numId}`).then((response) => {
      setDadosConferencia(response.data);
    });
  }, []);

  function selecionarItem(objdados) {
    console.log(objdados);
    setDadosSelecionado(objdados);
    navigate("/conferencia");
  }

  function Voltar() {
    navigate("/iniciodemanda");
  }

  return (
    <div>
      <MenuSuperior voltar={() => Voltar()} />
      <br></br>
      {dadosConferencia.map((item) => (
        <div
          style={{
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
          <div>Descrição: {item?.materiais?.descricao}</div>
          <div>Quantidade Conferida: {item.fisico}</div>
        </div>
      ))}
      <div>
        <AddAppBar />
      </div>
    </div>
  );
}
