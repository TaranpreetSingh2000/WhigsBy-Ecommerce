import { useState } from "react";
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
          path="/admin/dashboard"
          element={<AdminProtected Component={AdminDashboard} />}
        />
        <Route path="contact" element={<Contact />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
