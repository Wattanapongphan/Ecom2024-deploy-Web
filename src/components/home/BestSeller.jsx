//rafce
import React,{useState,useEffect} from 'react'
import {listProductBy} from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const BestSeller = () => {
    const [data,setData] = useState([])

    useEffect(() =>{
        //code
        loadData()
    },[])

    const loadData = () => {
        listProductBy('sold','desc',12)
        .then((res) =>{
            setData(res.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
console.log(data)
  return (
    <SwiperShowProduct>
        {
            data?.map((item,index)=>
                <SwiperSlide>
                    <ProductCard key={index} item={item}/> 
                </SwiperSlide>
            )
        }
    </SwiperShowProduct>
  )
}

export default BestSeller