//rafce
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  //javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log('user form zustand', user)


  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    //code
    // console.log(e.target.name,e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    //send to back
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
      toast.success("Login Success")
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>

      <div className='w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl text-center my-4 font-bold'>
          Login
        </h1>


        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>

            <input placeholder='Email' className='border w-full px-3 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent'
              onChange={handleOnChange}
              name='email'
              type='email'
            />

            <input 
          type='password'  
          placeholder='Password' className='border w-full px-3 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent'
              onChange={handleOnChange}
              name='password'
            />

            <button
              className='bg-blue-500 rounded-md w-full text-white p-2 font-bold shadow-md hover:bg-blue-600'>
              Login
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login