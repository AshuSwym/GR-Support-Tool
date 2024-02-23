'use client'
import Head from 'next/head.js'
import Context from './context.js'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const ContextProvider = ({ children }) => {
    const authUser = useAuthUser()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const [merchantDetails, setMerchantDetails] = useState({
        pid: '',
        token: '',
        shopDomain: '',
        shopName: '',
    })

    useEffect(() => {
        setUserData(authUser)
        if (authUser) {
            const merchantDetailsStorage =
                window.localStorage.getItem('merchantDetails')
            merchantDetails &&
                setMerchantDetails(JSON.parse(merchantDetailsStorage))
        }
        setTimeout(() => setIsLoading(false), 100)
    }, [authUser])

    return (
        <Context.Provider
            value={{
                userData,
                setUserData,
                merchantDetails,
                setMerchantDetails,
                isLoading,
                isOpen,
                setIsOpen
            }}
        >
            <Head> User Login</Head>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
