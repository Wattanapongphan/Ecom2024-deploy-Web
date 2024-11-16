//rafce
import React, { useState, useEffect } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, updateProduct } from '../../api/Product'
import { toast } from 'react-toastify';
import UpLoadFile from './UpLoadFile';
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {

    "title": "core i5",
    "description": "desc",
    "price": 2000,
    "quantity": 10,
    "categoryId": '',
    "images": []

}


const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    // console.log(products)


    const [form, setForm] = useState(initialState)


    useEffect(() => {
        //code
        getCategory()
        fetchProduct(token, id, form)
    }, [])

    const fetchProduct = async (token) => {
        try {
            //code
            const res = await readProduct(token, id, form)
            console.log('res from backend', res)
            setForm(res.data)
        } catch (err) {
            console.log('Eror fetch data', err)
        }
    }
    console.log(form)

    const handleOnchange = ((e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input className='border' type="text"
                    value={form.title}
                    onChange={handleOnchange}
                    placeholder='Title'
                    name='title'
                />
                <input className='border' type="text"
                    value={form.description}
                    onChange={handleOnchange}
                    placeholder='Description'
                    name='description'
                />
                <input className='border' type="number"
                    value={form.price}
                    onChange={handleOnchange}
                    placeholder='Price'
                    name='price'
                />
                <input className='border' type="number"
                    value={form.quantity}
                    onChange={handleOnchange}
                    placeholder='Quantity'
                    name='quantity'
                />
                <select
                    className='border'
                    name='categoryId'
                    onChange={handleOnchange}
                    required
                    value={form.categoryId}
                >
                    <option value='' disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                {/*upload files*/}
                <UpLoadFile form={form} setForm={setForm} />

                <button className='bg-blue-500 p-2 rounded-md shadow-md 
                hover:scale-105 hover:-translate-y-1 hover:duration-200 my-2'>แก้ไขสินค้า</button>
                <hr />
                <br />

            </form>
        </div>
    )
}

export default FormEditProduct