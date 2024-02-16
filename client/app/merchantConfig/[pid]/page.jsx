'use client'
import Spinner from '@/component/Spinner'
import Context from '@/utils/context'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

import { JetBrains_Mono } from 'next/font/google'
const jetBrains_Mono = JetBrains_Mono({ subsets: ['latin'] })

const MerchantConfig = ({ params }) => {
    const { merchantDetails } = useContext(Context)
    const [mercantConfig, setMerchantConfig] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getMerchantConfig = async () => {
            try {
                const response = await axios.get(
                    `https://admin-api.swymregistry.com/platform/merchant/?pid=${params.pid}`,
                    {
                        headers: {
                            SWYM_MERCHANT_API_KEY: merchantDetails.token,
                        },
                    }
                )
                setMerchantConfig(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching merchant config:', error)
                setLoading(false)
            }
        }
        merchantDetails.token && getMerchantConfig()
    }, [params.pid, merchantDetails.token])

    return (
        <div className="pt-[10vh] p-5 h-[100vh] w-full">
            <div className="h-full">
                {loading ? (
                    <div className="h-full flex flex-col justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={`no-scrollbar border-2 border-gray-500 backdrop-blur-lg p-4 text-sm h-full overflow-scroll rounded-md`}
                    >
                        <JsonView
                            className={`${jetBrains_Mono.className} no-scrollbar text-[1rem] overflow-auto`}
                            src={mercantConfig}
                            theme="atom"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MerchantConfig
