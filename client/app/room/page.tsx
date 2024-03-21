'use client'
import ChatBox from '@/components/meeting/ChatBox'
import Media from '@/components/meeting/Media'
import MeetingNav from '@/components/meeting/MeetingNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSocket } from '@/context/SocketProviders'
import { getUser } from '@/features/userSlice'
import { RootState } from '@/store/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const page: React.FC = () => {
    const user = getUser();
    const { myVideo, userVideo } = useSocket()
    const { call, callAccepted, callEnded, remoteStream } = useSelector((state: RootState) => state.meeting)

    return (
        <>
            <MeetingNav />
            <div className="meeting-body w-full h-[84%] px-5 pb-5">
                <div className="bg-primary w-full h-full rounded-3xl p-4 flex gap-5">
                    <div className='w-[80%] relative h-full bg-secondary rounded-3xl flex justify-center items-center'>
                        <div className="absolute top-5 left-7 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl flex items-center gap-3">
                            {callAccepted && remoteStream && <span className='you-stream-dot rounded-full bg-gray-100'></span>}
                            <span>{call.name && callAccepted ? call.name : "Remote user"}</span>
                        </div>

                        {callAccepted && !callEnded ?
                            <div className="w-full h-full">
                                <video playsInline ref={userVideo} autoPlay className='w-full h-full' />
                            </div> : <h3 className='text-xl font-medium'>Send stream ID to remote user for connection ...</h3>}

                        <Media />
                    </div>

                    <div className="w-[28%] h-full flex flex-col gap-5 justify-center items-center">
                        <div className="min-h-[47%] w-full flex flex-col  items-center rounded-3xl bg-secondary relative">
                            <div className="absolute px-5 py-1 bg-white/5 backdrop-blur-xl rounded-3xl left-4 top-4 flex gap-2 items-center">
                                <span className='you-stream-dot rounded-full bg-gray-100'></span>
                                <span className='text-sm'>You</span>
                            </div>
                            <div className='w-full h-full'>
                                <video playsInline muted ref={myVideo} autoPlay className='w-full h-full rounded-3xl' />
                            </div>

                        </div>

                        <ChatBox />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page