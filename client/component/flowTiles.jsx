'use client'
import Context from '@/utils/context'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
export const FlowTiles = ({ heading, description, directTo }) => {
    const { setIsOpen, merchantDetails } = useContext(Context)
    const router = useRouter()
    const onClickHandler = () => {
        if (!merchantDetails?.pid) return setIsOpen(true)
        else return router.push(directTo)
    }

    return (
        <div onClick={onClickHandler} className="card">
            <h1 className="text-xl text-slate-900">{heading}</h1>
            <h2 className="text-slate-900">{description}</h2>
        </div>
    )
}
