"use client"

import { usePathname } from "next/navigation";

const navLinks = [
    {name: "Boletim Médico", href: "/tabela", hidden:""},
    {name: "Relatórios", href: "/relatorios", hidden:""},
    {name: "Editar Boletim", href: "/editar-tabela", hidden:"hidden sm:flex"},
    {name: "Especialidades", href: "/especialidades", hidden:"hidden sm:flex"},
    {name: "Cirurgioes", href: "/cirurgioes", hidden:"hidden sm:flex"}
]

export function Navigation() {
    const pathName = usePathname();

    return (
        <div className="flex flex-col items-start self-stretch gap-6 mt-10 px-2">
            {navLinks.map((link) => {
                const active = pathName.startsWith(link.href);

                return (  
                    <a key={link.name} href={link.href} className={`flex items-center self-stretch rounded-[6px] py-2 px-3 hover:cursor-pointer 
                        ${active ? 'bg-teal-50' : 'hover:bg-teal-50/25'}` + ` ${link.hidden}`
                    }>
                        <div className={`text-lg ${active ? 'text-green-900' : 'text-white'}`}>
                            {link.name}
                        </div>
                    </a>
                )
            })}
        </div>
    )
}

function Botao(texto: String, link: String, active: boolean) {
    return (
        <a className={`flex items-center self-stretch rounded-[6px] py-2 px-3 hover:cursor-pointer ${active ? 'bg-teal-50' : 'hover:bg-teal-50/25'}`}>
            <div className={`text-lg ${active ? 'text-green-900' : 'text-white'}`}>
                {texto}
            </div>
        </a>
    )
}