'use client'
import { useSocket } from "@/context/SocketProviders";
import { getMeeting, setIncomingCallFalse, setIncomingCallTrue, setOffer, setRemote, setRemoteId, setRemoteStream, setRemoteUser, setStreams } from "@/features/meeting/meetingSlice";
import { getUser } from "@/features/userSlice";
import peer from "@/services/peer";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useMeetingEvents = () => {
    const [incomingCal, setIncomingCall] = useState<boolean>(false);
    const currentUser = getUser();
    // const socket = useSocket();
    const router = useRouter();
    const dispatch = useDispatch();
    const { remoteSocketId, remoteUser: as, streams, offer, incomingCall } = getMeeting();

    const handleUserJoined = async ({ user, id }) => {
        console.log('handle user joined')
        console.log({ user, id });
        dispatch(setRemoteId(id))
        dispatch(setRemoteUser(user))
        socket.emit('ping:remote:user', { to: id, from: socket.id, remoteUser: currentUser })
    }

    const handleInformRemoteUser = ({ from, remoteUser }) => {
        // console.log('handle inform remote user')
        console.log({ from, remoteUser })
        dispatch(setRemoteId(from))
        dispatch(setRemoteUser(remoteUser))
    }
    const handleIncomingCall = ({ from, offer, remoteUser }) => {
        console.log('handle incoming triggering')
        console.log({ from, offer, remoteUser });
        dispatch(setIncomingCallTrue())
        dispatch(setRemoteId(from))
        dispatch(setRemoteUser(remoteUser))
        dispatch(setOffer(offer)); // Dispatch the action to update Redux state
        console.log(incomingCal); // Make sure to log the correct state variable (incomingCall)
    }

    function sendStreams() {
        if (streams) {
            for (const track of streams.getTracks()) {
                peer.peer.addTrack(track, streams)
            }
        }
    }

    const handleRemoteAccept = async ({ answer }) => {
        console.log(answer, "I am triggering");
        await peer.setLocalDescription(answer);
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                dispatch(setStreams(stream))
            })

        peer.peer.addEventListener("track", (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            console.log(remoteStream)
            setRemoteStream(remoteStream[0]);
        });
    }, [])

    useEffect(() => {
        // socket.on('room:join', handleRoomJoin)
        socket.on('user:joined', handleUserJoined)
        socket.on('inform:remote:user', handleInformRemoteUser)
        socket.on('incoming:call', handleIncomingCall)
        socket.on('remote:call:accepted', handleRemoteAccept)

        return () => {
            socket.off('user:joined', handleUserJoined)
            socket.off('inform:remote:user', handleInformRemoteUser)
            socket.off('incoming:call', handleIncomingCall)
            socket.off('remote:call:accepted', handleRemoteAccept)
        }
    }, [socket])
}