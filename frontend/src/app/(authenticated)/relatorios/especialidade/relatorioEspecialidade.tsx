import { Document, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Chart as ChartJS } from "chart.js";
import { useRef, useState } from "react";
import { MdOutlineFileDownload } from 'react-icons/md';
import { Label } from "../../../../components/ui/label";
import { Switch } from "../../../../components/ui/switch";
import { numeroParaMes } from "../../../../utils/meses";
import { CapaEspecialidade } from "./capaEspecialidade";
import { ContracapaEspecialiade } from './contracapaEspcialidade';
import { CorpoEspecialidade } from "./corpoEspecialidade";
import { PdfCapaEspecialidade } from "./PdfCapaEspecialidade";
import { PdfContracapaEspecialidade } from './PdfContracapaEspecialidade';
import { PdfCorpoEspecialidade } from './PdfCorpoEspecialidade';

export function RelatorioEspecialidade({dadosRelatorio, mesRelatorio, anoRelatorio, atendimentosPorMes}) {
    const chartRefCapa = useRef<ChartJS<"bar", number[], string>[]>([]);
    const chartRefCorpo = useRef<ChartJS<"line", number[], string>[]>([]);
    const [base64Image, setBase64Image] = useState([]);
    const [openPdf, setOpenPdf] = useState(false);
  
    const mesString = numeroParaMes(mesRelatorio);
    
    const gerarPdfReader = () => {
        if (openPdf) {
            setOpenPdf(false);
        } else {
            const newChartRef = [];
  
            newChartRef.push(chartRefCapa.current[0].toBase64Image());
            newChartRef.push(chartRefCapa.current[1].toBase64Image());

            for (let i = 0; i < chartRefCorpo.current.length; i++) {
                if (chartRefCorpo.current[i] != undefined) {
                    newChartRef.push(chartRefCorpo.current[i].toBase64Image());
                }
            }
        
            setBase64Image(newChartRef);
            setOpenPdf(true);
        }
    }
  
    return (
      <>
        <div className={`hidden sm:flex justify-between w-full px-8`}>
            <div className="flex items-center space-x-2 w-full h-[50px] rounded-[5px] justify-center sm:justify-end">
                <Switch onClick={() => gerarPdfReader()}/>
                <Label>Modo PDF</Label>
                {
                    openPdf ? 
                    <button className={`w-[150px] h-[50px] rounded-[5px] text-white flex items-center justify-start bg-[#337B5B]`} type={"button"}>
                    <MdOutlineFileDownload className="w-6 h-6 ml-4"/>
                    <div className={"ml-4"}>
                        <PDFDownloadLink document={<PdfEspecialidade especialidades={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio} base64Image={base64Image} mesString={mesString} dadosRelatorio={dadosRelatorio} atendimentosPorMes={atendimentosPorMes}/>} fileName={"Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf"}>
                        Baixar
                        </PDFDownloadLink>
                    </div>
                    </button> : null
                }
            </div>
        </div>
       
        <div className={`flex flex-col justify-items-start w-[891px] h-[1260px] mt-8 px-0 ` + (openPdf ? "" : "hidden")}>
            <PDFViewer  style={{height: "100%"}}>
               <PdfEspecialidade especialidades={dadosRelatorio} mesRelatorio={mesRelatorio} anoRelatorio={anoRelatorio} base64Image={base64Image} mesString={mesString} dadosRelatorio={dadosRelatorio} atendimentosPorMes={atendimentosPorMes}/>
            </PDFViewer>
        </div>
        
        <div className={openPdf ? "hidden" : "flex flex-col justify-center w-[400px] sm:w-full"}>
            <CapaEspecialidade especialidades={dadosRelatorio} mes={mesRelatorio} ano={anoRelatorio} chartRef={chartRefCapa}/>
            <ContracapaEspecialiade mes={mesRelatorio} ano={anoRelatorio} atendimentosPorMes={atendimentosPorMes}/>
            {dadosRelatorio.map((especialidade, index) => (
                (especialidade.resultadosMensais[0].metaMensal > 0) ?
                    <CorpoEspecialidade key={index} especialidade={especialidade} chartRef={chartRefCorpo} index={index}/> :
                null
            ))}
        </div>
      </>
    )
}

export const PdfEspecialidade = ({ especialidades, mesRelatorio, anoRelatorio, base64Image, mesString, dadosRelatorio, atendimentosPorMes }) => (
    <Document title={"Relatório Médico - " + mesRelatorio + "-" + anoRelatorio + ".pdf"} >
        <PdfCapaEspecialidade img={base64Image} mes={mesString} ano={anoRelatorio} especialidades={dadosRelatorio}/>
        <PdfContracapaEspecialidade atendimentosPorMes={atendimentosPorMes} anoRelatorio={anoRelatorio}/>
        <PdfCorpoEspecialidade especialidades={especialidades} img={base64Image}/>
    </Document>
)
