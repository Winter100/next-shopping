"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="carousel w-full h-80">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://img-cf.kurly.com/cdn-cgi/image/width=360,height=468,quality=85/shop/data/goods/1574067174146l0.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://product-image.kurly.com/cdn-cgi/image/width=360,height=468,quality=85/product/image/89daeb98-64ad-4b03-b73b-c9da6c29e96c.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://3p-image.kurly.com/cdn-cgi/image/width=360,height=468,quality=85/files/7eb4c020-4b1e-413c-829e-30cf5c3549d0/9733f917-9608-486d-8883-a5cae7da2b86.png"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
