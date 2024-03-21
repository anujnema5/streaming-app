import userRedcuer from '@/features/userSlice';
import meetingReducer from '@/features/meeting/meetingSlice'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice';
import { useSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        user: userRedcuer,
        meeting: meetingReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;