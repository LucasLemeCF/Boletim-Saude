"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
 
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../../components/ui/select";
import { alterarCirurgiao, alterarProcedimento } from "./modificarLinhaCirurgiao";

export default function LinhasOrdemTabelaCirurgiao({ control, register, cirurgioes, getValues }) {
  const { fields: fieldsCabecalho, update: updateCabecalho, append: appendCabecalho, remove: removeCabecalho } = useFieldArray({
    name: `cabecalhosCirurgioes`,
    control,
  });

  return (
    <div>
      {fieldsCabecalho.map((cabecalho, indexCabecalho) => {
        return (
          <Cabecalho key={indexCabecalho} indexCabecalho={indexCabecalho} control={control} register={register} cirurgioes={cirurgioes}
            fieldsCabecalho={fieldsCabecalho} updateCabecalho={updateCabecalho} removeCabecalho={removeCabecalho} getValues={getValues}
          />
        );
      })}
      <button className="border-black font-semibold text-center pl-2 border-r-2 border-b-2 border-l-2 text-white bg-[#337B5B] w-[1002px]"
        onClick={() => {
          appendCabecalho({linhasProcedimentos: [], textos: ["", ""]})
        }}  
      >
        + Adicionar cabecçalho de cirurgiões
      </button>
    </div>
  )
}

function Cabecalho({ indexCabecalho, control, register, fieldsCabecalho, updateCabecalho, cirurgioes, removeCabecalho, getValues }) {
  const { fields: fieldsProcedimentos, remove, update, insert, move } = useFieldArray({
    name: `cabecalhosCirurgioes[${indexCabecalho}].listaProcedimentos`,
    control,
  });

  return (
    <div className="border border-t-0 border-black" key={indexCabecalho}>
      <LinhaCabecalho key={"cabecalho-"+indexCabecalho} indexCabecalho={indexCabecalho} insert={insert}
        register={register} updateCabecalho={updateCabecalho} fieldsCabecalho={fieldsCabecalho} removeCabecalho={removeCabecalho}
      />
      {fieldsProcedimentos.map((procedimento, indexProcedimento) => { 
        return(
          <LinhaTabela key={indexProcedimento} procedimento={procedimento} cirurgioes={cirurgioes} remove={remove} update={update}
            control={control} indexProcedimento={indexProcedimento} indexCabecalho={indexCabecalho} updateCabecalho={updateCabecalho}
            getValues={getValues} insert={insert} move={move} fieldsProcedimentos={fieldsProcedimentos} tamanhoArray={fieldsProcedimentos.length}
          />
        );
      })}
    </div>
  )
}

function LinhaCabecalho({indexCabecalho, register, updateCabecalho, fieldsCabecalho, insert, removeCabecalho}) {
  function onChangeCirurgiao(value) {
    let textos = fieldsCabecalho[indexCabecalho].textos;
    textos[0] = value;

    let novoValor = {
      ...fieldsCabecalho[indexCabecalho],
      textos: textos
    };

    updateCabecalho(indexCabecalho, novoValor);
  }

  function onChangeProcedimento(value) {
    let textos = fieldsCabecalho[indexCabecalho].textos;
    textos[1] = value;

    let novoValor = {
      ...fieldsCabecalho[indexCabecalho],
      textos: textos
    };

    updateCabecalho(indexCabecalho, novoValor);
  }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhosCirurgioes[${Number(indexCabecalho)}].textos.0`} {...register(`cabecalhosCirurgioes[${Number(indexCabecalho)}].textos.0`)}
        onBlur={(e) => {onChangeCirurgiao(e.target.value)}}
      />
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhosCirurgioes[${indexCabecalho}].textos.1`} {...register(`cabecalhosCirurgioes[${indexCabecalho}].textos.1`)}
        onBlur={(e) => {onChangeProcedimento(e.target.value)}}
      />
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[200px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#29664a]"
        onClick={() => insert(0, {nomeCirurgiao: "", nomeProcedimento: ""})}  
      >
        <p className='font-semibold text-center text-white'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[200px] h-[25px] px-1 bg-[#337B5B] hover:cursor-pointer hover:bg-red-500 hover:text-red-300"
        onClick={() => removeCabecalho(indexCabecalho)}
      >
        <p className='font-semibold text-center text-white'><FaTrashAlt className="w-[16px] h-[16px]"/></p>
      </div>
    </div>
  );
}

function LinhaTabela({procedimento, control, indexProcedimento, indexCabecalho, updateCabecalho,
    cirurgioes, remove, update, getValues, insert, move, fieldsProcedimentos, tamanhoArray}
  ) {
  let procedimentosFiltrados = filtrarProcedimentos(procedimento.nomeCirurgiao, cirurgioes);

  function moverLinhaParaCima(indexProcedimento) {
    if(indexProcedimento > 0) {
      move(indexProcedimento, indexProcedimento - 1)
    }
  }

  function moverLinhaParaBaixo(indexProcedimento) {
    if(tamanhoArray > indexProcedimento + 1) {
      move(indexProcedimento, indexProcedimento + 1)
    }
  }

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"cirurgiao." + indexProcedimento}
          defaultValue={procedimento.nomeCirurgiao}
          render={({ field }) => (
            <FormItem>
              <Select value={procedimento.nomeCirurgiao} onValueChange={(value) => { field.onChange(value); alterarCirurgiao(value, procedimento, indexProcedimento, update)}}>
                <FormControl className="w-[300px] h-[23px] border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cirurgião" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cirurgioes.map((cirurgiao, indexCirurgiao) => {
                    return(
                      <SelectItem value={cirurgiao.cirurgiao} key={"cirurgiao-"+cirurgiao.id+"-"+indexCirurgiao}>
                        {cirurgiao.cirurgiao}
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
          control={control}
          name={"procedimento." + indexProcedimento}
          render={({ field }) => (
            <FormItem>
              <Select value={procedimento.nomeProcedimento} onValueChange={(value) => { field.onChange(value); alterarProcedimento(value, procedimento, indexProcedimento, update, cirurgioes)}}>
                <FormControl className="w-[300px] h-[23px] border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um procedimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {procedimentosFiltrados.map((procedimento, indexProcedimento) => {
                    return(
                      <SelectItem value={procedimento.procedimento} key={"procedimento-"+procedimento.id+"-"+indexProcedimento}>
                        {procedimento.procedimento}
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
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => moverLinhaParaCima(indexProcedimento)}
      >
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => moverLinhaParaBaixo(indexProcedimento)}
      >
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => insert(indexProcedimento + 1, {nomeCirurgiao: "", nomeProcedimento: ""})}  
      >
        <p className='font-semibold text-center text-black'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-red-200 hover:text-red-600"
        onClick={() => remove(indexProcedimento)}
      >
        <FaTrashAlt className="w-[15px] h-[15px]"/>
      </div>
    </div>
  );
}

function filtrarProcedimentos(nomeCirurgiao, cirurgioes) {
  let cirurgiao = cirurgioes.find(cirurgiao => cirurgiao.cirurgiao == nomeCirurgiao);

  if (cirurgiao === undefined) {
    return [];
  }

  return cirurgiao.procedimentos;
}