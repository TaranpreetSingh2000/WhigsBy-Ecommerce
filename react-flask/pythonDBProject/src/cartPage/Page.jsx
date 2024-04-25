import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import { deleteCartItems, getUserCartItems } from "../../_utils/GlobalApi";
import { Link } from "react-router-dom";
import emptyCart from "../assets/emptycart.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const { cart, setCart, whishlist } = useContext(CartContext);
  const email = localStorage.getItem("Email");

  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((element) => {
      totalAmount = totalAmount + Number(element.products.attributes.price);
    });
    return totalAmount;
  };

  console.log(whishlist);

  const deleteCartItems_ = (id) => {
    deleteCartItems(id).then((res) => {
      toast.success("Product Removed from cart ", {
        containerId: "cartRemoveContainer",
      });
      if (res) {
        getCartItem();
      } else {
        console.log(error);
      }
    });
  };

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
  return (
    <>
      <ToastContainer autoClose={1000} containerId="cartRemoveContainer" />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mt-8">
              <ul className="space-y-4">
                {cart.length > 0 ? (
                  cart.length > 0 &&
                  cart.map((item) => (
                    <li className="flex items-center gap-4" key={item.id}>
                      <img
                        src={`http://localhost:1337${item?.products?.attributes?.image?.data[0]?.attributes?.url}`}
                        alt=""
                        className="size-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {item?.products?.attributes?.title.slice(0, 50)}...
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">
                              category:{item?.products?.attributes?.category}
                            </dt>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <div>
                          <dt className="inline font-semibold">
                            ₹{item?.products?.attributes?.price}
                          </dt>
                        </div>

                        <button
                          className="text-gray-600 transition hover:text-red-600"
                          onClick={() => deleteCartItems_(item?.id)}
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="flex justify-center items-center flex-col gap-4">
                    <img src={emptyCart} className="w-[150px]" alt="" />
                    <p className="text-center text-black-500 text-xl">
                      Your Cart is empty!! Nothing to preview
                    </p>
                    <Link
                      to="/dashboard"
                      className="inline-block text-sm text-gray-500 underline underline-offset-4 transition cursor-pointer hover:text-gray-600"
                    >
                      Continue shopping
                    </Link>
                  </div>
                )}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>₹{getTotalAmount()}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 h-4 w-4"
                      >
                        <path d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                      </svg>

                      <p className="whitespace-nowrap text-xs">
                        2 Discounts Applied
                      </p>
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
