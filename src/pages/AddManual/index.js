import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
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
  const [telefone, setTelefone] = useState("");

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
    })
      .then((response) => {
        setSif("");
        setFabricacao("");
        setQuantidade("");
        setSku("");
        setProduto("");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  const handleDataChange = (event) => {
    setFabricacao(event.target.value);
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const [dd, mm, yyyy] = dateString.split("/");
    const date = new Date(`${yyyy}-${mm}-${dd}`);
    return !isNaN(date.getTime());
  };

  const isDateValid = isValidDate(fabricacao);
  console.log(fabricacao.length);
  return (
    <div>
      <MenuSuperior voltar={() => Voltar()} />
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
        <InputMask
          mask="99/99/9999"
          value={fabricacao}
          onChange={handleDataChange}
        >
          {() => (
            <TextField
              label="Fabricação"
              fullWidth
              variant="outlined"
              error={!isDateValid} // Define o estado de erro do TextField com base na validação da data
              helperText={!isDateValid ? "Data inválida" : ""} // Define a mensagem de erro quando a data é inválida
            />
          )}
        </InputMask>
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
