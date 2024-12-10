/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

export function ContracapaEspecialiade({mes, ano, atendimentosPorMes}) {
    console.log(atendimentosPorMes);

    return (
        <div className={`flex flex-col justify-items-start border-b border-black w-full sm:w-[891px] pt-4 pb-8`}>
            {titulo(mes, ano)} 
            <TabelaAtendimentoPorMes atendimentosPorMes={atendimentosPorMes}/>
        </div>
    );
}

const titulo = (mes, ano) => {
    return (
        <>
            <div className="hidden sm:flex justify-between h-[60px] px-8">
                <div className="w-[55px]"></div>
                <div className="text-center font-bold text-xl ml-4">Tabela de Atendimentos por Mês em {ano}</div>
                <Image 
                    src="/logo.png"
                    width={60}
                    height={60}
                    alt="Logo Itaberá SP"
                    className="mr-4"
                />
            </div>
            <div className="flex sm:hidden justify-between h-[45px]">
                <div className="w-[55px]"></div>
                <div>
                    <div className="text-center font-bold text-lg">Relatório de Atendimentos de</div>
                    <div className="text-center font-bold text-lg">{mes} de {ano}</div>
                </div>
                <Image 
                    src="/logo.png"
                    width={45}
                    height={45}
                    alt="Logo Itaberá SP"
                    className="mr-4"
                />
            </div>
        </>
    )
}

function TabelaAtendimentoPorMes({atendimentosPorMes}) {
    return (
        <div className={`flex flex-col justify-items-start border-black w-full sm:w-[891px] pt-4 pb-8`}>
          <div className="border-b border-r border-black">
            <div className="flex flex-row">
                <div className="w-[250px] bg-[#337B5B] text-white font-bold text-center border-t border-l border-black">Especialidade</div>
                <CelulaCabecalho texto={"JAN"}/>
                <CelulaCabecalho texto={"FEV"}/>
                <CelulaCabecalho texto={"MAR"}/>
                <CelulaCabecalho texto={"ABR"}/>
                <CelulaCabecalho texto={"MAI"}/>
                <CelulaCabecalho texto={"JUN"}/>
                <CelulaCabecalho texto={"JUL"}/>
                <CelulaCabecalho texto={"AGO"}/>
                <CelulaCabecalho texto={"SET"}/>
                <CelulaCabecalho texto={"OUT"}/>
                <CelulaCabecalho texto={"NOV"}/>
                <CelulaCabecalho texto={"DEZ"}/>
            </div>
            {atendimentosPorMes.map((especialidade, index) => (
                <div className="flex flex-row" key={index}>
                    <div className="w-[250px] bg-[#337B5B] text-white text-sm text-center border-t border-l border-black">{especialidade.especialidade}</div>
                    <CelulaCorpo especialidade={especialidade} mes={0}/>
                    <CelulaCorpo especialidade={especialidade} mes={1}/>
                    <CelulaCorpo especialidade={especialidade} mes={2}/>
                    <CelulaCorpo especialidade={especialidade} mes={3}/>
                    <CelulaCorpo especialidade={especialidade} mes={4}/>
                    <CelulaCorpo especialidade={especialidade} mes={5}/>
                    <CelulaCorpo especialidade={especialidade} mes={6}/>
                    <CelulaCorpo especialidade={especialidade} mes={7}/>
                    <CelulaCorpo especialidade={especialidade} mes={8}/>
                    <CelulaCorpo especialidade={especialidade} mes={9}/>
                    <CelulaCorpo especialidade={especialidade} mes={10}/>
                    <CelulaCorpo especialidade={especialidade} mes={11}/>
                </div>
            ))}
          </div>
        </div>
    );
}

function CelulaCabecalho({texto}) {
    return (
        <div className="w-[55px] bg-[#337B5B] text-white font-bold text-center border-t border-l border-black">{texto}</div>
    )
}

function CelulaCorpo({especialidade, mes}) {
    return (
        <div className="w-[55px] text-center border-t border-l border-black">{especialidade.atendimentoPorMes[mes]}</div>
    )
}