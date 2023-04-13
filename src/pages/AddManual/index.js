import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import MenuSuperior from "../../components/NavBar";

export default function AddManual() {
  const [produto, setProduto] = useState("");
  const [sku, setSku] = useState("");
  const [sif, setSif] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const navigate = useNavigate();

  function Voltar() {
    navigate("/listaconferencia");
  }

  return (
    <div>
      <MenuSuperior voltar={() => Voltar()} />
      <div style={{ padding: "2%", margin: "0.2%" }}>
        <TextField
          type="number"
          fullWidth
          id="outlined-basic"
          label="Produto"
          variant="outlined"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
      </div>
      <div style={{ padding: "2%", margin: "0.2%" }}>
        <TextField
          type="number"
          fullWidth
          id="outlined-basic"
          label="SIF"
          variant="outlined"
          value={sif}
          onChange={(e) => setSif(e.target.value)}
        />
      </div>
      <div style={{ padding: "2%", margin: "0.2%" }}>
        <TextField
          type="date"
          fullWidth
          id="outlined-basic"
          label="Data Fabricação"
          variant="outlined"
          value={fabricacao}
          onChange={(e) => setFabricacao(e.target.value)}
        />
      </div>
      <div style={{ padding: "2%", margin: "0.2%" }}>
        <TextField
          type="number"
          fullWidth
          id="outlined-basic"
          label="Quantidade"
          variant="outlined"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
      </div>
      <br></br>
      <br></br>
      <div style={{ padding: "10%" }}>
        <Button variant="contained" size="small">
          INSERIR
        </Button>
      </div>
    </div>
  );
}
