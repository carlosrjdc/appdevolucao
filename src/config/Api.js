import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 5000,
  headers: {
    Authorization: process.env.RAVEX_LG,
  },
});

export default Axios;
