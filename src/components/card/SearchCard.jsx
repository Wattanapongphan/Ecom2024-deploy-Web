//rafce
import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../utils/number';


const SearchCard = () => {

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelected, setCategorySelected] = useState([])
    const [price,setPrice] = useState([1000,30000])
    const [ok,setOk] = useState(false)

    // console.log(categories)
    useEffect(() => {
        getCategory()
    }, [])

    // Step 1 Search Text
    // console.log(text)
    useEffect(() => {
        //code
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)
        return () => clearTimeout(delay)
    }, [text])


    // Step 2 Search by Category
    const handleCheck = (e) => {
        console.log(e.target.value)
        const inCheck = e.target.value //ค่าที่เราติ๊ก
        const inState = [...categorySelected] //[] arr ว่าง
        const findCheck = inState.indexOf(inCheck) //ไม่เจอจะreturn -1

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelected(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }

    }
    // console.log(categorySelected)

    // Step 3 Search by Price
    useEffect(()=>{
        actionSearchFilters({price})
    },[ok])
    const handlePrice = (value)=>{
        console.log(value)
        setPrice(value)
        setTimeout(()=>{
            setOk(!ok)
        },300)
    }

    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
            {/* Search by Category */}
            <input onChange={(e) => setText(e.target.value)} type="text" className='border rounded-md w-full mb-4 px-4' placeholder='ค้นหาสินค้า....' />
            <hr />
            {/* Search by Category */}
            <div>
                <h1 className='font-bold'>หมวดหมู้สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div key={index} className='flex gap-2'>
                                <input type='checkbox'
                                    onChange={handleCheck}
                                    value={item.id}
                                />
                                <label>{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
            {/* Search by Price */}
            <div>
                <h1>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min : {numberFormat(price[0])}</span>
                        <span>Max : {numberFormat(price[1])}</span>
                    </div>

                    <Slider
                    onChange={handlePrice}
                    range
                    min={0}
                    max={100000}
                    defaultValue={[1000,30000]}
                    />
                </div>
            </div>

        </div>
    )
}

export default SearchCard