"use client"; 

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Radio, Headphones } from "lucide-react"

export function Appbar(){
    const session = useSession();
    return <div className="flex">
        <div className="text-lg font-bold flex flex-col justify-center text-white"> Muzer </div>
        <div className="font-bold ">
        
                {!session.data?.user && <button className="m-2 p-2 bg-purple-400" onClick={() => signIn()}>
Signin

                </button>}
                {session.data?.user && <button className="m-2 p-2 bg-purple-400" onClick={() => signOut()}>
                    Logout
                    </button>}
        </div>
        
    </div>
}
