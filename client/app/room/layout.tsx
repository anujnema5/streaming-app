import ReduxProvider from '@/context/ReduxProvider'
import SocketProviders from '@/context/SocketProviders'
import React from 'react'

const layout = ({ children }) => {
    return (
        <ReduxProvider>
            <SocketProviders>
                <div className='w-full h-full absolute left-0 top-0 bg-[#1b1a1d]'>
                    {children}
                </div>
            </SocketProviders>
        </ReduxProvider>
    )
}

export default layout