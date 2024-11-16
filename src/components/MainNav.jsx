//rafce
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from "../store/ecom-store"
import { ChevronDown } from 'lucide-react';


const MainNav = () => {
    const carts = useEcomStore((s) => s.carts)
    const user = useEcomStore((s) => s.user)
    const logout = useEcomStore((s) => s.logout)
    // console.log(Boolean(user))
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    console.log(carts.length)

    return (
        <nav className='bg-white shadow-md'>
            <div className='mx=auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-4'>


                        <Link to={'/'}
                            className='text-2xl font-bold'>
                            Logo
                        </Link>



                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-2 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium '
                            }>
                            Home
                        </NavLink>



                        <NavLink
                            to={'/shop'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-2 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium '
                            }
                        >Shop</NavLink>

                        {/* Badge */}


                        <NavLink to={'/cart'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 rounded-md px-3 py-2 text-sm font-medium'
                                    : 'hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium '
                            }>
                            Cart
                            {carts.length > 0
                                && (<span
                                    className='absolute top-0
                                 bg-red-500 rounded-full px-2'>
                                    {carts.length}
                                </span>)
                            }
                        </NavLink>



                    </div>

                    {
                        user
                        ?                    <div className='flex items-center gap-4'>
                        <button
                            onClick={toggleDropdown}
                            className='hover:bg-gray-200 px-2 py-3 rounded-md flex items-center gap-2'>
                            <img
                                className='w-8 h-8'
                                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-1810626-1536314.png?f=webp&w=256"
                            />
                            <ChevronDown />
                        </button>

                        {
                        isOpen && 
                        <div className='absolute top-16 bg-white shadow-md z-50'>
                            <Link 
                            to={'/user/history'}
                            className='block px-4 py-2 hover:bg-gray-200'>
                            History
                            </Link>

                            <button 
                            onClick={()=>logout()}
                            className='block px-4 py-2 hover:bg-gray-200'>
                            Logout
                            </button>
                        </div>
                    }
                    </div>
                        :<div className='flex items-center gap-4'>
                        <NavLink to={'/register'}
                        className= {({isActive})=>
                            isActive
                        ?'bg-gray-200 rounded-md px-3 py-2 text-sm font-medium'
                        :'hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium '
                        }
                        >
                        Register
                        </NavLink>

                        <NavLink to={'/login'}
                        className= {({isActive})=>
                            isActive
                        ?'bg-gray-200 rounded-md px-3 py-2 text-sm font-medium'
                        :'hover:bg-gray-200 rounded-md px-3 py-2 text-sm font-medium '
                        }
                        >
                        Login
                        </NavLink>
                    </div>
                    }



                    
                </div>

            </div>
        </nav>
    )
}

export default MainNav