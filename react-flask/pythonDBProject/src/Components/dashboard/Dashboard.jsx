import React from "react";
import bannerImg from "../../assets/banner.jpg";
import StrapiData from "../productDetails/StrapiData";
const Dashboard = () => {
  return (
    <>
      <div>
        <div className="mb-5">
          <img src={bannerImg} className="w-[100%]" alt="banner" />
        </div>
        <h1 className="uppercase my-[40px] text-[1.8em] text-zinc-700 font-medium tracking-[0.3em] tracking-normal-[2.5em] mb-[40px] px-[45px]">
          GRAND GLOBAL BRANDS
        </h1>
      </div>
      <StrapiData />
    </>
  );
};

export default Dashboard;
