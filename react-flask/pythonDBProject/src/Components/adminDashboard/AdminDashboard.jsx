import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminAccessToken");
    toast.success("Logout Successfully ");
    setTimeout(() => {
      navigate("/admin");
    }, 3000);
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      {/* <div className="flex flex-col justify-center gap-5 items-center h-[80vh]">
        <h2 className="text-5xl text-red-800">
          Welcome to Admin Dashboard Page
        </h2>

        <button
          type="submit"
          class="py-3 px-4 text-md font-medium rounded-lg text-white bg-blue-700 focus:ring-4 focus:outline-none hover:bg-blue-600 hover:transition all duration-500 ease-in-out"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div> */}
      <div className="flex h-screen bg-gray-200">
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
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Orders
                </a>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Customers
                </a>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Users
                </a>
                <a
                  href="#"
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                >
                  Cart
                </a>
                <a
                  className="text-gray-300 py-2 px-4 block hover:bg-gray-700 hover:text-white"
                  onClick={handleAdminLogout}
                >
                  Logout
                </a>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            {/* Track Count */}
            <div className="bg-white p-6 flex justify-between items-center mb-8">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Total Users
                </p>
                <p className="text-lg font-semibold text-gray-700">500</p>
              </div>
              <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
                  Add Product
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Manage Products
                </button>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-lg font-semibold mb-4">Order History</h2>
              <div className="flex justify-between">
                <p className="text-gray-600">Total Orders</p>
                <p className="text-gray-700">1000</p>
              </div>
              {/* Display order history details */}
              <div className="mt-4">
                {/* Sample order details */}
                <div className="flex justify-between border-b border-gray-300 py-2">
                  <p className="text-gray-600">Order ID: 123</p>
                  <p className="text-gray-700">Date: 2024-04-16</p>
                </div>
                {/* Add more order details */}
              </div>
            </div>

            {/* Tables */}
            <div className="w-full overflow-hidden rounded-lg shadow-md bg-white">
              <table className="w-full whitespace-nowrap">
                {/* Table Headers */}
                <thead>
                  <tr className="text-left font-medium">
                    <th className="px-6 pt-6 pb-4">ID</th>
                    <th className="px-6 pt-6 pb-4">Name</th>
                    <th className="px-6 pt-6 pb-4">Email</th>
                    {/* Add more headers */}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {/* Table Rows */}
                  <tr>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">john.doe@example.com</td>
                    {/* Add more columns */}
                  </tr>
                  {/* Add more rows */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
