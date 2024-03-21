import { useGoogleQuery, useLoginMutation, useLogoutMutation, useSignUpMutation } from "@/features/authApiSlice";
import { logout, setCredentials } from "@/features/userSlice";
import { loginSchema, registerSchema } from "@/schema";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";

export const useRegister = () => {
    const dispatch = useDispatch();
    const [signUp, { isError, isLoading, isSuccess }] = useSignUpMutation();
    const transaction = { success: null, error: null }

    const register = async (values: z.infer<typeof registerSchema>) => {
        try {
            const isValueCorrect = registerSchema.safeParse(values);

            if (!isValueCorrect.success) {
                transaction.error = "Fields are not valid"
            }

            const body = {
                fullName: values.name,
                email: values.email,
                username: values.username,
                password: values.password
            }

            const { data } = await signUp(body).unwrap() as any

            const user = data.user;
            const accessToken = data.accessToken

            dispatch(setCredentials({ user, accessToken }))
            transaction.success = "Registration successfull"
            return transaction

        } catch (error) {
            const { data } = error

            if (data) {
                transaction.error = data.error
            }

            else {
                transaction.error = "Something went wrong"
            }
            return transaction
        }
    }

    return { register, isError, isLoading, isSuccess }
}

export const useLogin = () => {
    const dispatch = useDispatch();
    const [loginUser, { isError, isLoading, isSuccess }] = useLoginMutation()

    const transaction = { success: null, error: null }
    const login = async (values: z.infer<typeof loginSchema>) => {

        try {
            const isBodyValid = loginSchema.safeParse(values);

            if (!isBodyValid.success) {
                console.log('Fields are not valid')
                transaction.error = "Fields are not valid"
            }

            console.log('reaching here')

            const data = await loginUser(values).unwrap();
            console.log('reachig here 2')


            if (data && data.status === 200 || 201) {
                const user = data.data.user;
                const accessToken = data.data.accessToken

                dispatch(setCredentials({ user, accessToken }))
                transaction.success = "Login successfull"
                return transaction
            }

            transaction.error = "Server error";
            return transaction
        }
        catch (error) {
            const { data } = error

            if (data) {
                transaction.error = data.error
            } else {
                transaction.error = "Something went wrong"
            }
            return transaction
        }
    }
    return { login, isError, isLoading, isSuccess }
}

export const useLogout = () => {
    const dispatch = useDispatch();
    const [userLogout, { isSuccess }] = useLogoutMutation();
    const transaction = { success: null, error: null }

    const handleLogout = async () => {
        try {
            const signedOutedUser = await userLogout('logout')
            console.log(signedOutedUser)
            dispatch(logout())
            transaction.success = 'User logout successfully'
        }

        catch (error) {
            transaction.error = 'Something went wrong'
        }

        return transaction;
    }

    return { handleLogout }
}