'use client'
import Context from '@/utils/context'
import { useContext, useEffect } from 'react'
import { FlowTiles } from '@/component/flowTiles'
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
        <main className="no-scrollbar w-full h-full">
            <div className="px-5 flex flex-wrap justify-between items-center gap-3 text-xl font-bold tracking-wider">
                Hey {user.name} 👋🏼{' '}
                {merchantDetails?.shopName && (
                    <Link
                        target="_blank"
                        href={`https://${merchantDetails?.shopDomain}`}
                        className="p-2 border-2 border-blue-400 text-lg rounded-md text-gray-100"
                    >
                        {merchantDetails?.shopName}
                    </Link>
                )}
            </div>
            <div className="flex justify-center flex-wrap gap-2 p-5 place-content-start">
                <FlowTiles
                    heading={'Merchant Configurations'}
                    description={
                        'Access detailed configurations of all installed merchants on the gift registry platform.'
                    }
                    directTo={'/merchantConfig'}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <FlowTiles
                    heading={'App Configurations'}
                    description={
                        'Access detailed configurations of all installed merchants on the gift registry platform.'
                    }
                    directTo={'/appConfig'}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <FlowTiles
                    heading={'Event and Checkout options'}
                    description={
                        'Effortlessly modify and update event and checkout options to ensure seamless operation.'
                    }
                    directTo={'/updateAppConfig/eventUpdate'}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                <FlowTiles
                    heading={'Discount options'}
                    description={
                        'Add discount based on cart or draft checkout for merchant stores'
                    }
                    directTo={'/updateAppConfig/discountOptions'}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </div>
        </main>
    )

    return !isLoading && toRender
}
