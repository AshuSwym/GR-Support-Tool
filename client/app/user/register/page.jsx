'use client'
import React, { useState } from 'react'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        adminPass: '',
        role: '',
    })

    const onChangeName = (event) => {
        setUserData((prev) => ({ ...prev, name: event.target.value }))
    }

    const onChangeEmail = (event) => {
        setUserData((prev) => ({ ...prev, email: event.target.value }))
    }

    const onChangePassword = (event) => {
        setUserData((prev) => ({ ...prev, password: event.target.value }))
    }

    const onChangeAdminPass = (event) => {
        setUserData((prev) => ({ ...prev, adminPass: event.target.value }))
    }

    const onChangeRole = (event) => {
        setUserData((prev) => ({ ...prev, role: event.target.value }))
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i
        return emailRegex.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(userData)
        if (!isValidEmail(userData.email))
            return toast.error('Enter a valid email')
        if (userData.email === '') return toast.error('Email required')
        if (userData.password === '') return toast.error('Password required')
        if (userData.password.length <= 8)
            return toast.error('Password should be greater than 8 characters')
        if (userData.name === '') return toast.error('Nickname required')
        if (userData.adminPass === '')
            return toast.error('Admin Pin required to create user')
        if (userData.role === '')
            return toast.error('Select a role for the User')

        try {
            await axios
                .post('http://localhost:5000/user/register', {
                    ...userData,
                })
                .then((response) => {
                    if (response.status === 200) {
                        return router.push('/', undefined, { shallow: false })
                    }
                })
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className="h-full mx-auto max-w-[350px] flex flex-col justify-center items-center text-white">
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col min-w-[350px] gap-3 px-4 py-6 rounded-md"
            >
                <div className="input-container p-3">
                    <MailOutlined
                        style={{ color: '#6b7280', fontSize: '1.2rem' }}
                    />
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={userData.email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="input-container p-3">
                        <LockOutlined
                            style={{ color: '#6b7280', fontSize: '1.2rem' }}
                        />
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            value={userData.password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="input-container p-3">
                        <UserOutlined
                            style={{ color: '#6b7280', fontSize: '1.2rem' }}
                        />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Nickname"
                            value={userData.name}
                            onChange={onChangeName}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="input-container p-3">
                        <LockOutlined
                            style={{ color: '#6b7280', fontSize: '1.2rem' }}
                        />
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Admin Pin"
                            value={userData.adminPass}
                            onChange={onChangeAdminPass}
                        />
                    </div>
                    <select
                        className="input-container text-inherit p-3 bg-transparent"
                        onChange={onChangeRole}
                    >
                        <option value={''}>Select</option>
                        <option value={'Admin'}>Admin</option>
                        <option value={'Support'}>Support</option>
                        <option value={'Developer'}>Developer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="button tracking-wider flex justify-center text-white w-full hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-lg transition mx-auto"
                >
                    Register
                </button>
                <div className="px-2 text-sm text-gray-500">
                    Already a member?{' '}
                    <Link href={'/user/login'} className="text-[#7b2cbf]">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register