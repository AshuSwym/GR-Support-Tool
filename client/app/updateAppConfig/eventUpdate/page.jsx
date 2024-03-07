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
const ModifyConfig = () => {
    const { merchantDetails } = useContext(Context)
    const [appConfig, setAppConfig] = useState([])
    const [loading, setLoading] = useState(true)
    const [featuresEnabled, setFeaturesEnabled] = useState({})
    const [isChanged, setIsChanged] = useState(false)
    const [eventTypes, setEventTypes] = useState([])

    const authHeader = useAuthHeader()
    const router = useRouter()

    // Change Handlers

    const onChangeEventTypeHandler = (index, value) => {
        const newArray = [...eventTypes]
        newArray[index] = value
        setEventTypes(newArray)
    }

    const onDeleteEventTypeHandler = (index) => {
        const newArray = eventTypes.filter((_, i) => i !== index)
        setEventTypes(newArray)
    }

    const onAddEventTypeHandler = () => {
        setEventTypes([...eventTypes, ''])
    }

    const onSaveHandler = async () => {
        setLoading(true)
        try {
            const body = {
                ...merchantDetails,
                payload: {
                    eventTypes: eventTypes.filter((value) => !(value === '')),
                    featuresEnabled: {
                        ...featuresEnabled,
                        discountFeature: featuresEnabled?.cartCheckout
                            ? {
                                  title: featuresEnabled?.discountFeature.title,
                                  value: featuresEnabled?.discountFeature?.value || 0,
                                  valueType: 'PERCENTAGE',
                              }
                            : {
                                  title: featuresEnabled?.discountFeature.title,
                              },
                    },
                },
            }
            const response = await axios.post(`/edit/editAppConfig`, body, {
                headers: {
                    Authorization: authHeader,
                },
            })
            setAppConfig(response.data)
            setEventTypes(response.data.eventTypes)
            setFeaturesEnabled(response.data.featuresEnabled)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching merchant config:', error)
            setAppConfig(error.message)
            toast.error(error.message)
            setLoading(false)
        }
    }

    const onCheckoutTypeToggle = (value) => {
        setFeaturesEnabled((prev) => {
            return {
                ...prev,
                cartCheckout: value === 'cart' ? true : false,
            }
        })
    }
    const setCheckoutEmailType = (e) => {
        setFeaturesEnabled((prev) => {
            return {
                ...prev,
                checkoutEmailType: e.target.value,
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
                setEventTypes(response.data.eventTypes)
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
        const newAppconfigEventTypes = JSON.stringify(
            appConfig?.eventTypes?.slice().sort()
        )
        const newEventTypes = JSON.stringify(eventTypes?.slice().sort())
        let isFeaturesEnabledChanged = false
        if (
            appConfig?.featuresEnabled?.cartCheckout ===
                featuresEnabled?.cartCheckout &&
            appConfig?.featuresEnabled?.checkoutEmailType ===
                featuresEnabled?.checkoutEmailType
        )
            isFeaturesEnabledChanged = true

        setIsChanged(
            newAppconfigEventTypes === newEventTypes && isFeaturesEnabledChanged
        )
    }, [eventTypes, featuresEnabled])

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
                            <div className="update-tiles duration-500">
                                <div className="flex justify-between sm:mx-auto sm:min-w-[400px] place-content-center px-3 py-2">
                                    <h1 className="text-base sm:text-lg flex flex-col justify-center">
                                        Events
                                    </h1>{' '}
                                    <PlusOutlined
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '1.2rem',
                                            background: 'green',
                                            borderRadius: '4px',
                                            padding: '10px',
                                        }}
                                        onClick={onAddEventTypeHandler}
                                    />
                                </div>

                                <div className="flex flex-col items-center text-center gap-2">
                                    {eventTypes?.map((event, index) => (
                                        <div
                                            key={index}
                                            className="input-container p-3"
                                        >
                                            <div className="">
                                                <input
                                                    type="text"
                                                    className="form-input h-full"
                                                    placeholder="Event Type"
                                                    value={event}
                                                    onChange={(e) =>
                                                        onChangeEventTypeHandler(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <DeleteOutlined
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    fontSize: '1.2rem',
                                                    background: '#e65c5c',
                                                    borderRadius: '4px',
                                                    padding: '10px',
                                                }}
                                                onClick={() =>
                                                    onDeleteEventTypeHandler(
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="update-tiles">
                                <h1 className="text-base sm:text-lg flex flex-col justify-center">
                                    Checkout
                                </h1>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="flex justify-between w-full sm:w-fit sm:min-w-[400px]">
                                        Type
                                        <div className="flex border-2 text-sm sm:text-base rounded-md p-1 overflow-clip">
                                            <div
                                                className={`rounded-sm duration-500 cursor-pointer px-3 ${featuresEnabled.cartCheckout ? '' : 'bg-gray-300 text-gray-800'}`}
                                                onClick={() =>
                                                    onCheckoutTypeToggle(
                                                        'draft'
                                                    )
                                                }
                                            >
                                                Draft
                                            </div>
                                            <div
                                                className={`rounded-sm duration-500 cursor-pointer px-3 ${featuresEnabled.cartCheckout ? 'bg-gray-300 text-gray-800' : ''}`}
                                                onClick={() =>
                                                    onCheckoutTypeToggle('cart')
                                                }
                                            >
                                                Cart
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full sm:w-fit sm:min-w-[400px]">
                                        Email Type
                                        <select
                                            className="text-inherit px-3 border-2 rounded-md bg-transparent"
                                            value={
                                                featuresEnabled.checkoutEmailType
                                            }
                                            onChange={setCheckoutEmailType}
                                        >
                                            <option value={''}>Select</option>
                                            <option value={'gifterEmail'}>
                                                Gifter Email
                                            </option>
                                            <option value={'noEmail'}>
                                                No Email
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModifyConfig

{
    /* <div className={`update-tiles`}>
    <h1>Address Masking</h1>
    <div className="overflow-auto">
        <JsonView
            className="text-sm sm:text-base"
            src={featuresEnabled?.addressMasking}
        />
    </div>
</div>
<div className={`update-tiles`}>
    <h1>Discount Features</h1>
    <div className="overflow-auto">
        <JsonView
            className="text-sm sm:text-base"
            src={featuresEnabled?.discountFeature}
        />
    </div>
</div>
<div className="w-full flex flex-col gap-2">
    <div className="update-tiles">
        <h1>Disable Checkout</h1>
        {
            featuresEnabled?.disableCheckoutOnInventoryLapse
        }
    </div>
    <div className="update-tiles">
        <h1>Vintage Toggle Metafield</h1>
        {featuresEnabled?.vintageToggleMetafieldId}
    </div>
</div> */
}
