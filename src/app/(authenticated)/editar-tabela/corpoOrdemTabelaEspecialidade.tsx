"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
 
import { useFieldArray } from "react-hook-form";
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
  SelectValue
} from "../../../components/ui/select";
import { adicionarLina, atualizarLinha, descer, removerEspecialidade, subir } from "./modificarLinhaEspecialidade";

export default function LinhasOrdemTabelaEspecialidade({ control, getValues, register, especialidades }) {  
  const { fields: fieldsCabecalho, update: updateCabecalho } = useFieldArray({
    name: `cabecalhosEspecialidades`,
    control,
  });

  return (
    <div>
      {fieldsCabecalho.map((cabecalho, indexCabecalho) => {
        const { fields: fieldsEspecialidades, remove, update, insert, move } = useFieldArray({
          name: `cabecalhosEspecialidades[${indexCabecalho}].linhasEspecialidades`,
          control,
        });

        return(
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho register={register} indexCabecalho={indexCabecalho} 
              updateCabecalho={updateCabecalho} fieldsCabecalho={fieldsCabecalho} 
            />
            {fieldsEspecialidades.map((linha, indexEspecialidade) => { 
              return(
                <LinhaTabela key={indexEspecialidade} linha={linha} especialidades={especialidades} remove={remove} update={update} updateCabecalho={updateCabecalho} 
                  control={control} indexEspecialidade={indexEspecialidade} indexCabecalho={indexCabecalho} getValues={getValues} insert={insert} move={move} fieldsEspecialidades={fieldsEspecialidades}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  )
}

function LinhaCabecalho({ register, indexCabecalho, fieldsCabecalho, updateCabecalho }) {
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
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[400px] h-[25px]"></div>
      {/* <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowUp className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaArrowDown className="w-[16px] h-[16px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 bg-[#337B5B] hover:cursor-pointer hover:bg-red-500 hover:text-red-300">
        <p className='font-semibold text-center text-white'><FaTrashAlt className="w-[16px] h-[16px]"/></p>
      </div> */}
    </div>
  );
}

function LinhaTabela({linha, control, getValues, especialidades, indexCabecalho, indexEspecialidade, remove, update, updateCabecalho, insert, move, fieldsEspecialidades}) {
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
        onClick={() => subir(indexEspecialidade, fieldsEspecialidades, linha, update, move)}
      >
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => descer(indexEspecialidade, fieldsEspecialidades, linha, update, move)}
      >
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-[#d2dfcc]"
        onClick={() => adicionarLina(indexEspecialidade, insert, linha, updateCabecalho, getValues)}
      >
        <p className='font-semibold text-center text-black'><RiMenuAddLine className="w-[18px] h-[18px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1 hover:cursor-pointer hover:bg-red-200 hover:text-red-600"
        onClick={() => removerEspecialidade(remove, indexEspecialidade, linha, updateCabecalho, getValues)}
      >
        <FaTrashAlt className="w-[15px] h-[15px]"/>
      </div>
    </div>
  );
}