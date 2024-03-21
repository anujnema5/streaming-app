'use client'
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/userSlice';
import 'dotenv/config';
import { useRefreshTokenMutation } from '@/features/authApiSlice';

const GoogleCallback = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    try {
        const isTokenVerified = jwt.verify(token, 'accessSecret');
        const {email, emailVerified, fullName, id, username} = isTokenVerified as any
        const user = {email, emailVerified, fullName, id, username}

        console.log(token)
        
        dispatch(setCredentials({user, accessToken : token}))
        router.push('/')
    } 
    
    catch (error) {
        console.error('JWT verification failed:', error.message);
    }

    return (
       null
    );
};

export default GoogleCallback;