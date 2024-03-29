'use client'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/component/Navbar'
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import { Space_Grotesk } from 'next/font/google'
import ContextProvider from '@/utils/contextProvider.js'
import { useState } from 'react'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: 'localhost',
    cookieSecure: 'false',
})

export default function RootLayout({ children }) {
    return (
        <html className="no-scrollbar" lang="en">
            <AuthProvider store={store}>
                <ContextProvider>
                    <body
                        className={`${spaceGrotesk.className} no-scrollbar text-slate-50 w-full h-[100vh] bg-hero bg-cover bg-fill`}
                    >
                        <div className="max-w-[1320px] h-full mx-auto relative flex flex-col">
                            <Toaster
                                toastOptions={{
                                    style: {
                                        border: '1px gray solid',
                                        color: '#FFF',
                                        background: '#000',
                                    },
                                }}
                            />
                            <Navbar />
                            <main className="no-scrollbar grow flex overflow-auto">
                                {children}
                            </main>
                        </div>
                    </body>
                </ContextProvider>
            </AuthProvider>
        </html>
    )
}
