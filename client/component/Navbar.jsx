'use client'
import '../app/globals.css'
import { useRouter } from 'next/navigation'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useContext, useState } from 'react'
import Context from '@/utils/context.js'
import Link from 'next/link'
import SearchMerchant from './SearchMerchant'
import { SearchOutlined } from '@ant-design/icons'

const Navbar = () => {
    const router = useRouter()
    const signOut = useSignOut()
    const { userData, setUserData, isOpen, setIsOpen } = useContext(Context)
    const onClickLogin = () => {
        return router.push('/user/login')
    }
    const onClickLogout = () => {
        signOut()
        setUserData({})
        return router.push('/user/login')
    }

    return (
        <nav>
            {isOpen && <SearchMerchant isOpen={isOpen} setIsOpen={setIsOpen} />}
            <h1>
                <Link href={'/'}>GR Support</Link>
            </h1>
            {!userData?.name ? (
                <button className="button" onClick={onClickLogin}>
                    Login
                </button>
            ) : (
                <div className="flex gap-2">
                    <SearchOutlined
                        style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                        className="hover:bg-gray-300 button"
                        onClick={() => setIsOpen(true)}
                    />
                    <button className="button" onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
