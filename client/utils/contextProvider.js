import Context from './context.js'
import { useState } from 'react'

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    return (
        <Context.Provider value={{ userData, setUserData }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider
