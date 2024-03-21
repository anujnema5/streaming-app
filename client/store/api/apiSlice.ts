import { logout, setCredentials } from '@/features/userSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import 'dotenv/config'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
    credentials: 'include',
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
        const refreshResult = await baseQuery('/refresh', api, extraOptions) as any
        
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
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