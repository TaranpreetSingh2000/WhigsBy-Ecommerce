import React from "react";
import StrapiData from "../productDetails/StrapiData";
const Dashboard = () => {
  return (
    <>
      <div className="flex items-center justify-center py-5 max-[640px]:px-4">
        <div className="max-w-8xl sm:px-6 lg:px-2 flex items-center max-[500px]:flex-col max-[500px]:gap-8">
          <div className="w-1/2 max-[500px]:w-full ">
            <h1 className="text-4xl font-thin sm:text-6xl text-center md:text-6xl lg:text-6xl text-gray-700 max-[500px]:text-6xl">
              Get 50% Discount on every deals
            </h1>
            <p className="text-lg text-gray-600 mt-4 text-center">
              Find the best deals here
            </p>
          </div>
          <div className="w-1/2 ml-8 max-[500px]:w-full max-[500px]:px-4 max-[500px]:ml-0">
            <img
              src="https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/20421124/2022/10/17/2dd1cc94-8bed-4f0f-8c95-a785a9910a3c1665981279300HERENOWMenMulticolouredSlimFitPrintedCasualShirt1.jpg"
              alt="Summer Image"
              className="rounded-lg shadow-xl w-[400px]"
            />
          </div>
        </div>
      </div>

      <StrapiData />
    </>
  );
};

export default Dashboard;
