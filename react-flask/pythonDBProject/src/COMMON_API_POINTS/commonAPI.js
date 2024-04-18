import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337",
});

const addtoCart = (data) => axiosInstance.post("/cart", data);

export default addtoCart;
