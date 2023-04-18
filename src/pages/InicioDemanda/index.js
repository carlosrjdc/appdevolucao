import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context";
import Axios from "../../config/Api";
import MenuSuperior from "../../components/NavBar";

export default function InicioDemanda() {
  const {
    infoDemanda,
    setInfoDemanda,
    numId,
    setNumId,
    dadosConferencia,
    setDadosConferencia,
  } = useContext(GlobalContext);

  const [doca, setDoca] = useState("");
  const [demandasEmAberto, setDemandasEmAberto] = useState([]);
  const isLoggedIn = sessionStorage.getItem("login");
  const identificador = sessionStorage.getItem("id");
  const navigate = useNavigate();

  async function dadosDemanda() {
    await Axios.get(`/app/buscardemanda/${numId}`)
      .then((response) => {
        setInfoDemanda(response.data);
        console.log(response.data);
      })
      .catch((erro) => {
        setInfoDemanda(null);
      });
  }

  async function iniciarDemanda(iddemanda) {
    if (iddemanda !== null) {
      await Axios.put(`/app/inicioconferencia/${numId}`, {
        doca: doca,
        idconferente: identificador,
      })
        .then(async (response) => {
          await Axios.get(`/conferencia/retornoreentrega/${numId}`).then(
            (response) => {
              setDadosConferencia(response.data);
              navigate("/listaconferencia");
            }
          );
        })
        .catch((erro) => {
          setInfoDemanda(null);
        });
    } else {
      await Axios.put(`/app/inicioconferencia/${iddemanda}`, {
        doca: doca,
        idconferente: identificador,
      })
        .then(async (response) => {
          await Axios.get(`/conferencia/retornoreentrega/${numId}`).then(
            (response) => {
              setDadosConferencia(response.data);
              navigate("/listaconferencia");
            }
          );
        })
        .catch((erro) => {
          setInfoDemanda(null);
        });
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      Axios.get(`/app/verificardemandaemaberto/${identificador}`).then(
        (response) => {
          setInfoDemanda(null);
          setDemandasEmAberto(response.data);
        }
      );
    }
  }, []);

  async function deslogar() {
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div>
      <MenuSuperior botao2={"Sair"} finalizar={() => deslogar()} />
      <div
        style={{
          margin: "2%",
          padding: "1%",
          textAlign: "center",
          width: "88%",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <div style={{ margin: "2%", padding: "4%" }}>INFORME O ID:</div>
        <TextField
          fullWidth
          type="number"
          id="outlined-basic"
          label="ID"
          variant="outlined"
          onChange={(e) => setNumId(e.target.value)}
        />
        <div style={{ margin: "5%" }}>
          <Button
            disabled={demandasEmAberto.length > 0}
            onClick={dadosDemanda}
            variant="contained"
            size="small"
          >
            Buscar
          </Button>
        </div>
        <br></br>
        <div>
          {infoDemanda ? (
            <div>
              <div>Demanda: {infoDemanda.id}</div>
              <div>Placa: {infoDemanda.placa}</div>
              <div>Transportadora: {infoDemanda.transportadora}</div>
              <div>Status: {infoDemanda.status}</div>
              <div>Transporte: {infoDemanda.transporte}</div>
              <br></br>
              <br></br>
              <TextField
                fullWidth
                type="number"
                id="outlined-basic"
                label="DOCA"
                variant="outlined"
                onChange={(e) => setDoca(e.target.value)}
              />
              <br></br>
              <br></br>
              <Button
                disabled={
                  doca === "" ||
                  doca === null ||
                  infoDemanda?.status !== "A Conferir"
                }
                onClick={iniciarDemanda}
                variant="contained"
                size="small"
              >
                Iniciar
              </Button>
            </div>
          ) : null}
        </div>
        <div>
          {demandasEmAberto ? (
            <div>
              {demandasEmAberto.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4%",
                    borderRadius: "4px",
                    margin: "1%",
                    background: "#61dafb",
                    fontSize: "16px",
                  }}
                  key={item.id}
                  onClick={async () => {
                    await Axios.get(
                      `/conferencia/retornoreentrega/${item.id}`
                    ).then((response) => {
                      setDadosConferencia(response.data);
                    });
                    setNumId(item.id);
                    navigate("/listaconferencia");
                  }}
                >
                  <div>
                    <div>{item.id}</div>
                    <div>{item.placa}</div>
                  </div>
                  <div>
                    <div>{item.id_viagem}</div>
                    <div>{item.transporte}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
