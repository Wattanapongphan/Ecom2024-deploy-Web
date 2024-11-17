//rafce
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation  } from 'swiper/modules';

const ContentCarousel = () => {
    //javascript
    const [data, setData] = useState([])
    useEffect(() => {
        hdlGetImage()
    }, [])
    const hdlGetImage = () => {
        //code
        axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((res) => setData(res.data))
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper h-80 object-cover round-md mb-5">

                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.
                                download_url
                            } className='rounded-md' />
                        </SwiperSlide>
                    )
                }

            </Swiper>

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
                className="mySwiperobject-cover round-md">

                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.
                                download_url
                            } className='rounded-md' />
                        </SwiperSlide>
                    )
                }

            </Swiper>



        </div>
    )
}

export default ContentCarousel