'use client'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

const RoundedBackButton = () => {
  const router = useRouter();
  return (
    <button onClick={()=> router.back()} className='w-16 h-16 bg-[#2b2d2e] rounded-[50%] flex justify-center items-center'>
        <CaretLeftIcon className='w-7 h-7'/>
    </button>
  )
}

export default RoundedBackButton