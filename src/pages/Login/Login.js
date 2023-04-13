import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { GlobalContext } from "../../context";
import Axios from "../../config/Api.js";

const LoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [estadoLogin, setEstadoLogin] = useState("");
  const { isLoggedIn, setIsLoggedIn, isUser, setIsUser } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/autenticar`, {
      usuario,
      senha: password,
    })
      .then((response) => {
        if (response.data.token) {
          setIsLoggedIn(true);
          setIsUser(response.data.iduser);
          sessionStorage.setItem("tkn", response.data.token);
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("id", response.data.iduser);
          navigate("/iniciodemanda");
        } else {
          setEstadoLogin("Senha ou Usuario incorreto.");
        }
      })
      .catch((erro) => {
        setEstadoLogin("Senha ou Usuario incorreto.");
      });
  };

  return (
    <div className="container">
      <h1 className="title">Logar</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          required
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <br></br>
      <br></br>
      <div style={{ fontWeight: "bold", color: "red", fontSize: "18px" }}>
        {estadoLogin === "Senha ou Usuario incorreto." ? (
          <div>"Senha ou Usuario incorreto."</div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginPage;
