'use client'
import '../app/globals.css'
import { useRouter } from 'next/navigation'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useContext } from 'react'
import Context from '@/utils/context.js'
import Link from 'next/link'

const Navbar = () => {
    const router = useRouter()
    const signOut = useSignOut()
    const { userData, setUserData } = useContext(Context)

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
            <h1><Link href={"/"}>GR Support Tool</Link></h1>
            {!userData?.name ? (
                <button className="button" onClick={onClickLogin}>
                    Login
                </button>
            ) : (
                <div>
                    <button className="button" onClick={onClickLogout}>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
