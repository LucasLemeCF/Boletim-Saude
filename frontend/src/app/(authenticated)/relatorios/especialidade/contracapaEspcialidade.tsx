/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

export function ContracapaEspecialiade({mes, ano, atendimentosPorMes}) {
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

function TabelaAtendimentoPorMes({ atendimentosPorMes }) {
    return (
        <div className={`flex flex-col justify-items-start border-black w-full sm:w-[891px] pt-4 pb-8`}>
            <div className="border-b border-r border-black">
                <CabecalhoTabela/>
                <CorpoTabela atendimentosPorMes={atendimentosPorMes}/>
                <TotalAtendimentos atendimentosPorMes={atendimentosPorMes}/>
            </div>
        </div>
    );
}

function CabecalhoTabela() {
    const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", "Média"];

    return (
        <div className="flex flex-row">
            <CelulaVerdeGrande texto="Especialidade" font={"bold"}/>
            {meses.map((mes, index) => (
                <CelulaVerde key={index} texto={mes} font={"bold"}/>
            ))}
        </div>
    );
}

function CorpoTabela({atendimentosPorMes}) {
    return (
        <>
            {atendimentosPorMes.map((especialidade, index) => (
                <LinhaTabela key={index} especialidade={especialidade} />
            ))}
        </>
    )
}

function LinhaTabela({ especialidade }) {
    return (
        <div className="flex flex-row">
           <CelulaVerdeGrande texto={especialidade.especialidade}/>
            {Array.from({ length: 12 }).map((_, mes) => (
                <Celula key={mes} texto={especialidade.atendimentoPorMes[mes]} />
            ))}
            <Celula texto={CalcularMedia(especialidade.atendimentoPorMes)} />
        </div>
    );
}
function Celula({texto}) {
    return (
        <div className={`w-[50px] bg-white text-black text-center border-t border-l border-black`}>{texto}</div>
    )
}

function CelulaVerde({texto, font="normal"}) {
    return (
        <div className={`w-[50px] bg-[#337B5B] font-${font} text-white text-center border-t border-l border-black`}>{texto}</div>
    )
}

function CelulaVerdeGrande({texto, font="normal"}) {
    return (
        <div className={`w-[260px] bg-[#337B5B] font-${font} text-sm text-white text-center border-t border-l border-black`}>{texto}</div>
    )
}

export function CalcularMedia(atendimentoPorMes) {
    let mesesComDados = 0;
    let soma = 0;

    atendimentoPorMes.forEach(atendimento => {
        if (atendimento !== null && atendimento !== undefined && atendimento > 0) {
            mesesComDados++;
            soma += atendimento;
        }
    });

    let resultado = 0;

    if (soma === 0 || mesesComDados === 0) {
        resultado = 0;
    } else {
        resultado = Math.round(soma / mesesComDados);
    }
    
    return resultado;
}

function TotalAtendimentos({ atendimentosPorMes }) {
    const totalPorMes = CalcularTotalPorMes(atendimentosPorMes);

    return (
        <div className="flex flex-row">
            <CelulaVerdeGrande texto={"Total"}/>
            {totalPorMes.map((total, index) => (
                <CelulaVerde key={index} texto={total}/>
            ))}
            <CelulaVerde texto={CalcularMediaTotal(totalPorMes)}/>
        </div>
    );
}

export function CalcularTotalPorMes(atendimentosPorMes) {
    const totalPorMes = Array(12).fill(0);

    atendimentosPorMes.forEach(especialidade => {
        especialidade.atendimentoPorMes.forEach((atendimento, index) => {
            if (atendimento !== null && atendimento !== undefined && atendimento > 0) {
                totalPorMes[index] += atendimento;
            }
        });
    });

    return totalPorMes;
}

export function CalcularMediaTotal(totalPorMes) {
    const mesesComDados = totalPorMes.filter(total => total > 0).length;
    const somaTotal = totalPorMes.reduce((acc, total) => acc + total, 0);
    const mediaTotal = mesesComDados > 0 ? Math.round(somaTotal / mesesComDados) : 0;

    return mediaTotal;
}