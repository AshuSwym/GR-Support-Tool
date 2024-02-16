'use client'
import Head from 'next/head.js'
import Context from './context.js'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { decrypter } from './crypto.js'

const ContextProvider = ({ children, merchantDetailsStorage }) => {
    const authUser = useAuthUser()
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [merchantDetails, setMerchantDetails] = useState({
        pid: '',
        token: '',
        storeName: '',
        storeUrl: '',
    })

    useEffect(() => {
        setUserData(authUser)
        if (authUser) {
            const merchantDetailsStorage =
                window.localStorage.getItem('merchantDetails')
            merchantDetails &&
                setMerchantDetails(
                    JSON.parse(decrypter(merchantDetailsStorage))
                )
        }
        setTimeout(() => setIsLoading(false), 1000)
    }, [authUser])

    return (
        <Context.Provider
            value={{
                userData,
                setUserData,
                merchantDetails,
                setMerchantDetails,
                isLoading,
            }}
        >
            <Head> User Login</Head>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
