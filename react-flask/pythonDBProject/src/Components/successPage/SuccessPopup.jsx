import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, paymentId, details } = location.state || {};

  if (!orderId || !paymentId || !details) {
    return (
      <div class="grid h-screen place-content-center bg-white px-4">
        <h1 class="uppercase tracking-widest text-gray-500">404 | Not Found</h1>
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-500">
          Payment Success!{" "}
          <i
            class="fa fa-check"
            aria-hidden="true"
            color="green"
            style={{
              border: "1px solid #22c563",
              borderRadius: "20px",
              padding: "5px",
            }}
          ></i>
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Your payment was successful. Thank you for shopping with WhigsBy!
        </p>

        <div className="mb-4 flex items-center gap-2">
          <p className="text-sm text-gray-600">Name:</p>
          <p className="text-md">{details.name}</p>
        </div>
        <div className="mb-4 text-left flex items-center gap-2">
          <p className="text-sm text-gray-600">Mobile:</p>
          <p className="text-md">{details.mobile}</p>
        </div>
        <div className="mb-4 text-left flex items-center gap-2">
          <p className="text-sm text-gray-600">Address:</p>
          <p className="text-md">{details.address}</p>
        </div>
        <div className="mb-4 text-left flex items-center gap-2">
          <p className="text-sm text-gray-600">Email:</p>
          <p className="text-md">{details.email}</p>
        </div>

        <p className="text-gray-700 mb-4 text-left text-xl">Track your details:</p>
        <div className="mb-4 text-left flex items-center gap-2">
          <p className="text-sm text-gray-600">Order ID:</p>
          <p className="text-md ">{orderId}</p>
        </div>
        <div className="text-left flex items-center gap-2">
          <p className="text-sm text-gray-600">Payment ID:</p>
          <p className="text-md ">{paymentId}</p>
        </div>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded mt-8 hover:bg-gray-600"
          onClick={() => navigate("/dashboard")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
