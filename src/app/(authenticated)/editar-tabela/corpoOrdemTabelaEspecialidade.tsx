"use client"

import { FaArrowDown, FaArrowUp, FaTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";
 
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

export default function LinhasOrdemTabelaEspecialidade({ tabela, control, setValue, getValues, register, setTabela, especialidades, fields, remove }) {
  return (
    <div>
      {tabela.cabecalhosEspecialidades.map((cabecalho, indexCabecalho) => {
        return(
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho register={register} indexCabecalho={indexCabecalho} setValue={setValue}/>
            {fields.map((linha, indexEspecialidade) => { 
              let index = calcularIndex(indexCabecalho, tabela);

              if (estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index)) {
                return(
                  <LinhaTabela key={indexEspecialidade} linha={linha} especialidades={especialidades} remove={remove}
                    control={control} setValue={setValue} indexEspecialidade={indexEspecialidade}
                  />
                );
              }
            })}
          </div>
        );
      })}
    </div>
  )
}

function calcularIndex(indexCabecalho, tabela) {
  let index = indexCabecalho;

  if (indexCabecalho + 1 < tabela.cabecalhosEspecialidades.length) {
    index = indexCabecalho + 1;
  }

  return index;
}

function estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index) {
  return linha.posicao > cabecalho.posicao 
    && (
      linha.posicao < tabela.cabecalhosEspecialidades[index].posicao || 
      indexCabecalho + 1 === tabela.cabecalhosEspecialidades.length
    )
}

function LinhaCabecalho({ register, indexCabecalho, setValue }) {
  function onChange(value) {
    setValue("cabecalhos." + indexCabecalho + ".posicao", indexCabecalho);
    setValue("cabecalhos." + indexCabecalho + ".tipo", "ESPECIALIDADE_CABECALHO");
    setValue("cabecalhos." + indexCabecalho + ".textos.0.texto", value);
  }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhos.${indexCabecalho}.textos.0.texto`} {...register(`cabecalhos.${Number(indexCabecalho)}.textos.0.texto`)}
        onBlur={(e) => {onChange(e.target.value)}}
      />
      <div className="flex items-center justify-between border-black bg-[#337B5B] w-[300px] h-[25px]"></div>
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

function LinhaTabela({linha, control, setValue, especialidades, indexEspecialidade, remove}) {
  function onChange(value) {
    setValue("especialidade." + indexEspecialidade + ".especialidade", value);
    setValue("especialidade." + indexEspecialidade + ".posicao", linha.posicao);
    setValue("especialidade." + indexEspecialidade + ".tipo", "ESPECIALIDADE_LINHA");
  }

  let especialidade = {
    especialidade: linha.nomeEspecialidade,
    posicao: linha.posicao,
    tipo: "ESPECIALIDADE_LINHA"
  }

  return(
    <div className="flex items-center justify-between divide-x divide-y border-black bg-[#E2EFDB]">
      <div className="flex items-center justify-between border-black border-t w-[300px] h-[25px]">
        <FormField
          control={control}
          name={"especialidade." + indexEspecialidade}
          defaultValue={especialidade}
          render={({ field }) => (
            <FormItem>
              <Select value={linha.especialidade} onValueChange={(value) => { field.onChange(value); onChange(value); }}>
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
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowUp className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-black'><FaArrowDown className="w-[15px] h-[15px]"/></p>
      </div>
      <div className="flex items-center justify-center border-black w-[100px] h-[25px] px-1">
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

// function alterarTabelaBase(tabela, setTabela, indexCabecalho, posicaoRemovida) {
//   let novoTabela = {...tabela};

//   novoTabela.cabecalhosEspecialidades[indexCabecalho].linhasEspecialidades.map((especialidade, index) => {
//     if (especialidade.posicao === posicaoRemovida) {
//       novoTabela.cabecalhosEspecialidades[indexCabecalho].linhasEspecialidades.splice(index, 1);
//     }
//   });

//   novoTabela.cabecalhosEspecialidades[indexCabecalho].linhasEspecialidades.map((especialidade) => {
//     especialidade.posicao = calcularNovaPosicao(especialidade.posicao, posicaoRemovida);
//   });

//   setTabela(novoTabela);
// }

// function alterarFormulario(getValues, setValue, posicaoRemovida) {
//   let especialidadesWatch = getValues("especialidade");

//   especialidadesWatch.map((especialidade, index) => {
//     if (especialidade.posicao === posicaoRemovida) {
//       especialidadesWatch.splice(index, 1);
//     }
//   });

//   especialidadesWatch.map((especialidade) => {
//     especialidade.posicao = calcularNovaPosicao(especialidade.posicao, posicaoRemovida);
//   });

//   setValue("especialidade", especialidadesWatch);
// }

// function calcularNovaPosicao(posicaoAntiga, posicaoRemovida) {
//   if (posicaoAntiga > posicaoRemovida) {
//     return posicaoAntiga - 1;
//   } else {
//     return posicaoAntiga;
//   }
// }