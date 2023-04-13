import axios from "axios";

const Axios = axios.create({
  baseURL: "https://backdevolucao.vercel.app/",
  timeout: 5000,
  headers: {
    Authorization: process.env.RAVEX_LG,
  },
});

export default Axios;
