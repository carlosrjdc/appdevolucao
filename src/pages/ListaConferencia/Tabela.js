import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import ListaConferenciaReentrega from "./Reentrega";
import ListaConferenciaDevolucao from "./Devolucao";
import MenuSuperior from "../../components/NavBar";
import { EditarConferenciaFisicaLista } from "../ListaEditar";
import { useContext } from "react";
import { GlobalContext } from "../../context";

function UncontrolledExample() {
  const { idTabela, setIdTabela } = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ marginBottom: "1.5%" }}>
        <MenuSuperior
          botao1={"Voltar"}
          botao2={"Ver Divergencia"}
          voltar={() => navigate("/iniciodemanda")}
          finalizar={() => {
            navigate("/finalizarconferencia");
          }}
        />
      </div>

      <Tabs
        defaultActiveKey={idTabela}
        id="uncontrolled-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="reentrega" title="Reentrega">
          <ListaConferenciaReentrega />
        </Tab>
        <Tab eventKey="devolucao" title="Devolução">
          <ListaConferenciaDevolucao />
        </Tab>
        <Tab eventKey="conferencia" title="Conferencia">
          <EditarConferenciaFisicaLista />
        </Tab>
      </Tabs>
    </div>
  );
}

export default UncontrolledExample;
