import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { generateTime } from "@/utils/helperFunctions";
import { nanoid } from 'nanoid'

const meetingSlice = createSlice({
    name: 'meeting',
    initialState: {
        callAccepted: false,
        callEnded: false,
        stream: null,
        name: '',
        call: {} as any,
        me: '',
        remoteSocketId: null,
        remoteStream: null,
        messages: []
    },
    reducers: {
        setMe(state, action) {
            state.me = action.payload
        },

        setStream(state, action) {
            state.stream = action.payload
        },

        setCall(state, action) {
            state.call = action.payload
        },

        setCallAcceptedToTrue(state) {
            state.callAccepted = true
        },

        setName(state, action) {
            state.name = action.payload
        },

        setCallEndToTrue(state) {
            state.callEnded = true
        },

        setRemoteId(state, action) {
            state.remoteSocketId = action.payload
        },

        setRemoteStream(state, action) {
            state.remoteStream = action.payload
        },

        setMessages(state, action){
            // state.messages.push({date: generateTime(), message: action.payload, to: state.remoteSocketId, from: state.me})
            state.messages.push({id: nanoid(), date: generateTime(), ...action.payload})
        }
    }
})

export const { setMe, setStream, setCall, setCallAcceptedToTrue, setMessages, setRemoteStream, setCallEndToTrue, setName, setRemoteId } = meetingSlice.actions
export default meetingSlice.reducer

export const getMeeting = () => useSelector((state: RootState) => state.meeting)