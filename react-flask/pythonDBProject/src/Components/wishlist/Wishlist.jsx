import React, { useContext } from "react";
import { CartContext } from "../../_context/CartContext";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  deleteWishlistItem,
  getUserWishlistItem,
  addtoCart,
} from "../../../_utils/GlobalApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import wishlistIcon from "../../assets/wishlist.png";
const Wishlist = () => {
  const { wishlist, setWistlist, cart, setCart } = useContext(CartContext);
  const email = localStorage.getItem("Email");

  console.log(wishlist);
  const handleDeleteWishlistItems = (id) => {
    deleteWishlistItem(id).then((res) => {
      toast.success("Product Removed from wishlist ", {
        containerId: "wishlistRemoveContainer",
      });
      if (res) {
        getWishlistItem();
      } else {
        console.log(error);
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

  const onAddToCartClick = (id) => {
    debugger;
    const data = {
      data: {
        email: email,
        product: id,
      },
    };

    addtoCart(data).then((res) => {
      console.log(res);
      // if (res) {
      //   setCart((cart) => [
      //     ...cart,
      //     {
      //       id: res?.data?.data?.id,
      //       product: wishlist?.products,
      //     },
      //   ]);
      // }
      toast.success("Product Added successfully ", {
        containerId: "wishlistRemoveContainer",
      });
    });
  };

  return (
    <>
      <ToastContainer autoClose={1000} containerId="wishlistRemoveContainer" />
      <div className="container mx-auto p-10">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlist.length > 0 &&
              wishlist.map((item, index) => (
                <div className="border border-gray-200 rounded-md" key={index}>
                  <div className="flex relative">
                    <img
                      src={`http://localhost:1337${item.products.attributes.image.data[0].attributes.url}`}
                      className="w-full h-[200px] mb-4 rounded-md"
                    />
                    <RxCross1
                      className="absolute right-0 mx-2 my-2 border border-gray-500 rounded-xl p-1 text-2xl cursor-pointer"
                      onClick={() => handleDeleteWishlistItems(item?.id)}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full flex flex-col justify-center items-center">
                      <h2 className="text-md font-[system-ui]">
                        {item.products.attributes.title.slice(0, 30)}...
                      </h2>

                      <div className="mt-1 pt-2 flex items-baseline gap-2">
                        <p className="text-black font-semibold text-lg py-0.5">
                          ₹{item.products.attributes.price.toFixed(2)}
                        </p>

                        <span className="text-gray-500 mb-2 text-sm">
                          ₹
                          <span className="line-through">
                            {item?.products.attributes.mrp}
                          </span>
                        </span>
                        <span className="text-orange-500 font-semibold mb-2 text-sm font-[sans-serif] tracking-wide">
                          ({item?.products.attributes.discount.split("-")}% off)
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 w-full flex items-center justify-center p-3">
                      <Link
                        to=""
                        className="text-red-500 font-semibold cursor-pointer w-full text-center hover:text-red-600"
                        onClick={() =>
                          onAddToCartClick(
                            item?.products?.attributes?.image?.data[0]?.id
                          )
                        }
                      >
                        ADD TO CART
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-4">
            <p className="text-gray-700 font-semibold uppercase text-xl">
              Your Wishlist is empty
            </p>
            <img src={wishlistIcon} className="w-[150px]" alt="" />
            <p className="text-gray-500 text-xl w-[35%] text-center">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the bag.
            </p>
            <Link
              to="/dashboard"
              className="uppercase text-blue-800 border border-blue-700 p-4 py-3 px-5 font-semibold font-sans"
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
