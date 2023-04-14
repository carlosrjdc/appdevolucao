import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputMask from "react-input-mask";
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
  const [qtdAvaria, setQtdAvaria] = useState(0);
  const [selecionado, setSelecionado] = useState(false);

  const navigate = useNavigate();

  function Voltar() {
    navigate("/listaconferencia");
  }

  async function buscarProduto() {
    Axios.get(`/buscarmaterial/${produto}`)
      .then((response) => {
        if (response.data) {
          setSku(response.data.id);
          setDescricao(response.data.descricao);
        } else {
          setDescricao("Não localizado");
        }
      })
      .catch((erro) => {
        setDescricao("Não localizado");
      });
  }

  async function cadastrarProduto() {
    Axios.post(`/conferencia/addproduto/${numId}`, {
      produto: sku,
      quantidade: quantidade,
      sif: sif,
      lote: fabricacao,
      quantidadeAvaria: qtdAvaria,
    })
      .then((response) => {
        setSif("");
        setFabricacao("");
        setQuantidade("");
        setSku("");
        setProduto("");
        setQtdAvaria(0);
        setSelecionado(false);
        navigate("/listaconferencia");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  console.log(qtdAvaria);

  return (
    <div>
      <MenuSuperior botao1={"Voltar"} voltar={() => Voltar()} />
      <br></br>

      <div
        style={{
          padding: "2%",
          textAlign: "center",
          marginBottom: "4%",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {descricao}
      </div>
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
        <br></br>
        <br></br>
        <FormControlLabel
          label="Avaria?"
          control={
            <Checkbox
              label={"teste"}
              onChange={(e) => {
                setSelecionado(e.target.checked);
                if (!e.target.checked) {
                  setQtdAvaria(0);
                }
              }}
            />
          }
        />
        {selecionado ? (
          <TextField
            type="number"
            fullWidth
            id="outlined-basic"
            label="Qtd avariada"
            variant="outlined"
            value={qtdAvaria}
            onChange={(e) => setQtdAvaria(e.target.value)}
          />
        ) : null}
      </div>

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
