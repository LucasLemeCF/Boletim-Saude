"use client"

import { signOut } from 'next-auth/react';
import { MdChevronRight, MdLogout } from "react-icons/md";

export function Header({open, setOpen}) {
    return (
        <header className="flex w-full h-[75px] py-4 pr-8 justify-center items-center gap-4 bg-[#337B5B]">
            <MdChevronRight className={`${open ? 'hidden' : ''} ml-2 cursor-pointer text-white w-6 h-6`} 
                onClick={()=>setOpen((e)=>!e)}
            />
            <div className="flex w-full justify-end items-center gap-3">
                <button className="flex flex-row items-center"
                    onClick={() => signOut({ callbackUrl: '/login', redirect:true })}
                >
                    <MdLogout className="w-6 h-6 mr-2 text-white"/>
                    <p className="text-lg text-white">Sair</p>
                </button>
            </div>
        </header>
    )
}