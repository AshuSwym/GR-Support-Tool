'use client'
import Context from '@/utils/context'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
export const ViewMerchantConfig = () => {
    const { setIsOpen, merchantDetails } = useContext(Context)
    const router = useRouter();
    const onClickHandler = () => {
        if(!merchantDetails?.pid)
            return setIsOpen(true)
        else
            return router.push('/merchantConfig');
    }

    return (
        <div onClick={onClickHandler} className="card">
            <h1 className="text-xl text-slate-900">
                Merchant Configurations
            </h1>
            <h2 className="text-slate-900">
                Access detailed configurations of all installed merchants on the
                gift registry platform.
            </h2>
        </div>
    )
}
