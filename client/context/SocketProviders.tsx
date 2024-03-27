'use client'
import { setCall, setCallAcceptedToTrue, setCallEndToTrue, setMe, setMessages, setName, setRemoteId, setRemoteStream, setStream } from "@/features/meeting/meetingSlice";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import React from 'react'
import { io } from "socket.io-client";
import Peer from 'simple-peer';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import 'dotenv/config'

type TSocketContext = {
  answerCall:  ()=> any, 
  callUser : (id: string)=> any, 
  leaveCall: ()=> any,
  myVideo: any,
  userVideo: any,
  messageUser: (message: string)=> any
}

const SocketContext = createContext<null | TSocketContext>(null)

const SocketProviders = ({ children }) => {
  const { me, stream, call, name, remoteSocketId, messages } = useSelector((state: RootState) => state.meeting)
  const {user} = useSelector((state: RootState)=>state.user)
  const router = useRouter()
  const socket = io('https://server.streamingapp.live')
  console.log(socket);
  // const socket = io('localhost:8000')
  const dispatch = useDispatch();

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  const connectionRef = useRef<any>();
  const pathname = usePathname()

  useEffect(() => {

    if(pathname === '/room') {
      
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        dispatch(setStream(currentStream));

        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on('me', (id) => {
      dispatch(setMe(id))
    });

    socket.on('message:recieved', ({to, from, message})=> {
      dispatch(setMessages({to, from, message}))
      console.log(messages)
    })

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      dispatch(setCall({ isReceivingCall: true, from, name: callerName, signal }));
      dispatch(setRemoteId(from))
    });
  }

  return ()=> {
    socket.off('callUser', ({ from, name: callerName, signal }) => {
      dispatch(setCall({ isReceivingCall: true, from, name: callerName, signal }));
      dispatch(setRemoteId(from))
    });

    socket.off('message:recieved', ({to, from, message})=> {
      dispatch(setMessages(message))
    })
  }
  }, []);


  const callUser = (id: any) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    dispatch(setName(user.fullName))

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name: user.fullName });
    });
    
    peer.on('stream', (currentStream) => {
      dispatch(setRemoteStream(currentStream))
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callAccepted', ({from, signal, name}) => {
      peer.signal(signal);

      dispatch(setCallAcceptedToTrue())
      dispatch(setCall({isReceivingCall: true, from, name, signal}))
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    dispatch(setCallAcceptedToTrue());
    const peer = new Peer({initiator: false, trickle: false, stream})

    peer.on('signal', (data)=> {
      socket.emit('answerCall', {from: me, signal:data, to:call.from, name: user.fullName})
    })

    // JAB REMOTE SE STREAM AYEGI YE TAB YE APNE AAP TRIGGER HOGA
    peer.on('stream', (currentStream) => {
      dispatch(setRemoteStream(currentStream))
      
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal)
    connectionRef.current = peer;
    console.log('congo I am triggering')
  }

  const leaveCall = () => {
    dispatch(setCallEndToTrue());
    
    if(connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.href = "/";
    router.push('/')
  };

  const messageUser = (message: string)=> {
    socket.emit('message', {to: remoteSocketId, from: me, message: message })
    dispatch(setMessages({to: remoteSocketId, from: me, message: message }))
    console.log(messages)
  }

  return (
    <SocketContext.Provider value={{answerCall, callUser, leaveCall, myVideo, userVideo, messageUser}}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error('Context used outside of provider')
  return state;
}
export default SocketProviders



// HOW THE EXECUTION IS HAPPENING -
    // 1.) Socket initialize hua backend ki URL ke sath
    // 2.) callUser function trigger hua - 
          // Wo initiator hai isliye true, trickle false
          // or jo hum stream kar rahe hai wo humne usko paas kardi
    // 3.) Local ke signal ka data lekar humne event emit kiya callUser ka or use stream bhi di hai with offer
    // 4.) event backend me catch hua then jisne event bheja hai uska signalData, or name humko mil gaya
    // 5.) then humne wo event remote user ko bhej diya with signal data, jisne event fire kiya uski socket ID, or uske name ke sath
    // 6.) use effect chala hamari stream set hui, or humne call wali state ke andar ye sab data save krliya setCall({ isReceivingCall: true, from, name: callerName, signal });
    // 7.) call set hua to remote user ke paas notification aaya hoga usne then call accept ki then answercall wala function trigger hua
    // 

    
// trickle: false: disables the sending of ICE candidates in small chunks (trickles) 
// and instead sends them all at once.

// About peer.signal(data)
// The Peer class has a special function called signal. 
// This function is used to send important information between the two devices. This information includes things like how they can connect to each other (like their network addresses), what kind of video or audio settings they should use, and other technical details.
// When you use the signal function, you are basically telling your device to send a message to the other device with all these details. This message is usually in the form of a text (like a string) or a structured format called JSON, which makes it easy for the devices to understand each other.