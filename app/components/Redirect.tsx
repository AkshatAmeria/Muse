"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';

export function Redirect () {
    const session = useSession();
    const router  = useRouter();
useEffect(() => {
    if(session?.data?.user){
        router.push('/dashboard')
    }
},[session])


}

export default Redirect
