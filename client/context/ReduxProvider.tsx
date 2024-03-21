'use client'
import { setCredentials } from '@/features/userSlice';
import store from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist";

export type ProviderProps = {
    children: React.ReactNode
}

persistStore(store);

const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider