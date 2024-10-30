"use client"

import { signOut } from 'next-auth/react';
import { MdLogout } from "react-icons/md";

export const Header = () => {
    return (
        <header className="flex w-full h-[75px] py-4 px-8 justify-center items-center gap-4 bg-[#337B5B]">
            <div className="flex w-full justify-end items-center gap-3">
                <button onClick={() => signOut({ callbackUrl: '/login', redirect:true })} className="flex flex-row">
                    <MdLogout className="w-6 h-6 mr-2 text-white"/>
                    <p className="text-lg text-white">Sair</p>
                </button>
            </div>
        </header>
    )
}