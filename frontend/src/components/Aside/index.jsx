"use client"

import Image from "next/image";
import { MdChevronRight } from "react-icons/md";
import { Navigation } from './navigation';

export function Aside({open, setOpen}) {
    return (
        <aside className="w-64 fixed z-10 h-full bg-[#337B5B] flex flex-col transform duration-500 ease-in-out"
            style={{transform: `${open ? 'translateX(0%)' : 'translateX(-100%)'}`}}
        >
            <Header setOpen={setOpen}/>
            <Navigation/>
        </aside>
    )
}

function Header({setOpen}) {
    return (
        <div className="flex flex-row justify-center items-center self-stretch mt-5">
           {logo()}
           <MdChevronRight className="ml-4 transform -rotate-180 cursor-pointer text-white w-6 h-6" onClick={()=>setOpen((e)=>!e)}/>
        </div>
    )
}

const logo = () => {
    return (
       <div className="flex items-center gap-6 self-stretch w-48">
            <Image 
                src="/logo.png"
                width={50}
                height={50}
                alt="Logo Itaberá SP"
            />
            <div>
                <p className="text-white text-[11px] font-impact">
                    Prefeitura Municipal de
                </p>
                <p className="text-white text-[38px] leading-8 font-impact mt-0  ">
                    ITABERÁ
                </p>
            </div>
       </div>
    )
}