

import React from 'react'
import slider3 from "./../../assets/images/ma.jpg"
import slider2 from "./../../assets/images/maa.jpg"
import slider1 from "./../../assets/images/maaa.jpg"
import slider5 from "./../../assets/images/maaaa.webp"
import slider4 from "./../../assets/images/grocery-banner.png"

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MainSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  }

  return (
    <div className="container transition-colors duration-500 mt-16 bg-white dark:bg-gray-900 mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Slider */}
        <div className="w-full md:w-3/4 overflow-hidden rounded-xl shadow-md">
          <Slider {...settings}>
            {[ slider4, slider1,slider3].map((img, idx) => (
              <div key={idx} className="relative  h-[400px] w-full">
                <img
                  src={img}
                  alt={`slider-img-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Side Images */}
        <div className="hidden md:flex flex-col w-1/4 gap-4">
          {[slider2, slider5].map((img, idx) => (
            <div key={idx} className="relative border border-gray-400 overflow-hidden rounded-xl shadow-md h-[195px] w-full">
              <img
                src={img}
                alt={`side-img-${idx}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
