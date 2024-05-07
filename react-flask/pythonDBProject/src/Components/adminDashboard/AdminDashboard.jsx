import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="flex h-screen bg-gray-200 ">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-gray-100 flex-shrink-0 w-64">
          <div className="flex flex-col h-full">
            {/* Sidebar Content */}
            <div className="flex flex-col flex-grow p-4">
              <h2 className="text-2xl font-semibold">Admin Panel</h2>
              <nav className="mt-6">
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Orders
                </a>
                <Link
                  to="/admindashboard/manageproducts"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Products
                </Link>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Customers
                </a>
                <Link
                  to="/admindashboard/user"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Users
                </Link>
                <Link
                  to="/admindashboard/admincart"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Cart
                </Link>
              </nav>
            </div>
          </div>
        </aside>
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
