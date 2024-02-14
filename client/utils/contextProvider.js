import Head from 'next/head.js'
import Context from './context.js'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const ContextProvider = ({ children }) => {
    const authUser = useAuthUser()
    const [userData, setUserData] = useState({})
    const [merchantDetails, setMerchantDetails] = useState({
        pid: 'ibLF2FZ2MitrMskBHIwtRa22Dg1uZx9VGXtlfiKeZRQ=',
        token: '5ITlL7GGYdaYIE+NaY+FnItbSgAIbk0Ozjfaf0ehYrY=',
        storeName: '',
        storeUrl: '',
    })

    console.log(merchantDetails);

    useEffect(() => {
        setUserData(authUser)
    }, [authUser])

    return (
        <Context.Provider
            value={{
                userData,
                setUserData,
                merchantDetails,
                setMerchantDetails,
            }}
        >
            <Head> User Login</Head>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
