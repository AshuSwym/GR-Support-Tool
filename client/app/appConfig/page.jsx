'use client'
import Spinner from '@/component/Spinner'
import Context from '@/utils/context'
import axios from '../../utils/axios'
import { useContext, useEffect, useState } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { capitalize } from '@/utils/utilFunctions'
import { JetBrains_Mono } from 'next/font/google'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import CopyToClipboard from '@/component/ClickToCopy'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const jetBrains_Mono = JetBrains_Mono({ subsets: ['latin'] })

const AppConfig = () => {
    const { merchantDetails } = useContext(Context)
    const [appConfig, setAppConfig] = useState([])
    const [loading, setLoading] = useState(true)
    const authHeader = useAuthHeader()
    const router = useRouter()

    useEffect(() => {
        if (!authHeader) return router.push('/user/login')
        setLoading(true)
        const getAppConfig = async () => {
            try {
                const response = await axios.post(
                    `/getData/fetchAppData`,
                    merchantDetails,
                    {
                        headers: {
                            Authorization: authHeader,
                        },
                    }
                )
                setAppConfig(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching merchant config:', error)
                setAppConfig(error.message)
                toast.error(error.message)
                setLoading(false)
            }
        }
        merchantDetails?.appAccessToken && getAppConfig()
    }, [merchantDetails?.pid, merchantDetails?.appAccessToken])

    return (
        <div className="h-full w-full">
            <div className="h-full ">
                {loading || !appConfig?.[0]?.pid ? (
                    loading || appConfig?.[0] ? (
                        <div className="h-full flex flex-col justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="h-full flex justify-center ">
                            <div className="border-2 border-slate-500 max-w-[400px] h-fit my-auto p-8 rounded-md text-base">
                                Merchant haven't configured Gift Registry
                            </div>
                        </div>
                    )
                ) : (
                    <div
                        className={`no-scrollbar flex flex-wrap place-content-start items-stretch gap-2 p-4 text-sm h-full overflow-scroll`}
                    >
                        <CopyToClipboard text={appConfig?.[0].pid}>
                            <div className="data-tiles">
                                <h1>PID</h1>
                                {appConfig?.[0]?.pid}
                            </div>
                        </CopyToClipboard>
                        <CopyToClipboard text={appConfig?.[0].shopDomain}>
                            <div className="data-tiles">
                                <h1>Shop Domain</h1>
                                {appConfig?.[0]?.shopDomain}
                            </div>
                        </CopyToClipboard>
                        <div className="data-tiles">
                            <h1>Events</h1>
                            <div className="flex flex-wrap gap-2">
                                {appConfig?.[0]?.eventTypes.map((event) => (
                                    <div
                                        key={event}
                                        className="px-2 bg-slate-300 rounded-md text-gray-900"
                                    >
                                        {capitalize(event)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className={`json-tiles ${jetBrains_Mono.className}`}
                        >
                            <h1>Address Masking</h1>
                            <div className="overflow-auto">
                                <JsonView
                                    className="text-sm sm:text-base"
                                    src={
                                        appConfig?.[0]?.featuresEnabled
                                            ?.addressMasking
                                    }
                                />
                            </div>
                        </div>
                        <div
                            className={`json-tiles ${jetBrains_Mono.className}`}
                        >
                            <h1>Discount Features</h1>
                            <div className="overflow-auto">
                                <JsonView
                                    className="text-sm sm:text-base"
                                    src={
                                        appConfig?.[0]?.featuresEnabled
                                            ?.discountFeature
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full sm:w-fit flex flex-col gap-2">
                            <CopyToClipboard
                                text={
                                    appConfig?.[0]?.featuresEnabled
                                        ?.disableCheckoutOnInventoryLapse
                                }
                            >
                                <div className="data-tiles">
                                    <h1>Disable Checkout</h1>
                                    {
                                        appConfig?.[0]?.featuresEnabled
                                            ?.disableCheckoutOnInventoryLapse
                                    }
                                </div>
                            </CopyToClipboard>
                            <CopyToClipboard
                                text={
                                    appConfig?.[0]?.featuresEnabled
                                        ?.vintageToggleMetafieldId
                                }
                            >
                                <div className="data-tiles">
                                    <h1>Vintage Toggle Metafield</h1>
                                    {
                                        appConfig?.[0]?.featuresEnabled
                                            ?.vintageToggleMetafieldId
                                    }
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AppConfig
