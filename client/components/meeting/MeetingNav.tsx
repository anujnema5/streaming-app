import React from 'react'
import RoundedBackButton from '@/components/ui/RoundedBackButton'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, CaretRightIcon, CheckCircledIcon, CheckIcon, ClipboardCopyIcon, Cross1Icon } from '@radix-ui/react-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import peer from '@/services/peer'
// import { setIncomingCallFalse, setStreams } from '@/features/meeting/meetingSlice'
import { useSocket } from '@/context/SocketProviders'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input } from '../ui/input'
import { setRemoteId } from '@/features/meeting/meetingSlice'
import { FcRight } from 'react-icons/fc'

const MeetingNav = () => {
    const dispatch = useDispatch();
    const { callUser, answerCall, leaveCall } = useSocket()
    const { me, remoteSocketId, call, callAccepted, callEnded } = useSelector((state: RootState) => state.meeting)
    

    const handleRejectCall = () => {
        // setIncomingCallFalse()
        return
    }

    const handleConnectClick = () => {
        callUser(remoteSocketId.toString())
    };

    const handleRemoteIdChange = (e) => {
        dispatch(setRemoteId(e.target.value));
    };


    return (
        <div className='p-5'>
            <div className="header h-20 w-full flex items-center justify-between pr-5 p-3 rounded-full bg-primary">
                <div className="flex gap-6">
                    <RoundedBackButton />
                </div>

                <div className="flex items-center w-full gap-10 justify-between px-8">

                    <div className="flex items-center gap-10">
                        <div className="flex items-center rounded-full ring-zinc-600 bg-zinc-800 justify-between">
                            <Button className='bg-purple-400 rounded-full'>Copy Stream ID <CaretRightIcon /> </Button>
                            <CopyToClipboard text={me}>
                                <Button variant="primary" color="primary" className='flex gap-3 items-center rounded-full'>
                                    {!me ? "Loading ..." : me}
                                    <ClipboardCopyIcon />
                                </Button>
                            </CopyToClipboard>
                        </div>

                       {!callAccepted && !callEnded && me && <div className="input-id flex relative w-[19vw]">
                            <Input placeholder='Enter Remote Stream ID' className='border-0 bg-secondary rounded-full pl-5'
                                onChange={handleRemoteIdChange} />
                            <Button variant='primary' onClick={handleConnectClick} className='rounded-full bg-purple-400 absolute right-0'>Connect</Button>
                        </div>}
                    </div>

                    {call.isReceivingCall && !callAccepted && !callEnded && (
                        <div className='flex items-center px-7 gap-10 py-1 rounded-full bg-secondary' style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <h4>{call.name} is calling:</h4>
                            <div className="flex gap-3 items-center">
                                <Button onClick={answerCall} className="cross h-10 w-10 flex justify-center items-center rounded-full bg-zinc-950">
                                    <CheckIcon />
                                </Button>
                                <Button onClick={() => handleRejectCall} className="cross h-10 w-10 flex justify-center items-center rounded-full bg-destructive">
                                    <Cross1Icon />
                                </Button>
                            </div>
                        </div>
                    )}

                    <Button variant='destructive' className='rounded-full' onClick={leaveCall}>Leave Room</Button>
                </div>
            </div>
        </div>
    )
}

export default MeetingNav