//rafce
import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import {Link} from 'react-router-dom'
import { numberFormat } from '../../utils/number';

const CratCard = () => {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    console.log(carts)
    return (
        <div>
            <h1 className='text-2xl font-bold'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border p-2'>
                {/* Card */}
                {
                    carts.map((item, index) =>
                        <div key={index} className='bg-white round p-2 shadow-md mb-2'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2'>
                                {/* Left */}
                                <div className='flex gap-2 items-center'>

                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-16 h-16 rounded-md shadow-md'
                                                src={item.images[0].url} />
                                            : <div src="" className='w-16 h-16 bg-gray-300 rounded-md
                                flex text-center items-center'>
                                                No Image
                                            </div>
                                    }


                                    <div>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div
                                    onClick={() => actionRemoveProduct(item.id)}
                                    className='text-red-600'>
                                    <Trash2 />
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className='flex justify-between'>
                                {/* Left */}
                                <div className='border rounded-sm px-2 py-1 flex items-center'>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                        className='px-2 py-2 bg-gray-100 rounded-md hover:bg-red-400'><Minus size={16} /></button>
                                    <span className='px-4'>{item.count}</span>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                        className='px-2 py-2 bg-gray-100 rounded-md hover:bg-gray-400'><Plus size={16} /></button>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-blue-500'>
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* Total */}
                <div className='flex justify-between px-2'>
                    <span>รวม</span>
                    <span>{numberFormat(getTotalPrice())}</span>
                </div>
                {/* Button */}
                <Link to={'/cart'}>
                <button 
                className='mt-4 bg-green-500 text-white w-full py-2 rounded-md shadow-md hover:bg-green-600'>
                    ดำเนินการชำระเงิน
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CratCard