import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  console.log(cart);

  debugger;
  return (
    <div>
      {cart.map((item) => {
        <p>item.productTitle</p>;
      })}
    </div>
  );
};

export default Cart;
