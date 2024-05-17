import React, { useState } from "react";
import Data from "./Components/data/Data";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Signup from "./Components/auth/signup/Signup";
import Login from "./Components/auth/login/Login";
import Layout from "./Components/layout/Layout";
import Dashboard from "./Components/ProductsListing/ProductsListing.jsx";
import Protected from "./Components/services/Protected.jsx";
import Admin from "./Components/auth/admin/Admin.jsx";
import Contact from "./Components/contact/Contact.jsx";
import AdminProtected from "./Components/services/AdminProtected.jsx";
import AdminDashboard from "./Components/adminDashboard/AdminDashboard.jsx";
import ProductDetails from "./Components/productDetails/ProductDetails.jsx";
import { CartContext } from "./_context/CartContext.js";
import Cart from "./Components/cart/Cart.jsx";
import Page from "./cartPage/Page.jsx";
import Wishlist from "./Components/wishlist/Wishlist.jsx";
import ShopCategoriesDetails from "./Components/productDetails/ShopCategoriesDetails.jsx";
import ManageProducts from "./Components/adminDashboard/manageProducts/ManageProducts.jsx";
import Users from "./Components/adminDashboard/Users.jsx";
import AdminCart from "./Components/adminDashboard/AdminCart.jsx";
import Checkout from "./Components/checkout/Checkout.jsx";
import SuccessPopup from "./Components/successPage/SuccessPopup.jsx";
import Customers from "./Components/adminDashboard/Customers.jsx";
import Orders from "./Components/adminDashboard/Orders.jsx";
import AboutUs from "./Components/about/AboutUs.jsx";
import CategoriesPage from "./Components/category/CategoriesPage.jsx";
import { ToastContainer } from "react-toastify";
import Home from "./Components/home/Home.jsx";
import ProductsListing from "./Components/ProductsListing/ProductsListing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Data />} />
        <Route path="signup" element={<Signup />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="category" element={<CategoriesPage />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="listing" element={<Protected Component={ProductsListing} />} />
        <Route path="home" element={<Protected Component={Home} />} />

        <Route
          path="productDetails/:productId"
          element={<Protected Component={ProductDetails} />}
        />
        <Route
          path="/categoryDetails/:categoryname"
          element={<Protected Component={ShopCategoriesDetails} />}
        />
        <Route
          path="/categoryDetails/:productId"
          element={<Protected Component={ProductDetails} />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Protected Component={Wishlist} />} />
        <Route path="checkout" element={<Protected Component={Checkout} />} />
        <Route path="/page" element={<Protected Component={Page} />} />
        <Route
          path="/checkout/success"
          element={<Protected Component={SuccessPopup} />}
        />
        <Route
          path="admindashboard"
          element={<AdminProtected Component={AdminDashboard} />}
        >
          <Route path="manageproducts" element={<ManageProducts />} />
          <Route path="user" element={<Users />} />
          <Route path="admincart" element={<AdminCart />} />
          <Route path="customer" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="contact" element={<Contact />} />
      </Route>
    </>
  )
);

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWistlist] = useState([]);
  const [priceFilter, setPriceFilter] = useState({});
  const [initialData, setInitialData] = useState({});

  return (
    <>
      <ToastContainer autoClose={1000} />
      <CartContext.Provider
        value={{
          cart,
          setCart,
          wishlist,
          setWistlist,
          priceFilter,
          setPriceFilter,
          initialData,
          setInitialData,
        }}
      >
        <RouterProvider router={router} />
      </CartContext.Provider>
    </>
  );
}

export default App;
