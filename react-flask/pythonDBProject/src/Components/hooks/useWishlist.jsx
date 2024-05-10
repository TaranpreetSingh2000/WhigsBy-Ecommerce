import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import { toast } from "react-toastify";
import { addtoWhistlist } from "../../../_utils/GlobalApi";

const useWishlist = () => {
  const { setWistlist } = useContext(CartContext);

  const fetchWishlist = (data, productData) => {
    addtoWhistlist(data).then((res) => {
      if (res) {
        setWistlist((whishlist) => [
          ...whishlist,
          {
            id: res?.data?.data?.id,
            products: productData,
          },
        ]);
      }
    });
  };
  return fetchWishlist;
};

export default useWishlist;
