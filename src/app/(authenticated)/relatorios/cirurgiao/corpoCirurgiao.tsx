import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Image from "next/image";
import LineChartCirurgiao from "../../../../components/Charts/Cirurgiao/LineChartCirurgiao";

Chart.register(CategoryScale);

export function CorpoCirurgiao({cirurgiao, procedimento, chartRef, index}) {  
  const dadosMes = reorganizarDados(procedimento.resultadosMensais[0]);

  return (
    <div className={`flex flex-col justify-center sm:justify-start border-b border-black w-[400px] sm:w-[891px] mx-0 py-4 sm:py-8`}> 
      {titulo(cirurgiao, procedimento)}
      {descricao(dadosMes)}
      <LineChartCirurgiao dadosMes={dadosMes} chartRef={chartRef} index={index}/>
    </div>
  );
}

function reorganizarDados(dadosMes) {
  dadosMes.resultadosDiarios.sort((a, b) => a.data - b.data);
  return dadosMes;
}

const titulo = (cirurgiao, procedimento) => {
  return (
    <div className="text-center font-bold">
      {procedimento.nome + " - " +  cirurgiao.nome}
    </div>
  )
}

const descricao = (dadosMes) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-end">
        <p><span className="font-bold">Total: </span>{dadosMes.atendimentos} cirurgias realizadas.</p>
      </div>
      <div className="hidden sm:flex flex-row h-[60px] mr-4">
        <Image 
          src="/logo.png"
          width={60}
          height={60}
          alt="Logo Itaberá SP"
        />
      </div>
      <div className="flex sm:hidden flex-row h-[45px] mr-4">
        <Image 
          src="/logo.png"
          width={45}
          height={45}
          alt="Logo Itaberá SP"
        />
      </div>
    </div>
  )
}