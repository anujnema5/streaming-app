'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { InputWithButton } from '../ui/InputWithButton'
import { genMeetingID } from '@/utils/helperFunctions'
import { useRouter } from 'next/navigation'

const Meeting = () => {
  const router = useRouter()

  const handleCreateMeeting = () => {
    router.push(`/room/`)
  }

  return (
    <div className='w-full h-full flex flex-col justify-end'>
      <div className="flex flex-col gap-6">
        <h3 className='text-4xl leading-[130%] font-medium text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam exercitationem porro quia impedit commodi molestias</h3>

        <p className='text-white/50 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti minus quasi nesciunt molestias, quis magni amet animi officiis voluptatibus ipsa, debitis distinctio!</p>

        <div className="flex flex-col gap-5 mt-5">
          <div className="flex items-center gap-5 mb-10">
            <h4 className='text-lg font-medium text-gray-200'>Create or join a room</h4>
            <DoubleArrowRightIcon />

            <Button className='bg-gray-300 hover:bg-zinc-800 shadow-xl hover:text-zinc-200 transition-el text-gray-800 rounded-full' onClick={handleCreateMeeting}>Join room</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meeting