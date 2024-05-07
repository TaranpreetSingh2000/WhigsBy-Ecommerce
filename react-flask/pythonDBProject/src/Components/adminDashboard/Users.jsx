import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const Users = () => {
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

  return (
    <div className="w-full p-5">
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
          <Link
            to="/admindashboard/manageproducts"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Manage Products
          </Link>
        </div>
      </div>
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
    </div>
  );
};

export default Users;
