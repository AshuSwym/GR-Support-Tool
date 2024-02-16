'use client'
import Context from '@/utils/context'
import { useContext } from 'react'
import Link from 'next/link'
import { ViewMerchantConfig } from '@/component/ViewMerchantConfig'
import MerchantConfig from './merchantConfig/[pid]/page'

export default function Home() {
    const { userData, isLoading } = useContext(Context)
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
        <main className="mt-[10vh] p-5">
            <ViewMerchantConfig />
        </main>
    )

    return !isLoading && toRender
}
