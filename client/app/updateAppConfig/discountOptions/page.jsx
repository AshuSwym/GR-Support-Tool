'use client'
import Spinner from '@/component/Spinner'
import Context from '@/utils/context'
import axios from '../../../utils/axios'
import { useContext, useEffect, useState } from 'react'
import 'react18-json-view/src/style.css'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
const DiscountOptions = () => {
    const { merchantDetails } = useContext(Context)
    const [appConfig, setAppConfig] = useState([])
    const [loading, setLoading] = useState(true)
    const [featuresEnabled, setFeaturesEnabled] = useState({})
    const [isChanged, setIsChanged] = useState(false)

    const authHeader = useAuthHeader()
    const router = useRouter()

    // Change Handlers

    const onSaveHandler = async () => {
        setLoading(true)
        try {
            const body = {
                ...merchantDetails,
                payload: {
                    featuresEnabled: featuresEnabled,
                },
            }
            const response = await axios.post(`/edit/editAppConfig`, body, {
                headers: {
                    Authorization: authHeader,
                },
            })
            setAppConfig(response.data)
            setFeaturesEnabled(response.data.featuresEnabled)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching merchant config:', error)
            setAppConfig(error.message)
            toast.error(error.message)
            setLoading(false)
        }
    }

    const onChangeHandler = (e) => {
        setFeaturesEnabled((prev) => {
            return {
                ...prev,
                discountFeature: {
                    ...prev.discountFeature,
                    [e.target.name]: e.target.value,
                },
            }
        })
    }

    useEffect(() => {
        if (!authHeader) return router.push('/user/login')
        setLoading(true)
        const getAppConfig = async () => {
            try {
                const response = await axios.post(
                    `/edit/getAppConfig`,
                    merchantDetails,
                    {
                        headers: {
                            Authorization: authHeader,
                        },
                    }
                )
                setAppConfig(response.data)
                setFeaturesEnabled(response.data.featuresEnabled)
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

    useEffect(() => {
        let isFeaturesEnabledChanged = false
        if (
            appConfig?.featuresEnabled?.discountFeature?.value ===
                featuresEnabled?.discountFeature?.value &&
            appConfig?.featuresEnabled?.discountFeature?.valueType ===
                featuresEnabled?.discountFeature?.valueType &&
            appConfig?.featuresEnabled?.discountFeature?.title ===
                featuresEnabled?.discountFeature?.title
        )
            isFeaturesEnabledChanged = true
        setIsChanged(isFeaturesEnabledChanged)
    }, [featuresEnabled])

    return (
        <div className="h-full w-full">
            <div className="h-full ">
                {loading || !appConfig?.pid ? (
                    loading || appConfig ? (
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
                        className={`no-scrollbar text-center p-4 text-sm h-full overflow-scroll`}
                    >
                        <div className="flex flex-wrap flex-col place-content-start gap-2 w-full sm:w-fit mx-auto">
                            <div className="flex justify-between">
                                <h1 className="p-2">App Config</h1>
                                <button
                                    className={`border-slate-400 border-2 rounded-md px-5 py-2 ${!isChanged ? 'bg-gray-200 text-gray-900' : ''}`}
                                    onClick={onSaveHandler}
                                    disabled={isChanged}
                                >
                                    Save
                                </button>
                            </div>
                            <div className="update-tiles">
                                <h1>PID</h1>
                                {appConfig?.pid}
                            </div>
                            <div className="update-tiles">
                                <h1>Shop Domain</h1>
                                {appConfig?.shopDomain}
                            </div>
                            <div className="update-tiles">
                                <h1>Discount</h1>
                                {featuresEnabled?.cartCheckout ? (
                                    <div className='flex flex-col place-items-center gap-2'>
                                        <input
                                            type="number"
                                            className="bg-transparent border-2 p-2 text-base w-full max-w-[300px] rounded-md"
                                            placeholder="Value"
                                            name="value"
                                            pattern="[0-9]*"
                                            value={
                                                featuresEnabled?.discountFeature
                                                    ?.value
                                            }
                                            onChange={(e) =>
                                                setFeaturesEnabled((prev) => {
                                                    return {
                                                        ...prev,
                                                        discountFeature: {
                                                            ...prev.discountFeature,
                                                            value:
                                                                Number(e.target.value),
                                                        },
                                                    }
                                                })
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="bg-transparent border-2 p-2 text-base w-full max-w-[300px] rounded-md"
                                            placeholder="Title"
                                            name="title"
                                            value={
                                                featuresEnabled?.discountFeature
                                                    ?.title
                                            }
                                            onChange={onChangeHandler}
                                        />
                                        <select
                                            className="bg-transparent border-2 p-2 text-base w-full max-w-[300px] rounded-md"
                                            onChange={onChangeHandler}
                                            name="valueType"
                                            value={
                                                featuresEnabled?.discountFeature
                                                    ?.valueType
                                            }
                                        >
                                            <option value={''}>Select</option>
                                            <option value={'PERCENTAGE'}>
                                                Percentage
                                            </option>
                                        </select>
                                    </div>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            className="bg-transparent border-2 p-2 text-base w-full max-w-[300px] rounded-md"
                                            placeholder="Title"
                                            name="title"
                                            value={
                                                featuresEnabled?.discountFeature
                                                    ?.title
                                            }
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DiscountOptions
