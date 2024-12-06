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
import { atualizarLinha } from "./atualizarLinhaEspecialidade";

export default function LinhasOrdemTabelaEspecialidade({ control, register, especialidades }) {  
  const { fields: fieldsCabecalho, update: updateCabecalho, append: appendCabecalho, remove: removeCabecalho, move: moveCabecalho } = useFieldArray({
    name: `cabecalhosEspecialidades`,
    control,
  });

  return (
    <div>
      {fieldsCabecalho.map((cabecalho, indexCabecalho) => {
        return (
          <Cabecalho key={indexCabecalho} indexCabecalho={indexCabecalho} control={control} register={register} especialidades={especialidades}
            fieldsCabecalho={fieldsCabecalho} updateCabecalho={updateCabecalho} removeCabecalho={removeCabecalho} moveCabecalho={moveCabecalho}
          />
        );
      })}
      <button className="border-black font-semibold text-center pl-2 border-r-2 border-b-2 border-l-2 text-white bg-[#337B5B] w-[1002px]"
        onClick={() => {
          appendCabecalho({linhasEspecialidades: [], textos: [""]})
      }}  
      >
        + Adicionar cabeçalho de especialidade
      </button>
    </div>
  )
}

function Cabecalho({ indexCabecalho, control, register, fieldsCabecalho, 
    updateCabecalho, especialidades, removeCabecalho, moveCabecalho }
  ) {
  const { fields: fieldsEspecialidades, remove, update, insert, move, append } = useFieldArray({
    name: `cabecalhosEspecialidades[${indexCabecalho}].linhasEspecialidades`,
    control,
  });

  return(
    <div className="border border-t-0 border-black" key={indexCabecalho}>
      <LinhaCabecalho register={register} indexCabecalho={indexCabecalho} removeCabecalho={removeCabecalho}
        updateCabecalho={updateCabecalho} fieldsCabecalho={fieldsCabecalho} insert={insert} moveCabecalho={moveCabecalho}
      />
      {fieldsEspecialidades.map((linha, indexEspecialidade) => { 
        return(
          <LinhaTabela key={indexEspecialidade} linha={linha} especialidades={especialidades} remove={remove} update={update}
            control={control} indexEspecialidade={indexEspecialidade} indexCabecalho={indexCabecalho} insert={insert} move={move} tamanhoArray={fieldsEspecialidades.length}
          />
        );
      })}
    </div>
  );
}

function LinhaCabecalho({ register, indexCabecalho, fieldsCabecalho, updateCabecalho, insert, removeCabecalho, moveCabecalho }) {
  function onChange(value) {
    let novoValor = {
      ...fieldsCabecalho[indexCabecalho],
      textos: [value]
    };

    updateCabecalho(indexCabecalho, novoValor);
  }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhosEspecialidades.${Number(indexCabecalho)}.textos.0`} {...register(`cabecalhosEspecialidades.${Number(indexCabecalho)}.textos.0`)}
        onBlur={(e) => {onChange(e.target.value)}}
      />
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[300px] h-[25px]"></div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[200px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#29664a]"
        onClick={() => insert(0, {nomeEspecialidade: ""})}  
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

function LinhaTabela({linha, control, especialidades, indexCabecalho, indexEspecialidade, remove, update, insert, move, tamanhoArray}) {
  function moverLinhaParaCima(indexEspecialidade) {
    if(indexEspecialidade > 0) {
      move(indexEspecialidade, indexEspecialidade - 1)
    }
  }
  
  function moverLinhaParaBaixo(indexEspecialidade) {
    if(tamanhoArray > indexEspecialidade + 1) {
      move(indexEspecialidade, indexEspecialidade + 1)
    }
  }
  
  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={`cabecalhosEspecialidades[${indexCabecalho}].linhasEspecialidades[${indexEspecialidade}].nomeEspecialidade`}
          defaultValue={linha.nomeEspecialidade}
          render={({ field }) => (
            <FormItem>
              <Select value={linha.nomeEspecialidade} onValueChange={(value) => { field.onChange(value); atualizarLinha(value, linha, especialidades, indexEspecialidade, update); }}>
                <FormControl className="w-[300px] h-[23px] border-none hover:bg-[#d2dfcc]">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {especialidades.map((especialidade, index) => {
                    return(
                      <SelectItem 
                        value={especialidade.especialidade}
                        key={index}
                      >
                        {especialidade.especialidade}
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
      <div className="flex items-center justify-between border-black w-[300px] h-[25px]"></div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => moverLinhaParaCima(indexEspecialidade)}
      >
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => moverLinhaParaBaixo(indexEspecialidade)}
      >
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => insert(0, {nomeEspecialidade: ""})}  
      >
        <p className='font-semibold text-center text-black'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-red-200 hover:text-red-600"
        onClick={() => remove(indexEspecialidade)}
      >
        <FaTrashAlt className="w-[15px] h-[15px]"/>
      </div>
    </div>
  );
}