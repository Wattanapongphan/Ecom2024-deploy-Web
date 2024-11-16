//rafce
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SwiperShowProduct = ({children}) => {
    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                navigation={true}
                modules={[Pagination, Autoplay, Navigation]}
                breakpoints={{
                    320: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                    1280: {
                      slidesPerView: 7,
                      spaceBetween: 50,
                    },
                  }}
                className="mySwiperobject-cover round-md">

                {children}


            </Swiper>

        </div>
    )
}

export default SwiperShowProduct