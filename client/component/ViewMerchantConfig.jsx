'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import SearchMerchant from './SearchMerchant'

export const ViewMerchantConfig = () => {
    const [isOpen, setIsOpen] = useState(false)

    const onClickHandler = () => {
        return setIsOpen(true)
    }

    return (
        <div onClick={onClickHandler} className="card">
            {isOpen && <SearchMerchant isOpen={isOpen} setIsOpen={setIsOpen} route={"/merchantConfig"}/>}
            <h1 className="text-xl text-slate-900">
                Explore Merchant Configurations
            </h1>
            <h2 className="text-slate-900">
                Access detailed configurations of all installed merchants on the
                gift registry platform.
            </h2>
        </div>
    )
}
