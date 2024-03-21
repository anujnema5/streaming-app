import { FaMicrophone } from "react-icons/fa"
import { CiVideoOn } from "react-icons/ci";
import { FcEndCall } from "react-icons/fc";
import { CiMicrophoneOn } from "react-icons/ci";

type TNavLinks = {
    href: string,
    title: string
}

export const navLinks: TNavLinks[] = [
    { href: '/', title: "Home" },
    { href: '/room', title: "Room" },
    { href: '/', title: "Lorem" },
    { href: '/', title: "Lorem" }
]

export const authLinks: TNavLinks[] = [
    { href: '/sign-in', title: "Sign in" },
    { href: '/sign-up', title: "Sign up" }
]

export const meetingMedia = [
    // { type: 'audio', Icon: CiMicrophoneOn, },
    // { type: 'video', Icon: CiVideoOn },
    { type: 'endcall', Icon: FcEndCall }
];
