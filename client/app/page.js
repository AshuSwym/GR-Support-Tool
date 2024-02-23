'use client'
import Context from '@/utils/context'
import { useContext } from 'react'
import { ViewMerchantConfig } from '@/component/ViewMerchantConfig'
import { ViewAppConfig } from '@/component/ViewAppConfig'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

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
        <main className="mt-[10vh] ">
            <div className="px-5 text-xl font-bold tracking-wider">
                Hey {user.name} 👋🏼{' '}
                {merchantDetails.shopName && (
                    <span>
                        , you're looking at{' '}
                        <span className="p-2 bg-slate-300 rounded-md text-gray-900">
                            {merchantDetails?.shopName}
                        </span>
                    </span>
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
