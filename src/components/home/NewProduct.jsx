//rafce
import React,{useState,useEffect} from 'react'
import {listProductBy} from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const NewProduct = () => {
    const [data,setData] = useState([])

    useEffect(() =>{
        //code
        loadData()
    },[])

    const loadData = () => {
        listProductBy('updatedAt','desc',12)
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
                <SwiperSlide key={index}>
                    <ProductCard item={item}/> 
                </SwiperSlide>
            )
        }
    </SwiperShowProduct>
  )
}

export default NewProduct