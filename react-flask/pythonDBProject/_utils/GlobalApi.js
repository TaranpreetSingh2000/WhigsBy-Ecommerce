import axios from "axios";

const apiKey = import.meta.env.VITE_PUBLIC_REST_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getProductsById = (id) =>
  axiosClient.get("/products/" + id + "?populate=*");

// add to cart function
const addtoCart = (data) => axiosClient.post("/carts", data);

// Get user cart items
const getUserCartItems = (email) =>
  axiosClient.get(
    "/carts?populate[products][populate][0]=image&&filters[email][$eq]=" + email
  );

// delete cartItems
const deleteCartItems = (id) => axiosClient.delete("/carts/" + id);

// filter products by categories

debugger;
const getProductsByCategories = (category) =>
  axiosClient.get(
    "/products?filters[category][$containsi]=" + category + "&populate=*"
  );

export {
  addtoCart,
  getProductsById,
  getUserCartItems,
  deleteCartItems,
  getProductsByCategories,
};
