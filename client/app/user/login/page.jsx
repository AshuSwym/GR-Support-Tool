'use client'
import React, { useState, useContext } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from '../../../utils/axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import Context from '@/utils/context'

const Login = () => {
    const [userEntries, setUserEntries] = useState({ email: '', password: '' })
    const { setUserData } = useContext(Context)

    const signIn = useSignIn()
    const router = useRouter()

    const onChangeEmail = (event) => {
        setUserEntries((prev) => ({ ...prev, email: event.target.value }))
    }

    const onChangePassword = (event) => {
        setUserEntries((prev) => ({ ...prev, password: event.target.value }))
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i
        return emailRegex.test(email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isValidEmail(userEntries.email))
            return toast.error('Enter a valid email')
        if (userEntries.email === '') return toast.error('Email required')
        if (userEntries.password === '') return toast.error('Password required')
        if (userEntries.password.length <= 8)
            return toast.error('Password should be greater than 8 characters')

        try {
            await axios
                .post('/user/login', {
                    ...userEntries,
                })
                .then((response) => {
                    if (response.status === 200) {
                        signIn({
                            auth: {
                                token: response.data.token,
                                type: 'Bearer',
                            },
                            userState: {
                                name: response.data.name,
                                role: response.data.role,
                                email: response.data.email,
                            },
                        })
                        setUserData({
                            name: response.data.name,
                            role: response.data.role,
                            email: response.data.email,
                        })
                    }
                    return router.push('/', undefined, { shallow: false })
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
                className="w-full flex flex-col gap-3 min-w-[350px] px-4 py-6 rounded-md"
            >
                <div className="input-container p-3">
                    <MailOutlined
                        style={{ color: '#6b7280', fontSize: '1.2rem' }}
                    />
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={userEntries.email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="input-container p-3">
                    <LockOutlined
                        style={{ color: '#6b7280', fontSize: '1.2rem' }}
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        value={userEntries.password}
                        onChange={onChangePassword}
                    />
                </div>
                <button
                    type="submit"
                    className="button tracking-wider flex justify-center text-white w-full hover:bg-gray-500 px-6 py-2 text-sm font-semibold rounded-lg transition mx-auto"
                >
                    Login
                </button>
                <div className="px-2 text-sm text-gray-500">
                    Not a member ?{' '}
                    <Link href={'/user/register'} className="text-[#7b2cbf]">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
