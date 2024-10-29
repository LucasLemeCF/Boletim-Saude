"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CgSpinner } from "react-icons/cg";
import { z } from 'zod';
import { Form } from '../../../components/ui/form';
import { Toaster } from '../../../components/ui/toaster';
import { useToast } from '../../../components/ui/use-toast';
import { OrdemTabelaFormData } from '../../../schemas/responseOrdemTabela';
import ButtonLocal from '../../../utils/ButtonLocal';
import ConverterData from '../../../utils/converterData';
import LinhasOrdemTabelaCirurgiao from './corpoOrdemTabelaCirurgiao';
import LinhasOrdemTabelaEspecialidade from './corpoOrdemTabelaEspecialidade';
import HeaderEditarTabela from './headerEditarTabela';
import { montarCabecalhos, montarValoresCabecalhos, montarValoresLinhas } from './montarDadosOrdemTabela';

export default function Tabela() {
  const { data: session } = useSession();
  const [data, setData] = useState(new Date());
  
  return (
    <main className="flex flex-col items-center justify-between bg-[#F8FAFC] overscroll-none">
      <div className="flex flex-col items-center justify-between pt-[50px] pb-[25px]">
        <div className="flex flex-col items-center justify-between mt-0 mb-0 border-collapse">
          {
            session ?
            <ConteudoTabela dataCalendario={data} setData={setData} session={session}/>
            : CarregandoSession()
          }
        </div>
      </div>
    </main>
  )
}

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})
 
function ConteudoTabela({dataCalendario, setData, session}) {
  const [tabela, setTabela] = useState(null);
  const [especialidades, setEspecialidades] = useState(null)
  const [cirurgioes, setCirurgioes] = useState(null)
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();
  const imgRef = useRef(null);
  
  const { watch, register, handleSubmit, setValue, getValues, control } = useForm<OrdemTabelaFormData>({
    defaultValues: {
      cabecalhosEspecialidades: [],
      cabecalhosCirurgioes: [],
    }
    // defaultValues: {
    //   cabecalhos: [],
    //   especialidade: [],
    //   cirurgiao: [],
    //   procedimento: [],
    // }
  });
  const watchLinha = watch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const responseTabela = await fetch(process.env.NEXT_PUBLIC_API + '/api/ordem-tabela/' + ConverterData(dataCalendario), {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const responseTabelaJson = await responseTabela.json();
        setTabela(responseTabelaJson);
        setValue("cabecalhosEspecialidades", montarCabecalhos(responseTabelaJson));
        // setValue("cabecalhos", montarCabecalhos(responseTabelaJson));
        // setValue("especialidade", montarEspecialidade(responseTabelaJson));
        // setValue("procedimento", montarProcedimentos(responseTabelaJson));

        const responseEspecialidade = await fetch(process.env.NEXT_PUBLIC_API + '/api/especialidade/nomes', {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const responseEspecialidadeJson = await responseEspecialidade.json();
        setEspecialidades(responseEspecialidadeJson);

        const responseCirurgiao = await fetch(process.env.NEXT_PUBLIC_API + '/api/cirurgiao/nomes', {
          method: "GET",
          headers: {
            authorization: session?.user.token,
          },
        }); 
        const responseCirurgiaoJson = await responseCirurgiao.json();
        setCirurgioes(responseCirurgiaoJson);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataCalendario, getValues, session?.user.token, setValue]);

  useEffect(() => {
    // console.log(tabela);
  }, [tabela]);

  useEffect(() => {
    console.log(watchLinha);
  }, [watchLinha]);


  if (isLoading) return CarregandoSession()

  async function onSubmit() {
    const linhas = montarValoresLinhas(getValues());;
    const cabecalhos = montarValoresCabecalhos(getValues());

    const resultado = {
      data: ConverterData(dataCalendario),
      linhas: linhas,
      cabecalhos:cabecalhos
    }

    console.log(resultado);

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'authorization': session?.user.token,
    //   },
    //   body: JSON.stringify(resultado)
    // };

    // fetch(process.env.NEXT_PUBLIC_API + '/api/tabela', requestOptions).then(response => response)
    // toast({description: "Tabela salva com sucesso!"})
  }

  return (
    <>
      <div>   
        <HeaderEditarTabela data={dataCalendario} setData={setData}/> 
        {tabela != null ?
          <Form {...form}>
            <LinhasOrdemTabelaEspecialidade tabela={tabela} setTabela={setTabela} especialidades={especialidades}
              control={control} setValue={setValue} getValues={getValues} register={register}
            />
            <LinhasOrdemTabelaCirurgiao tabela={tabela} control={control} cirurgioes={cirurgioes}
             setValue={setValue} register={register} setTabela={setTabela}
            />
            <div className="flex items-center justify-end gap-8 w-full mt-8">
              <ButtonLocal texto={"Salvar"} color={"bg-green-800"} onClick={handleSubmit(onSubmit)} type={"button"} icon={"Salvar"}/>
            </div>
          </Form>
          : <DadosNaoEncontrados/>      
        }
      </div>
      <Toaster/>
    </>
  )
}

function CarregandoSession() {
  return (
    <div className="bg-[#337B5B] w-40 h-16 border rounded-[5px] text-white flex items-center justify-center">
      <CgSpinner className="animate-spin h-5 w-5 mr-1"/>
      <p>Carregando...</p>
    </div>
  )
}

function DadosNaoEncontrados() {
  return (
    <div className="bg-[#E2EFDB] w-full min-w-40 h-[100px] border border-black flex items-center justify-center">
      <p>Não foi possível encontrar tabelas cadastradas</p>
    </div>
  )
}