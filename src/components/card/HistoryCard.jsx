//rafce
import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import Product from '../../pages/admin/Product'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
    const token = useEcomStore((s) => s.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        //code
        handleGetOrders(token)

    }, [])

    const handleGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStatusColor = (status)=>{
        switch (status){
          case 'Not Process':
            return 'bg-gray-200'
          case 'Processing':
            return 'bg-blue-200'
          case 'Completed' :
            return 'bg-green-200'
          case 'Cancelled':
            return 'bg-red-200'
        }
      }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>
            <div className='space-y-4'>
                {/* Card  Loop order*/}
                {
                    orders?.map((item, index) => {
                        // console.log(item)
                        return (
                            <div key={index} className='bg-gray-100 p-4 rounded-md shadow-md'>
                                {/* header */}
                                <div className='flex justify-between mb-2'>
                                    {/* Left */}
                                    <div>
                                        <p className='text-sm'>Order date</p>
                                        <p className='font-bold'>{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    {/* Right */}
                                    <div className={`${getStatusColor(item.orderStatus)} px-2 py-2   rounded-full`}>
                                        {item.orderStatus}
                                    </div>
                                </div>
                                {/* table Loop product*/}
                                <div className='p-2'>
                                    <table className='border w-full'>
                                        <thead>

                                            <tr className='bg-gray-200'>
                                                <th>สินค้า</th>
                                                <th>ราคา</th>
                                                <th>จำนวน</th>
                                                <th>รวม</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.products?.map((product,index) => {
                                                    // console.log(product)
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{numberFormat(product.product.price)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                {/* total */}
                                <div>
                                    <div className='text-right'>
                                        <p>ราคาสุทธิ</p>
                                        <p>{numberFormat(item.cartTotal)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default HistoryCard