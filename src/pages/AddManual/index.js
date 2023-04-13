import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import MenuSuperior from "../../components/NavBar";
import Axios from "../../config/Api";
import { GlobalContext } from "../../context";

export default function AddManual() {
  const { numId } = useContext(GlobalContext);
  const [produto, setProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sku, setSku] = useState("");
  const [sif, setSif] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const navigate = useNavigate();

  function Voltar() {
    navigate("/listaconferencia");
  }

  async function buscarProduto() {
    Axios.get(`/buscarmaterial/${produto}`).then((response) => {
      setSku(response.data.id);
      setDescricao(response.data.descricao);
    });
  }

  async function cadastrarProduto() {
    Axios.post(`/conferencia/addproduto/${numId}`, {
      produto: sku,
      quantidade: quantidade,
      sif: sif,
      lote: fabricacao,
    })
      .then((response) => {
        setSif("");
        setFabricacao("");
        setQuantidade("");
        setSku("");
        setProduto("");
      })
      .catch((erro) => {
        setSku("");
        setProduto("");
        setDescricao("Não localizado!");
      });
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
          onBlur={() => {
            buscarProduto();
          }}
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
        <Button
          disabled={sku === ""}
          onClick={cadastrarProduto}
          variant="contained"
          size="small"
        >
          INSERIR
        </Button>
      </div>
    </div>
  );
}
