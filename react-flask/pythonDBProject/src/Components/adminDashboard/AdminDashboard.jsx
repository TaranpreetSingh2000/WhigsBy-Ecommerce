import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getNumberOfUsers();
  }, []);
  const getNumberOfUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Getting error in fetching the number of users");
    }
  };

  console.log(data);
  debugger;
  return (
    <>
      <ToastContainer autoClose={1000} />
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
                  Total Users Registered
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {data.user_count}
                </p>
              </div>
              <div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                  Manage Products
                </button>
              </div>
            </div>

            {/* Tables */}
            <div className="w-full overflow-hidden rounded-lg shadow-md bg-white mb-8">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-left font-medium">
                    <th className="px-6 pt-6 pb-4">ID</th>
                    <th className="px-6 pt-6 pb-4">Name</th>
                    <th className="px-6 pt-6 pb-4">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users &&
                    data.users.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">{user.id}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
