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
    });
  };
  return fetchCart;
};

export default useCart;
