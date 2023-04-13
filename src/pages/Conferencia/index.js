import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export default function Conferencia() {
  const { dadosSelecionado, setDadosSelecionado, infoDemanda, numId } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const [material, setMaterial] = useState("");
  const [sif, setSif] = useState("");
  const [fabricacao, setFabricacao] = useState("");
  const [qtd, setQtd] = useState("");
  const [validado, setValidado] = useState(true);

  async function cadastrarProduto() {
    Axios.post(`/conferencia/addproduto/${numId}`, {
      produto: dadosSelecionado.produto,
      quantidade: qtd,
      sif: sif,
      lote: fabricacao,
    })
      .then((response) => {
        setSif("");
        setFabricacao("");
        setQtd("");
        setValidado(true);
      })
      .catch((erro) => console.log(erro));
  }

  async function verificarsku() {
    Axios.get(`/buscarmaterial/${material}`).then((response) => {
      if (response.data?.id === parseInt(dadosSelecionado.produto)) {
        setValidado(false);
      } else {
        setValidado(true);
      }
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <MenuSuperior
        voltar={() => {
          navigate("/listaconferencia");
        }}
        finalizar={() => {
          navigate("/finalizarconferencia");
        }}
      />
      <br></br>
      <div
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}
      >
        <div>
          SKU:<br></br> {dadosSelecionado.produto}
        </div>
        <div>
          DESCRIÇÃO:<br></br> {dadosSelecionado.descricao}
        </div>
      </div>
      <div style={{ marginTop: "10%", padding: "2%" }}>
        <div style={{ marginTop: "0.5%", padding: "2%" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Material"
            variant="outlined"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            onBlur={verificarsku}
          />
        </div>
        <div style={{ marginTop: "0.5%", padding: "2%" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="SIF"
            variant="outlined"
            value={sif}
            onChange={(e) => setSif(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "0.5%", padding: "2%" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Fabricação"
            variant="outlined"
            value={fabricacao}
            onChange={(e) => setFabricacao(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "0.5%", padding: "2%" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Quantidade"
            variant="outlined"
            value={qtd}
            onChange={(e) => setQtd(e.target.value)}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <Button
            disabled={validado}
            onClick={cadastrarProduto}
            variant="contained"
            size="small"
          >
            INSERIR
          </Button>
        </div>
      </div>
    </div>
  );
}
