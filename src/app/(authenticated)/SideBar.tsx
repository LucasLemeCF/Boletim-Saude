"use client"

import { ReactNode, useState } from "react";
import { Aside } from "../../components/Aside";
import { Header } from "../../components/Header";

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: ReactNode;
}

export function SideBar({children}:SidebarProps) {
    const [open, setOpen] = useState(true);

    return(
        <div className='flex flex-row w-screen'>
            <Aside open={open} setOpen={setOpen}/>
            <div className={`flex flex-col w-full transform duration-500 ease-in-out`}
                style={{transform: `${open ? 'ml-64' : 'ml-0'}`}}
            >
                <Header open={open} setOpen={setOpen}/>
                {children}
            </div>
        </div>
    );
}