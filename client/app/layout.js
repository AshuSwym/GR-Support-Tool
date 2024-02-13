'use client'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/component/Navbar'
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import { Space_Grotesk } from 'next/font/google'
import ContextProvider from '@/utils/contextProvider.js'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: 'localhost',
    cookieSecure: 'false',
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AuthProvider store={store}>
                <ContextProvider>
                    <body
                        className={`${spaceGrotesk.className} text-slate-50 max-w-[1320px] mx-auto flex flex-col h-[100vh]`}
                    >
                        <Toaster
                            toastOptions={{
                                style: {
                                    border: '1px gray solid',
                                    color: '#FFF',
                                    background: '#000',
                                },
                            }}
                        />
                        <Navbar className="" />
                        <main className="grow">{children}</main>
                    </body>
                </ContextProvider>
            </AuthProvider>
        </html>
    )
}
