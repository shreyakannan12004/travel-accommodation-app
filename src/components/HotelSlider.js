import React, { useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotelSlider = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <FaChevronLeft className="text-gray-600" size={10} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <FaChevronRight className="text-gray-600" size={10} />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div
      className="relative w-full h-60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider {...settings} className="w-full h-full">
        {images.map((img, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={img}
              alt={`Hotel ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default HotelSlider;
