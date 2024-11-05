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
            <div className={`flex flex-col w-full`}>
                <Header open={open} setOpen={setOpen}/>
                <div className={`${open ? 'ml-64' : 'ml-0'} transform duration-500 ease-in-out`}>
                    {children}
                </div>
            </div>
        </div>
    );
}