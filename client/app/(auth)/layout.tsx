'use client'
import Meeting from '@/components/sections/Meeting'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div className='w-full h-full flex items-start justify-between px-14 py-10'>
                <div className="w-[40%] h-[80%]">
                    <Meeting />
                </div>

                <div className="w-[60%] flex justify-end h-full relative">
                    {children}
                </div>
        </div>
    )
}

export default layout