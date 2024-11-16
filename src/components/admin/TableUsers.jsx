//rafce
import React, { useState, useEffect } from 'react'
import { getListAllUsers } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { changeUserStatus, changeUserRole } from '../../api/admin'
import {toast} from 'react-toastify'

const TableUsers = () => {
    const token = useEcomStore((s) => s.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        //code
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handelChangeUserStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                console.log(res)
                handleGetUsers(token)
                toast.success('Update Status Success')
            })
            .catch((error) => {
                console.log(error)
            })
        }

        const handelChangeUserRole = (userId, userRole) => {
            // console.log(userId, userRole)
            const value = {
                id: userId,
                role: userRole
            }
            changeUserRole(token, value)
                .then((res) => {
                    console.log(res)
                    handleGetUsers(token)
                    toast.success('Update Role Success')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    
    console.log(users)
    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">วันที่แก้ไขล่าสุด</th> */}
                        <th scope="col">สิทธิ์</th>
                        <th scope="col">สถานะ</th>
                        <th scope="col">จัดการ</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                {/* <td>{item.updatedAt}</td> */}



                                <td>
                                    <select 
                                    onChange={(e)=>handelChangeUserRole(item.id,e.target.value)}
                                    value={item.role}>
                                        <option>user</option>
                                        <option>admin</option>
                                    </select>
                                </td>




                                <td>{item.enabled ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <button
                                        onClick={() => handelChangeUserStatus(item.id, item.enabled)}
                                        className='bg-yellow-400 rounded-md shadow-md p-1'>
                                        {item.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        )
                    }



                </tbody>
            </table>
        </div>
    )
}

export default TableUsers