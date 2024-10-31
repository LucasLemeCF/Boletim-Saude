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

export default function LinhasOrdemTabelaCirurgiao({ tabela, control, setValue, register, cirurgioes, getValues }) {
  const { fields: fieldsCabecalho, update: updateCabecalho } = useFieldArray({
    name: `cabecalhosCirurgioes`,
    control,
  });
  
  let qtdCabecalhosEspecialidade = tabela.cabecalhosEspecialidades.length;

  return (
    <div>
      {fieldsCabecalho.map((cabecalho, indexCabecalho) => {
        const { fields: fieldsProcedimentos, remove, update, insert, move } = useFieldArray({
          name: `cabecalhosCirurgioes[${indexCabecalho}].listaProcedimentos`,
          control,
        });

        return (
          <div className="border border-t-0 border-black" key={indexCabecalho}>
            <LinhaCabecalho cabecalho={cabecalho} key={"cabecalho-"+indexCabecalho} indexCabecalho={indexCabecalho} 
              setValue={setValue} register={register} qtdCabecalhosEspecialidade={qtdCabecalhosEspecialidade} fieldsCabecalho={fieldsCabecalho}
            />
            {fieldsProcedimentos.map((procedimento, indexProcedimento) => { 
              return(
                <LinhaTabela key={indexProcedimento} procedimento={procedimento} cirurgioes={cirurgioes} remove={remove} update={update}
                control={control} indexProcedimento={indexProcedimento} indexCabecalho={indexCabecalho} updateCabecalho={updateCabecalho}
                getValues={getValues} insert={insert} move={move} fieldsProcedimentos={fieldsProcedimentos}            />
              );
            })}
          </div>
        )
      })}
    </div>
  )
}

function LinhaCabecalho({cabecalho, indexCabecalho, setValue, register, qtdCabecalhosEspecialidade, fieldsCabecalho}) {
  // let index = indexCabecalho + qtdCabecalhosEspecialidade

  // function onChangeCirurgiao(value) {
  //   setValue("cabecalhos." + index + ".posicao", cabecalho);
  //   setValue("cabecalhos." + index + ".tipo", "ESPECIALIDADE_CABECALHO");
  //   setValue("cabecalhos." + index + ".textos.0.texto", value);
  // }

  // function onChangeProcedimento(value) {
  //   setValue("cabecalhos." + index + ".posicao", cabecalho);
  //   setValue("cabecalhos." + index + ".tipo", "ESPECIALIDADE_CABECALHO");
  //   setValue("cabecalhos." + index + ".textos.1.texto", value);
  // }

  return (
    <div className="flex items-center justify-between divide-x bg-[#E2EFDB]">
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhosCirurgioes[${Number(indexCabecalho)}].textos.0`} {...register(`cabecalhosCirurgioes[${Number(indexCabecalho)}].textos.0`)}
        // onBlur={(e) => {onChangeCirurgiao(e.target.value)}}
      />
      <input className="flex items-center justify-between border-black font-semibold text-center text-white bg-[#337B5B] w-[300px] h-[25px] focus:border-[#337B5B] focus:border-2 focus:outline-none focus:ring-0" 
        placeholder="Insira o nome do cabeçalho"
        name={`cabecalhosCirurgioes[${indexCabecalho}].textos.1`} {...register(`cabecalhosCirurgioes[${indexCabecalho}].textos.1`)}
        // onBlur={(e) => {onChangeProcedimento(e.target.value)}}
      />
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
      <div className="flex items-center justify-center border-black bg-[#337B5B] w-[100px] h-[25px] px-1">
        <p className='font-semibold text-center text-white'><FaTrashAlt className="w-[16px] h-[16px]"/></p>
      </div> */}
    </div>
  );
}

function LinhaTabela({procedimento, control, indexProcedimento, indexCabecalho, updateCabecalho,
    cirurgioes, remove, update, getValues, insert, move, fieldsProcedimentos}
  ) {
  let procedimentosFiltrados = filtrarProcedimentos(procedimento.nomeCirurgiao, cirurgioes);
  
  function alterarCirurgiao(value) {
    let novoValor = {
      ...procedimento, 
      nomeCirurgiao: value
    };

    update(indexProcedimento, novoValor);
  }

  function alterarProcedimento(value) {
    let novoValor = {
      ...procedimento,
      nomeProcedimento: value,
      idProcedimento: buscarIdProcedimento(value, procedimento.nomeCirurgiao, cirurgioes)
    };

    update(indexProcedimento, novoValor);
  }

  function removerLinha() {
    remove(indexProcedimento);
    // alterarPosicaoProcedimento(procedimento.posicao, updateCabecalho, getValues);
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
              <Select onValueChange={(value) => { field.onChange(value); alterarCirurgiao(value); }} defaultValue={procedimento.nomeCirurgiao}>
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
              <Select onValueChange={(value) => { field.onChange(value); alterarProcedimento(value); }} defaultValue={procedimento.nomeProcedimento}>
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
        onClick={() => removerLinha()}
      >
        <FaTrashAlt className="w-[15px] h-[15px]"/>
      </div>
    </div>
  );
}

function filtrarProcedimentos(nomeCirurgiao, cirurgioes) {
  let cirurgiao = cirurgioes.find(cirurgiao => cirurgiao.cirurgiao == nomeCirurgiao);
  return cirurgiao.procedimentos;
}

function buscarIdProcedimento(nomeProcedimento, nomeCirurgiao, cirurgioes) {
  let idProcedimento = undefined;

  cirurgioes.map(cirurgiao => {
    if (cirurgiao.cirurgiao == nomeCirurgiao) {
      cirurgiao.procedimentos.map(procedimento => {
        if(procedimento.procedimento == nomeProcedimento) {
          idProcedimento = procedimento.id;
        }
      });
    }
  });

  return idProcedimento;
}

function alterarPosicaoProcedimento(posicaoRemovida, updateCabecalho, getValues) {
  const tabela = getValues();

  tabela.cabecalhosEspecialidades.map((cabecalho, indexCabecalho) => {
    let novoCabecalho = {
      ...cabecalho
    }

    if (cabecalho.posicao > posicaoRemovida) {
      let novaPosicao = calcularNovaPosicao(cabecalho.posicao, posicaoRemovida);
      
      novoCabecalho = {
        ...novoCabecalho,
        posicao: novaPosicao
      };
    }

    const linhasEspecialidades: any[] = [];
    
    cabecalho.linhasEspecialidades.map((linha) => {
      const index = calcularIndex(indexCabecalho, tabela);

      if (estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index)) {
        let novaPosicao = calcularNovaPosicao(linha.posicao, posicaoRemovida);

        let novaLinha = {
          ...linha,
          posicao: novaPosicao
        };

        linhasEspecialidades.push(novaLinha);
      }
    });

    novoCabecalho = {
      ...novoCabecalho,
      linhasEspecialidades: linhasEspecialidades
    };

    updateCabecalho(indexCabecalho, novoCabecalho);
  });
}

function calcularNovaPosicao(posicaoAntiga, posicaoRemovida) {
  if (posicaoAntiga > posicaoRemovida) {
    return posicaoAntiga - 1;
  } else {
    return posicaoAntiga;
  }
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
