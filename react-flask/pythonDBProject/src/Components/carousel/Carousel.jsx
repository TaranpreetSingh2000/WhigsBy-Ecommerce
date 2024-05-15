import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (
    <div className="content my-6">
      <Slider {...settings}>
        <div className="">
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2023/6/314277494/HU/ID/GO/16391797/bajson-bull-check-shirts-500x500.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2023/10/351774953/LO/OQ/II/16391797/bajson-oxy-shirts-500x500.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://5.imimg.com/data5/ANDROID/Default/2022/10/QO/QT/UE/19051907/product-jpeg-500x500.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2022/12/CQ/EW/GZ/182013831/white-color-shoes-500x500.jpg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
