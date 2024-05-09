import React, { useEffect, useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import { addtoCart } from "../../../_utils/GlobalApi";
import { toast } from "react-toastify";

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const fetchCart = (data, productData) => {
    addtoCart(data).then((res) => {
      if (res) {
        setCart((cart) => [
          ...cart,
          {
            id: res?.data?.data?.id,
            products: productData,
          },
        ]);
      }
      toast("Product Added successfully", {
        position: "top-right",
        autoClose: true,
        closeOnClick: true,
        draggable: false,
        type: "success",
        toastId: 13,
      });
    });
  };
  return fetchCart;
};

export default useCart;
