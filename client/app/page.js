'use client'
import Context from '@/utils/context'
import { useContext } from 'react'
import { ViewMerchantConfig } from '@/component/ViewMerchantConfig'
import { ViewAppConfig } from '@/component/ViewAppConfig'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Link from 'next/link'

export default function Home({ isOpen, setIsOpen }) {
    const { userData, isLoading, merchantDetails } = useContext(Context)
    const user = useAuthUser()
    const toRender = !userData?.name ? (
        <main className="my-auto mx-auto text-center p-8 max-w-[600px]">
            <h1 className="text-4xl tracking-tight leading-[3rem] text-slate-50">
                GiftRegistry Support Tool
            </h1>
            <p className="text-slate-300 tracking-wide">
                Efficiently manage and support gift registry services with our
                comprehensive tool. Log in to access merchant configs, update
                CSS, generate charges, monitor metrics, update registries, and
                track error logs.
            </p>
        </main>
    ) : (
        <main className="mt-[10vh] w-full">
            <div className="px-5 flex flex-wrap justify-between items-center gap-3 text-xl font-bold tracking-wider">
                Hey {user.name} 👋🏼{' '}
                {merchantDetails.shopName && (
                    <Link target="_blank" href={`https://${merchantDetails?.shopDomain}`} className="p-2 border-2 border-blue-400 text-lg rounded-md text-gray-100">
                        {merchantDetails?.shopName}
                    </Link>
                )}
            </div>
            <div className="flex flex-wrap gap-2 p-5 place-content-start">
                <ViewMerchantConfig isOpen={isOpen} setIsOpen={setIsOpen} />
                <ViewAppConfig isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </main>
    )

    return !isLoading && toRender
}
