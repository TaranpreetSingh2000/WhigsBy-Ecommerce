import axios from "axios";

const apiKey = import.meta.env.VITE_PUBLIC_REST_API_KEY;
const axiosClient = axios.create({
  baseURL: "https://whigsby-live-server.onrender.com/api",
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getAllProducts = () => axiosClient.get("/products?populate=*");

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

const getProductsByCategories = (category) =>
  axiosClient.get(
    "/products?filters[category][$containsi]=" + category + "&populate=*"
  );

// whishlist Products

const addtoWhistlist = (data) => axiosClient.post("/whistlists", data);

// get wishlist Item

const getUserWishlistItem = (email) =>
  axiosClient.get(
    "/whistlists?populate[products][populate][0]=image&&filters[email][$eq]=" +
      email
  );

// delete wishlist Item

const deleteWishlistItem = (id) => axiosClient.delete("/whistlists/" + id);

export {
  getAllProducts,
  addtoCart,
  getProductsById,
  getUserCartItems,
  deleteCartItems,
  getProductsByCategories,
  addtoWhistlist,
  getUserWishlistItem,
  deleteWishlistItem,
};
