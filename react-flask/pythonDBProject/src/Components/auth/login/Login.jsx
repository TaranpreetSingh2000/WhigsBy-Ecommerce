import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "../authStyle/Auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handeSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );

      if (response.status === 201) {
        console.log(response);
        sessionStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("Email", loginData.email);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setIcon(eye);
      setPasswordType("text");
      return;
    }
    setIcon(eyeOff);
    setPasswordType("password");
  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="bg-grey mt-6 flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="p-6 rounded text-black w-full bg-gray-50 shadow-md">
            <h1 className="mb-8 text-3xl text-center uppercase text-green-950">
              Login In
            </h1>

            <form onSubmit={handeSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
                name="email"
                onChange={handlechange}
                placeholder="Email"
                required
              />

              <div className={style.inputWithIcon}>
                <input
                  type={passwordType}
                  className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
                  name="password"
                  onChange={handlechange}
                  placeholder="Password"
                  required
                />
                <span className={style.icon} onClick={togglePassword}>
                  <Icon icon={icon} size={20} />
                </span>
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-700 text-white outline-lime-800"
              >
                Login In
              </button>

              <div className="flex justify-between items-center mt-2">
                <div className="remember">
                  <input type="checkbox" className="input-check p-3" />
                  <span className="mx-1">Remember me</span>
                </div>

                <Link
                  to=""
                  className="text-blue-900 hover:underline transition ease-in-out duration-300"
                >
                  Forgot Password
                </Link>
              </div>

              <hr className="my-4 border-gray-300" />

              <div className="text-center ">
                <p className="text-gray-600">Don't have an account?</p>
                <Link
                  to="/signup"
                  className="text-blue-900 hover:underline transition ease-in-out duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
