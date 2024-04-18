import React from "react";
import bannerImg from "../../assets/banner.jpg";
import StrapiData from "../productDetails/StrapiData";
const Dashboard = () => {
  return (
    <>
      {/* <div>
        <div className="mb-5">
          <img src={bannerImg} className="w-[100%]" alt="banner" />
        </div>
        <h1 className="uppercase my-[40px] text-[1.8em] text-zinc-700 font-medium tracking-[0.3em] tracking-normal-[2.5em] mb-[40px] px-[45px]">
          GRAND GLOBAL BRANDS
        </h1>
      </div> */}
      <div className="flex items-center justify-center py-10 mb-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-1/2">
            <h1 className="text-4xl font-thin sm:text-6xl text-center md:text-6xl lg:text-6xl text-gray-700">
              Get 50% Discount on every deals
            </h1>
            <p className="text-lg text-gray-600 mt-4 text-center">
              Find the best deals here
            </p>
          </div>
          <div className="w-1/2 ml-8">
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
