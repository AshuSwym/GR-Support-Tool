'use client'
import React, { useState } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        adminPass: '',
        role: '',
    })

    const router = useRouter()

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
        	return toast.error("Enter a valid email");
        if (userData.email === "") return toast.error("Email required");
        if (userData.password === "") return toast.error("Password required");
        if (userData.password.length <= 8)
        	return toast.error("Password should be greater than 8 characters");

        // try {
        // 	setError("");
        // 	const res = await signIn("credentials", {
        // 		redirect: false,
        // 		email: userData.email,
        // 		password: userData.password
        // 	})

        // 	if (res?.error) return setError("User does not exits");
        // 	if (res?.ok) {
        // 		setError("");
        // 		return (router.back());
        // 	}
        // 	router.push("/profile/login");
        // } catch (error) {
        // 	if (error.response.status === 400) setError(error.response.data);
        // }
    }
    return (
        <div className="h-full mx-auto max-w-[350px] flex flex-col justify-center items-center text-white">
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4 px-4 py-6 rounded-md"
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
                    <LockOutlined
                        style={{ color: '#6b7280', fontSize: '1.2rem' }}
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Admin Password"
                        value={userData.adminPass}
                        onChange={onChangeAdminPass}
                    />
                </div>
                <select
                    className="input-container text-inherit bg-black p-3"
                    onChange={onChangeRole}
                >
                    <option value={''}>Select</option>
                    <option value={'Admin'}>Admin</option>
                    <option value={'Support'}>Support</option>
                    <option value={'Developer'}>Developer</option>
                </select>
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

export default Login
