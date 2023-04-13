import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { GlobalContext } from "../../context";
import Axios from "../../config/Api.js";

const LoginPage = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
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
          console.log("Senha ou Usuario incorreto.");
        }
      })
      .catch((erro) => {
        console.log(erro);
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
    </div>
  );
};

export default LoginPage;
