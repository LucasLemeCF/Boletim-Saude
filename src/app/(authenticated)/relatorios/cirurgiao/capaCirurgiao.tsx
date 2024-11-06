
import Image from "next/image";
import BarChartCapaCirurgiao from "../../../../components/Charts/Cirurgiao/BarChartCapaCirurgiao";
import TotalMesesCirurgiao from "../../../../components/Charts/Cirurgiao/TotalMesesCirurgiao";
import { numeroParaMes } from "../../../../utils/meses";

export function CapaCirurgiao({cirurgioes, mes, ano, chartRef}) {  
    return (
      <div className={`flex flex-col justify-items-start border-b border-black w-full sm:w-[891px] sm:mx-4 pt-4 pb-8`}> 
        {titulo(mes, ano)}
        <BarChartCapaCirurgiao cirurgioes={cirurgioes} chartRef={chartRef}/>
        {descricao(cirurgioes, mes)}
        <TotalMesesCirurgiao ano={ano} chartRef={chartRef}/>
      </div>
    );
}

const titulo = (mesInt, ano) => {
    const mes = numeroParaMes(mesInt);

    return (
        <div className="flex justify-between w-full h-[60px] sm:px-8">
            <div className="w-[60px]"></div>
            <div className="text-center font-bold text-lg sm:text-xl sm:ml-4">Relatório de Cirurgias de {mes} de {ano}</div>
            <Image 
                src="/logo.png"
                width={60}
                height={60}
                alt="Logo Itaberá SP"
                className="mr-4"
            />
        </div>
    )
}

const descricao = (cirurgioes, mesInt) => {
    const mes = numeroParaMes(mesInt);

    return (
        <div className="flex flex-col justify-between h-[30px] mt-4 px-8">
            <div className="text-center font-bold text-base">No total foram realizadas {somarAtendimentos(cirurgioes)} cirurgias.</div>
        </div>
    )
}

const somarAtendimentos = (cirurgioes) => {
    let soma = 0;
    
    cirurgioes.map(cirurgiao => {
        cirurgiao.procedimentos.map(procedimento => {
            if (procedimento.nome !== "Procedimento Anestésico") {
                procedimento.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
                    soma += resultadosDiario.atendimentos;
                });
            }
        });
    });
  
    return soma;
}