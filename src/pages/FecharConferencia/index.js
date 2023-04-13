import { useContext } from "react";
import Button from "@mui/material/Button";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";
import Notificar from "../../components/Notificar";

export default function FecharSeparacao() {
  const { numId, setNumId } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function FinalizarProcessoConferencia() {
    Axios.put(`/app/finalizardemanda/${numId}`).then((response) => {
      Notificar(
        "Sucesso",
        "Registro Realizado com sucesso",
        "success",
        "bottom"
      );
      setNumId("");
      navigate("/iniciodemanda");
    });
  }

  return (
    <div>
      <MenuSuperior
        botao1={"Voltar"}
        voltar={() => {
          navigate("/finalizarconferencia");
        }}
      />
      <div style={{ padding: "5%" }}>
        <div style={{ fontWeight: "bold", textAlign: "center", color: "red" }}>
          Atenção ao Finalizar a conferencia, você não pode mais fazer qualquer
          modificação, deseja realmente finalizar?{" "}
        </div>
        <div style={{ padding: "10%" }}>
          <Button
            onClick={FinalizarProcessoConferencia}
            variant="contained"
            size="small"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
