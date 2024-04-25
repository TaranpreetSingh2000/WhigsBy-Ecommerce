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
import Dashboard from "./Components/dashboard/Dashboard";
import Protected from "./Components/services/Protected.jsx";
import Admin from "./Components/auth/admin/Admin.jsx";
import Contact from "./Components/contact/Contact.jsx";
import AdminProtected from "./Components/services/AdminProtected.jsx";
import AdminDashboard from "./Components/adminDashboard/AdminDashboard.jsx";
import ProductDetails from "./Components/productDetails/ProductDetails.jsx";
import { CartContext } from "./_context/CartContext.js";
import Cart from "./Components/cart/Cart.jsx";
import Page from "./cartPage/Page.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Data />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />
        <Route path="dashboard" element={<Protected Component={Dashboard} />} />
        <Route
          path="/productDetails/:productId"
          element={<Protected Component={ProductDetails} />}
        />
        <Route path="/cart" element={<Protected Component={Cart} />} />
        <Route path="/page" element={<Protected Component={Page} />} />
        <Route
          path="/admin/dashboard"
          element={<AdminProtected Component={AdminDashboard} />}
        />
        <Route path="contact" element={<Contact />} />
      </Route>
    </>
  )
);

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWistlist] = useState([]);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, wishlist, setWistlist }}>
        <RouterProvider router={router} />
      </CartContext.Provider>
    </>
  );
}

export default App;
