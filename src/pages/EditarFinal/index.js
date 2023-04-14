import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export default function EditarFinal() {
  const { itemEditar } = useContext(GlobalContext);

  const [sif, setSif] = useState(itemEditar.sif);
  const [fabricacao, setFabricacao] = useState(itemEditar.lote);
  const [quantidade, setQuantidade] = useState(itemEditar.quantidade);
  const [confirmaracao, setConfirmaAcao] = useState("");

  const navigate = useNavigate();
  async function atualizarBancoDeDados() {
    if (confirmaracao === "editar") {
      Axios.put(`/editarconferencia/${itemEditar.id}`, {
        sif,
        fabricacao,
        quantidade,
      })
        .then((response) => console.log(response.data))
        .catch((erro) => console.log(erro));
    } else if (confirmaracao === "excluir") {
      Axios.delete(`/excluirconferencia/${itemEditar.id}`)
        .then((response) => console.log(response.data))
        .catch((erro) => console.log(erro));
    }
  }

  return (
    <div>
      <MenuSuperior
        botao1={"Voltar"}
        voltar={() => {
          navigate("/listaconferencia");
        }}
      />

      <div style={{ textAlign: "center", fontSize: "18PX", padding: "2%" }}>
        <div>ID: {itemEditar.id}</div>
        <div>SKU: {itemEditar.produto}</div>
        <div>DESCRIÇÃO: {itemEditar.materiais?.descricao}</div>
        <div style={{ margin: "3%" }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="SIF"
            variant="outlined"
            value={sif}
            onChange={(e) => setSif(e.target.value)}
          />
        </div>
        <div style={{ margin: "3%" }}>
          <TextField
            type="date"
            fullWidth
            id="outlined-basic"
            label="Fabricação"
            variant="outlined"
            value={fabricacao}
            onChange={(e) => setFabricacao(e.target.value)}
          />
        </div>
        <div style={{ margin: "3%" }}>
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
        <div>
          <br></br>
          <div
            style={{
              padding: "2%",
              marginTop: "2%",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <BiEditAlt
              onClick={() => {
                if (confirmaracao !== "editar") {
                  setConfirmaAcao("editar");
                } else {
                  setConfirmaAcao("");
                }
              }}
              size={35}
            />
            <BsTrash
              onClick={() => {
                if (confirmaracao !== "excluir") {
                  setConfirmaAcao("excluir");
                } else {
                  setConfirmaAcao("");
                }
              }}
              color="red"
              size={35}
            />
          </div>
          <div>
            <br></br>
            {confirmaracao !== "" ? (
              <div style={{ padding: "10%" }}>
                <Button
                  onClick={atualizarBancoDeDados}
                  variant="contained"
                  size="small"
                >
                  {`Confirmar Ação ${confirmaracao}`}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
