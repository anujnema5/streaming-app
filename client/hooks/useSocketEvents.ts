'use client'
import { useSocket } from "@/context/SocketProviders"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useSocketEvent = () => {
    const router = useRouter();
    const socket = useSocket();

    const handleJoinRoom = ({ email, room }) => {
        router.push(`/room/${room}`)
    }

    useEffect(() => {
        socket.on('room:join', handleJoinRoom)

        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, router])
}

export default useSocketEvent;