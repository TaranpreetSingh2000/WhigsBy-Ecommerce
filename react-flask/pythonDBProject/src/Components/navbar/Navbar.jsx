import React, { useEffect, useState, useRef, useContext } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { GoHeart } from "react-icons/go";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "../../_context/CartContext";
import Cart from "../cart/Cart";
import {
  getUserCartItems,
  getUserWishlistItem,
} from "../../../_utils/GlobalApi";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [user, setUser] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart, wishlist, setWistlist } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const email = localStorage.getItem("Email");
  localStorage.setItem("Wishlist", JSON.stringify(wishlist));

  useEffect(() => {
    if (email) {
      getCartItem();
      getWishlistItem();
    } else {
      setCart([]);
      setWistlist([]);
    }
  }, [email]);

  const getCartItem = () => {
    getUserCartItems(email).then((res) => {
      const result = res.data.data;
      if (result) {
        setCart(
          result.map((prod) => ({
            id: prod?.id,
            products: prod.attributes.products.data,
          }))
        );
      }
    });
  };

  const getWishlistItem = () => {
    getUserWishlistItem(email).then((res) => {
      const result = res.data.data;
      if (result) {
        setWistlist(
          result.map((prod) => ({
            id: prod?.id,
            products: prod.attributes.products.data,
          }))
        );
      }
    });
  };
  useEffect(() => {
    const isLogin = sessionStorage.getItem("accessToken");
    const isAdminLogin = sessionStorage.getItem("adminAccessToken");

    if (isLogin) {
      setIsAuth(true);
    } else if (isAdminLogin) {
      setIsAdminAuth(true);
    } else {
      setIsAuth(false);
      setIsAdminAuth(false);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchedEmailData = async () => {
      const loginEmail = localStorage.getItem("Email");
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${loginEmail}`
        );
        if (response.status === 200) {
          setUser(response.data.user.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchedEmailData();
  }, [isAuth, isAdminAuth]);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("loginEmail");
    localStorage.removeItem("Email");
    setIsMenuOpen(false);
    toast.success("Logout Successfully ");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminAccessToken");
    localStorage.removeItem("Email");
    toast.success("Logout Successfully ");
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2.5">
          <div>
            {isAuth ? (
              <Link to="/dashboard">
                <img
                  src={logo}
                  className="w-auto h-[80px] cursor-pointer"
                  alt="Logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src={logo}
                  className="w-auto h-[80px] cursor-pointer"
                  alt="Logo"
                />
              </Link>
            )}
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row items-center">
              {(isAuth || isAdminAuth) && (
                <div className="profileSection">
                  <ul>
                    <li>
                      <strong>{user && `Welcome, ${user}`}</strong>
                    </li>
                  </ul>
                </div>
              )}

              <div className="relative" ref={menuRef}>
                <button
                  className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none cursor-pointer"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen ? "true" : "false"}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="rounded-full p-2 m-2 text-blue-800 border border-blue-800"
                  />
                </button>

                {isMenuOpen && (
                  <ul className="absolute  z-[1000] float-left m-0 w-[150px] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark right-0 mt-2 h-30">
                    <li>
                      <a
                        href="#"
                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        onClick={toggleMenu}
                      >
                        My Profile
                      </a>
                    </li>

                    {isAdminAuth ? (
                      <a
                        className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25 cursor-pointer"
                        onClick={handleAdminLogout}
                      >
                        Logged out Admin
                      </a>
                    ) : (
                      <Link
                        to="/admin"
                        className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25 cursor-pointer"
                        onClick={toggleMenu}
                      >
                        Login Admin
                      </Link>
                    )}

                    <li>
                      <a
                        href="#"
                        className="block w-full whitespace-nowrap bg-white px-4 py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                        onClick={toggleMenu}
                      >
                        Settings
                      </a>
                    </li>

                    <li>
                      {isAuth ? (
                        <a
                          href="#"
                          className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      ) : (
                        <Link
                          to="/login"
                          className="block px-4 w-full whitespace-nowrap bg-white py-2 text-md font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25 cursor-pointer"
                          onClick={toggleMenu}
                        >
                          Login User
                        </Link>
                      )}
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-center items-end my-1 cursor-pointer  ">
              <div
                className="flex items-center"
                onClick={() => setOpenCart(!openCart)}
              >
                <BsCart2 className="text-xl cursor-pointer" />
                <span className="font-semibold text-md cursor-pointer">
                  <sup className="border border-red-600 rounded-3xl p-[0.6px] px-[5px] bg-red-600 text-white">
                    {isAuth || isAdminAuth ? cart?.length : 0}
                  </sup>
                </span>
              </div>

              <div>
                <Link to="/wishlist">
                  <GoHeart className="text-xl" />
                </Link>
              </div>
            </div>
            {openCart && isAuth ? <Cart /> : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
