import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const ImageSlider = ({ images }) => {
  // const imageUrl =
  //   "http://localhost:8000/images/products/images/products-657ebec0b74e88d3217270b1-1703152829910-1.jpeg";
  // const image = new Image();
  // image.src = imageUrl;
  // console.log(image);

  // const imageUrl =
  //   "http://localhost:8000/images/products/images/products-657ebec0b74e88d3217270b1-1703152829910-1.jpeg";
  // fetch(imageUrl)
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     // Process the image blob or upload it to a server
  //     console.log(blob);
  //   });

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="w-60 pr-4 m-0 cursor-pointer"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index} itemID={3}>
          <img
            src={`http://localhost:8000/images/products/images/${image}`}
            className="rounded-2xl block w-52 h-52"
            alt="slider"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
