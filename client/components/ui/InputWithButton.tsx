'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSocket } from "@/context/SocketProviders";
import { RootState } from "@/store/store";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


export function InputWithButton() {
  // const [otp, setOTP] = useState<string>('');
  const {user} = useSelector((state: RootState) => state.user);
  // const socket = useSocket();
  const notify = () => toast.error("Please login to join a meeting");
  // useSocketEvent();

  const handleJoinMeeting = () => {
    if (!user) { notify(); return; }
    // socket.emit('room:join', { user, room: otp })
  }

  return (
    <div className="flex gap-4 w-[80%] items-center">
      <Input type="text" className="w-56 hide-num bg-secondary border-none" placeholder="Enter Room Number"
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOTP((e.target.value))}
      />
      <DoubleArrowRightIcon />
      <Button onClick={handleJoinMeeting} className='bg-zinc-800 shadow-xl hover:bg-gray-300 hover:text-gray-800 transition-el text-gray-200 rounded-full py-2'>Join meeting</Button>
    </div>
  )
}