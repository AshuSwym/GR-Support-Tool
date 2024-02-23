'use client'

import { Dialog, Transition } from '@headlessui/react'
import axios from '../utils/axios'
import Link from 'next/link'
import { Fragment, useContext, useState } from 'react'
import Spinner from './Spinner.jsx'
import { SearchOutlined } from '@ant-design/icons'
import Context from '@/utils/context.js'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const SearchMerchant = ({ isOpen, setIsOpen }) => {
    const { merchantDetails, setMerchantDetails } = useContext(Context)
    const authHeader = useAuthHeader()
    const [searchString, setSearchString] = useState('')

    const setDataToLocalstorage = (merchantDetail) => {
        setMerchantDetails(merchantDetail);
        window.localStorage.clear();
        window.localStorage.setItem('merchantDetails', JSON.stringify(merchantDetail))
    }

    const [isLoading, setIsLoading] = useState(false)

    const closeModal = () => setIsOpen(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await axios
                .post(
                    `/api/getTokenFromShopDomain`,
                    {
                        shopDomain: searchString,
                    },
                    {
                        headers: {
                            Authorization: authHeader,
                        },
                    }
                )
                .then((res) => {
                    setMerchantDetails(res.data)
                    console.log(res.data)
                })
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="dialog-container"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        />

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="dialog-content z-10">
                                <form
                                    className="dialog-input_container max-h-[55px] overflow-clip"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="text"
                                        className="dialog-input shrink"
                                        placeholder="Enter Merchant's PID"
                                        value={searchString}
                                        onChange={(e) =>
                                            setSearchString(e.target.value)
                                        }
                                    />
                                    <button type="button">
                                        <SearchOutlined
                                            style={{
                                                fontSize: '26px',
                                                color: '#fff',
                                            }}
                                        />
                                    </button>
                                </form>
                                <div className="no-scrollbar searchModal">
                                    {merchantDetails?.[0] ? (
                                        merchantDetails.map(
                                            (merchantDetail) => (
                                                <div
                                                    key={merchantDetail?.pid}
                                                    onClick={() =>
                                                        setTimeout(() => {
                                                            closeModal()
                                                            setDataToLocalstorage(
                                                                merchantDetail
                                                            )
                                                        }, 300)
                                                    }
                                                    className="dialog-btn flex max-h-[100px] flex-row px-2 gap-3 py-3 border-2 rounded-xl border-red-100"
                                                    replace
                                                >
                                                    <div className="flex justify-between flex-col px-1 truncate w-full">
                                                        <h4 className="text-md font-semibold text-clip">
                                                            {
                                                                merchantDetail?.shopName
                                                            }
                                                        </h4>
                                                        <div className="text-slate-500 capitalize text-sm">
                                                            {
                                                                merchantDetail?.shopDomain
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="text-center">
                                            <br />
                                            {isLoading ? (
                                                <Spinner />
                                            ) : (
                                                'No merchant found'
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default SearchMerchant
