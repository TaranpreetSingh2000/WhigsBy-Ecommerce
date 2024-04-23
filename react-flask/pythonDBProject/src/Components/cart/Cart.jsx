import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  console.log(cart, "---> came to cart section");
  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md absolute mx-10 right-10 top-[6rem] p-5 border shadow-sm overflow-auto transition-all duration-500 ease-out">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.length > 0 &&
            cart.map((item, index) => (
              <li className="flex items-center gap-4" key={index}>
                <img
                  src={`http://localhost:1337${item?.products?.attributes?.image?.data[0]?.attributes?.url}`}
                  className="size-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">
                    {item?.products?.attributes?.title.slice(0, 12)}...
                  </h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">
                        Price:{item?.products?.attributes?.price}
                      </dt>
                    </div>
                    <div>
                      <dt className="inline">
                        category:{item?.products?.attributes?.category}
                      </dt>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
        <Link
          to="/page"
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          View my cart ({cart?.length})
        </Link>

        <Link
          to="/dashboard"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
