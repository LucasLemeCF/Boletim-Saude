"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
import { z } from "zod";
 
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function LinhasOrdemTabelaCirurgiao({ dadosTabela, register, watchLinha, procedimentosCirurgioes, form }) {
  const tamanhoCabecalho = dadosTabela.cabecalhosTabela.length;
  let cabecalhos = SepararCabecalhosCirurgiao(dadosTabela.cabecalhosTabela);
  let indexLinha = -1;

  return (
    <div>
      {cabecalhos.map((cabecalho, indexCabecalho) => {
        return(
          <div className="border border-t-0 border-black">
            <LinhaCabecalho cabecalho={cabecalho}/>
            {dadosTabela.linhasTabela.map((linha, indexLinhaTabela) => {
              const linhaInicial = dadosTabela.cabecalhosTabela[indexCabecalho].posicao + 1;
              let linhaAtual = linhaInicial + indexLinhaTabela;

              let linhaFinal;
              if (tamanhoCabecalho > indexCabecalho + 1) {
                linhaFinal = dadosTabela.cabecalhosTabela[indexCabecalho + 1].posicao - 1;
              } else {
                linhaFinal = dadosTabela.linhasTabela.length;
              }

              if (linhaAtual <= linhaFinal) {
                indexLinha++;
                return(
                  <LinhaTabela linha={dadosTabela.linhasTabela[indexLinha]} linhaAtual={linhaAtual} procedimentosCirurgioes={procedimentosCirurgioes} form={form}/>
                );
              } else {
                return(
                  <></>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  )
}

function LinhaCabecalho({cabecalho}) {
  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[300px] h-[25px]">
        <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[0].texto}</p>
      </div>
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[300px] h-[25px]">
        <p className='w-full font-semibold text-center text-white'>{cabecalho.textos[1].texto}</p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowUp className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowDown className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaTrashAlt className="w-[16px] h-[16px]"/></p>
      </div>
    </div>
  );
}

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

function LinhaTabela({linha, linhaAtual, procedimentosCirurgioes, form}) {
  const nomeCirurgiao = BuscarNomeCirurgiao({linha, procedimentosCirurgioes});
  const nomeProcedimento = BuscarNomeProcedimento({linha, procedimentosCirurgioes});
  const listaCirurgioes = removerCirurgioesRepetidos(procedimentosCirurgioes);
  const listaProcedimentos = filtrarProcedimentos({nomeCirurgiao, procedimentosCirurgioes});

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={form.control}
          name="cirurgiao"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={nomeCirurgiao}>
                <FormControl className="w-[300px] h-6 border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cirurgião" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listaCirurgioes.map((procedimento) => {
                    return(
                      <SelectItem value={procedimento}>
                        {procedimento}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={form.control}
          name="procedimento"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={nomeProcedimento}>
                <FormControl className="w-[300px] h-6 border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um procedimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listaProcedimentos.map((procedimento) => {
                    return(
                      <SelectItem value={procedimento}>
                        {procedimento}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaTrashAlt className="w-[15px] h-[15px]"/></p>
      </div>
    </div>
  );
}

function BuscarNomeCirurgiao({linha, procedimentosCirurgioes}) {
  let nomeCirurgiao = "";

  procedimentosCirurgioes.map((procedimento) => {
    if (procedimento.id == linha.componenteId) {
      nomeCirurgiao = procedimento.cirurgiao;
    }
  });

  return nomeCirurgiao;
}

function BuscarNomeProcedimento({linha, procedimentosCirurgioes}) {
  let nomeProcedimentoCirurgiao = "";

  procedimentosCirurgioes.map((procedimento) => {
    if (procedimento.id == linha.componenteId) {
      nomeProcedimentoCirurgiao = procedimento.procedimento;
    }
  });

  return nomeProcedimentoCirurgiao;
}

function SepararCabecalhosCirurgiao(cabecalhos) {
  let cabecalhosEspecialidade = [];

  cabecalhos.map((cabecalho) => {
    if (cabecalho.tipo == "CIRURGIAO_CABECALHO") {
      cabecalhosEspecialidade.push(cabecalho);
    }
  });

  return cabecalhosEspecialidade;
}

function removerCirurgioesRepetidos(procedimentosCirurgioes) {
  let listaCirurgioes = [];

  procedimentosCirurgioes.map((procedimento) => {
    if (!listaCirurgioes.includes(procedimento.cirurgiao)) {
      listaCirurgioes.push(procedimento.cirurgiao);
    }
  });

  return listaCirurgioes;
}

function removerProcedimentosRepetidos(procedimentosCirurgioes) {
  let listaProcedimentos = [];

  procedimentosCirurgioes.map((procedimento) => {
    if (!listaProcedimentos.includes(procedimento.procedimento)) {
      listaProcedimentos.push(procedimento.procedimento);
    }
  });

  return listaProcedimentos;
}

function filtrarProcedimentos({nomeCirurgiao, procedimentosCirurgioes}) {
  let listaProcedimentos = [];

  procedimentosCirurgioes.map((procedimento) => {
    if (nomeCirurgiao == procedimento.cirurgiao) {
      listaProcedimentos.push(procedimento.procedimento);
    }
  });

  return listaProcedimentos;
}