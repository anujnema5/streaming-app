import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/sign-in',
                method: 'POST',
                body: { ...credentials },
                providesTags: ['user']
            })
        }),

        signUp: builder.mutation({
            query: (credentials) => ({
                url: '/user/sign-up',
                method: 'POST',
                body: { ...credentials },
                providesTags: ['user']
            })
        }),

        google: builder.query({
            query: (query = 'google') => `/user/${query}`,
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: '/user/refresh',
                method: 'POST',
                body: {},
                providesTags: ['user']
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
                body: {},
                providesTags: ['user']
            })
        })
    })
})

export const { useLoginMutation, useSignUpMutation, useGoogleQuery, useRefreshTokenMutation, useLogoutMutation } = authApiSlice