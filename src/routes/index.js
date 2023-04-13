import { createBrowserRouter, Link } from "react-router-dom";
import Autenticar from "../pages/Login/Login.js";
import InicioDemanda from "../pages/InicioDemanda/index.js";
import ListaConferencia from "../pages/ListaConferencia/index.js";
import Conferencia from "../pages/Conferencia/index.js";
import FinalizarConferencia from "../pages/Finalizar/index.js";
import {
  EditarConferenciaFisica,
  EditarConferenciaFisicaLista,
} from "../pages/ListaEditar/index.js";
import EditarFinal from "../pages/EditarFinal/index.js";
import AddManual from "../pages/AddManual/index.js";
import FecharSeparacao from "../pages/FecharConferencia/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Autenticar />,
  },
  {
    path: "/iniciodemanda",
    element: <InicioDemanda />,
  },
  {
    path: "/listaconferencia",
    element: <ListaConferencia />,
  },
  {
    path: "/conferencia",
    element: <Conferencia />,
  },
  {
    path: "/finalizarconferencia",
    element: <FinalizarConferencia />,
  },
  {
    path: "/editarConferencia",
    element: <EditarConferenciaFisicaLista />,
  },
  {
    path: "/editarfinal",
    element: <EditarFinal />,
  },
  {
    path: "/addmanual",
    element: <AddManual />,
  },
  {
    path: "/fecharconferencia",
    element: <FecharSeparacao />,
  },
]);

export default router;
