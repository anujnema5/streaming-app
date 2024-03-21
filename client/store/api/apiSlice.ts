import { logout, setCredentials } from '@/features/userSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { headers } from 'next/headers'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
    credentials: 'include',
    mode: 'no-cors',
    prepareHeaders: (headers, {getState}: {getState: any})=> {
        const token = getState().user.token
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions) as any;

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions) as any
        
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})