import React from 'react'
import { meetingMedia } from '@/data/staticData'
import { Button } from '../ui/button'
import { useSocket } from '@/context/SocketProviders'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setStream } from '@/features/meeting/meetingSlice'

const Media = () => {
const {leaveCall, myVideo} = useSocket()
const {stream} = useSelector((state: RootState)=> state.meeting)
const dispatch = useDispatch()

const meetingMediaa = {
    audio: () => {

    },

    video: () => {
        // const videoTrack = stream.getTracks().find(track => track.kind === 'video');
        // const newTracks = {...videoTrack, enabled: false}
        // dispatch(setStream(newTracks))

        // hideVideo()
    },

    endcall: () => {
        leaveCall()
    }
}

    return (
        <div className='absolute bottom-7'>
            <div className="flex items-center gap-8">
                {meetingMedia?.map((media) => (
                    <Button key={media.type} className='rounded-full p-5 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-2xl'
                        onClick={meetingMediaa[media.type]}>
                        <media.Icon className='w-7 h-7' />
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Media