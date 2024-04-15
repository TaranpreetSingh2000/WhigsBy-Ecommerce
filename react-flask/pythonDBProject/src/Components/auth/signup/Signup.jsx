import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handlechange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/register",
      registerData
    );

    if (response.status === 201) {
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="bg-grey mt-6 flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="p-6 rounded text-black w-full bg-gray-50 shadow-md">
            <h1 className="mb-8 text-3xl text-center uppercase text-green-950">
              Sign up
            </h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                onChange={handlechange}
                placeholder="Full Name"
                required
              />

              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                onChange={handlechange}
                placeholder="Email"
                required
              />

              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="mobile"
                onChange={handlechange}
                placeholder="mobile"
                required
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                onChange={handlechange}
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-700 text-white"
              >
                Create Account
              </button>
              <hr className="my-4 border-gray-300" />

              <div className="text-center ">
                <p className="text-gray-600">Already have an account?</p>
                <Link
                  to="/login"
                  className="text-blue-900 hover:underline transition ease-in-out duration-300"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
