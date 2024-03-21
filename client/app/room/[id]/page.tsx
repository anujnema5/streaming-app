'use client'
import Media from '@/components/meeting/Media'
import MeetingNav from '@/components/meeting/MeetingNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSocket } from '@/context/SocketProviders'
import { getUser } from '@/features/userSlice'
import { useMeetingEvents } from '@/hooks/MeetingEvents'
import peer from '@/services/peer'
import { RootState } from '@/store/store'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const user = getUser();
    const dispatch = useDispatch();
    const {myVideo} = useSocket()

    useEffect(() => {
        // Add any side effects or initialization code here
    }, []);

    return (
        <>
            <MeetingNav />
            <div className="meeting-body w-full h-[84%] px-5 pb-5">
                <div className="bg-primary w-full h-full rounded-3xl p-4 flex gap-5">
                    <div className='w-[72%] relative h-full bg-secondary rounded-3xl flex justify-center items-center'>
                        <div className="absolute top-5 left-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl">
                            <span>Host</span>
                        </div>
                        <div className="">
                            <div className='flex gap-4 items-center'>
                            <span>Remote User Connected let&apos;s start stream</span>
                                <Button onClick={() => { }}>Request streaming</Button>
                            </div>
                            <h3 className='text-xl font-medium'>Waiting for user to connect ...</h3>
                        </div>
                        <Media />
                    </div>

                    <div className="w-[28%] h-full flex flex-col gap-5 justify-center items-center">
                        <div className="h-[35%] w-full rounded-3xl bg-secondary ">
                            <div className="w-full flex items-center px-6 rounded-t-3xl h-12 bg-[#b291f2]">
                                <span className='text-gray-950 font-semibold'>You</span>
                                <div className='mt-28 w-full h-full'>
                                <video playsInline ref={myVideo} autoPlay className='w-full h-full' />
                                </div>
                            </div>
                        </div>

                        <div className="h-[65%] rounded-3xl w-full flex relative bg-secondary">
                            <div className="w-full flex items-center px-6 rounded-t-3xl h-12 bg-[#b291f2]">
                                <span className='text-gray-950 font-semibold'>Chat</span>

                                <Input className='absolute bottom-3 bg-primary border-none w-[92%] rounded-full' placeholder='Type message here ...'
                                />

                                <Button className='h-6 w-20 absolute bottom-[18px] right-7 bg-[#b291f2] text-primary'>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page