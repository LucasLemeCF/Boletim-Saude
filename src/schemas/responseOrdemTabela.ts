import * as z from "zod";

const listaProcedimentos = z.object({
    posicao: z.number(),
    idProcedimento: z.number(),
    nomeCirurgiao: z.string(),
    nomeProcedimento: z.string(),
})

const cabecalhosCirurgioes = z.object({
    posicao: z.number(),
    idEspecialidade: z.number(),
    listaProcedimentos: z.array(listaProcedimentos),
})

const linhasEspecialidades = z.object({
    posicao: z.number(),
    idEspecialidade: z.number(),
    nomeEspecialidade: z.string(),
})

const cabecalhosEspecialidades = z.object({
    posicao: z.number(),
    textos: z.array(z.string()),
    linhasEspecialidades: z.array(linhasEspecialidades),
})

export const dadosOrdemTabelaSchema = z.object({
    cabecalhosEspecialidades: z.array(cabecalhosEspecialidades),
    cabecalhosCirurgioes: z.array(cabecalhosCirurgioes),
})

export type OrdemTabelaFormData = z.infer<typeof dadosOrdemTabelaSchema>;