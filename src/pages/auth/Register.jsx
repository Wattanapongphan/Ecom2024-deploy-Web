//rafce
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'
import { useNavigate } from 'react-router-dom';


const registerSchema = z.object({
  
  email: z.string().email({ message: 'Email ไม่ถูกต้อง !!!' }),
  password: z.string().min(8, { message: 'Pasword ต้องมากกว่า 8 ตัวอักษร' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password ไม่ตรงกัน',
  path: ['confirmPassword']
})

const Register = () => {
  //javascript
  const navigate = useNavigate()

  const [passwordScore, setPasswordpasswordScore] = useState(0)


  useEffect(() => {

  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }
  useEffect(() => {
    setPasswordpasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)

  const onSubmit = async (data) => {
    //   const passwordScore = zxcvbn(data.password).score
    //   if(passwordScore < 3) {
    //     toast.warning('Password ไม่ปลอดภัย')
    //     return
    //   }
    // console.log('ok to submit')
    // Send to back
    try {
      //code
      const res = await axios.post('https://ecom2024-deploy.vercel.app/api/register', data)
      toast.success(res.data)
      console.log(res.data)
    } catch (err) {
      //err
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  // const tam = Array.from(Array(5))
  // console.log(tam)
  console.log(passwordScore)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
      
      
      <div className='w-full shadow-md bg-white p-8 max-w-md'>
      <h1 className='text-2xl text-center my-4 font-bold'>
      Register
      </h1>


      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>


          <div>
        <input {...register('email')}  placeholder='Email' className={`border w-full px-3 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent
        ${errors.email && 'border-red-500'}` }
        />
        {errors.email &&
          <p className='text-red-500 text-sm'>
            {errors.email.message}
          </p>
        }
        </div>

       <div >
        <input {...register('password')} 
        type='password'
        placeholder='Password' className={`border w-full px-3 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent
        ${errors.password && 'border-red-500'}` }
        />
        {errors.password &&
          (<p className='text-red-500 text-sm'>
            {errors.password.message}
          </p>
          )}

        {
          watch().password?.length > 0 && 
          <div className='flex mt-2'>
            {
              Array.from(Array(5).keys()).map((item, index) => (
                <span className='w-1/5 px-1' key={index}>
                  <div className={`rounded-md h-2 ${passwordScore <= 2
                    ? 'bg-red-500'
                    : passwordScore < 4
                      ? 'bg-yellow-500'
                      : 'bg-green-500'}`}>
                  </div>
                </span>
              ))
            }
          </div>
        }
      </div>

        <div>
        <input {...register('confirmPassword')}
        type='password'
        placeholder='ConfirmPassword' className={`border w-full px-3 py-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent
        ${errors.confirmPassword && 'border-red-500'}` }
        />
        {errors.confirmPassword &&
          <p className='text-red-500 text-sm'>
            {errors.confirmPassword.message}
          </p>
        }
        </div>


        <button 
        className='bg-blue-500 rounded-md w-full text-white p-2 font-bold shadow-md
        hover:bg-blue-600
        '>
          Register
        </button>
        </div>
      </form>
      </div>

    </div>
  )
}

export default Register