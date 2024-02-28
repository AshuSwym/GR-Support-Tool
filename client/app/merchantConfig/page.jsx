'use client'
import Spinner from '@/component/Spinner'
import Context from '@/utils/context'
import axios from '../../utils/axios'
import { useContext, useEffect, useState } from 'react'
import 'react18-json-view/src/style.css'
import { getDate, capitalize } from '@/utils/utilFunctions'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import CopyToClipboard from '@/component/ClickToCopy'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const MerchantConfig = () => {
    const { merchantDetails } = useContext(Context)
    const [merchantConfig, setMerchantConfig] = useState()
    const [loading, setLoading] = useState(true)
    const authHeader = useAuthHeader()
    const router = useRouter()

    useEffect(() => {
        if (!authHeader) return router.push('/user/login')
        setLoading(true)
        const getMerchantConfig = async () => {
            try {
                const response = await axios.post(
                    `/getData/fetchMerchantData`,
                    merchantDetails,
                    {
                        headers: {
                            Authorization: authHeader,
                        },
                    }
                )
                setMerchantConfig(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching merchant config:', error)
                setMerchantConfig(error.message)
                toast.error(error.message)
                setLoading(false)
            }
        }
        merchantDetails?.appAccessToken && getMerchantConfig()
    }, [merchantDetails?.pid, merchantDetails?.appAccessToken])

    return (
        <div className="h-full w-full">
            <div className="h-full">
                {loading || !merchantConfig?.[0].pid ? (
                    <div className="h-full flex flex-col justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={`no-scrollbar flex flex-wrap place-content-start gap-2 p-4 text-sm h-full overflow-scroll`}
                    >
                        <CopyToClipboard text={merchantConfig?.[0].pid}>
                            <div className="data-tiles">
                                <h1>PID</h1>
                                {merchantConfig?.[0].pid}
                            </div>
                        </CopyToClipboard>
                        <div className="data-tiles">
                            <h1>Plan</h1>
                            {capitalize(merchantConfig?.[0].plan)}
                        </div>
                        <div className="data-tiles">
                            <h1>Platform</h1>
                            {capitalize(merchantConfig?.[0].platformName)}
                        </div>
                        <CopyToClipboard text={merchantConfig?.[0].shopDomain}>
                            <div className="data-tiles">
                                <h1>Shop Domain</h1>
                                {merchantConfig?.[0].shopDomain}
                            </div>
                        </CopyToClipboard>
                        <div className="data-tiles">
                            <h1>Status</h1>
                            {capitalize(merchantConfig?.[0].installStatus)}
                        </div>
                        <div className="data-tiles">
                            <h1>Live status</h1>
                            {capitalize(merchantConfig?.[0].liveStatus)}
                        </div>
                        <div className="data-tiles">
                            <h1>Shop Name</h1>
                            {merchantConfig?.[0].shopName}
                        </div>
                        <div className="data-tiles">
                            <h1>Shop owner</h1>
                            {merchantConfig?.[0].shopOwner}
                        </div>
                        <CopyToClipboard text={merchantConfig?.[0].email}>
                            <div className="data-tiles">
                                <h1>Email</h1>
                                {merchantConfig?.[0].email}
                            </div>
                        </CopyToClipboard>
                        <div className="data-tiles">
                            <h1>Country</h1>
                            {merchantConfig?.[0].country}
                        </div>
                        <div className="data-tiles">
                            <h1>Installed Time</h1>
                            {getDate(merchantConfig?.[0].installedAt)}
                        </div>
                        <div className="data-tiles">
                            <h1>Platform Plan</h1>
                            {merchantConfig?.[0].platformPlanName ||
                                'Not avilable'}
                        </div>
                        <CopyToClipboard
                            text={merchantConfig?.[0].adminApiAccessToken}
                        >
                            <div className="data-tiles">
                                <h1>Admin API Access Token</h1>
                                Click to Copy
                            </div>
                        </CopyToClipboard>
                        <CopyToClipboard
                            text={merchantConfig?.[0].appAccessToken}
                        >
                            <div className="data-tiles">
                                <h1>App Access Token</h1>
                                Click to Copy
                            </div>
                        </CopyToClipboard>
                        <CopyToClipboard
                            text={merchantConfig?.[0].storefrontApiAccessToken}
                        >
                            <div className="data-tiles">
                                <h1>Storefront API Access Token</h1>
                                Click to Copy
                            </div>
                        </CopyToClipboard>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MerchantConfig
