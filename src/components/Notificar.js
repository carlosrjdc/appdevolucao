import { Store } from "react-notifications-component";

export default function Notificar(titulo, mensagem, tipo, local) {
  Store.addNotification({
    title: titulo,
    message: mensagem,
    type: tipo,
    insert: "bottom",
    container: "bottom-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}
