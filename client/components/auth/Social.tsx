'use client'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import 'dotenv/config';

const Social = () => {

    return (
        <div className='flex w-full items-center gap-x-2'>
            <Button
                onClick={() => {
                    window.open(`${'http://13.201.54.89/api'}/user/google`, "_self");
                }} size={'lg'} className='w-full' variant={'outline'}>
                <FcGoogle />
            </Button>
        </div>
    )
}

export default Social