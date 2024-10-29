import * as z from "zod";

const procedimento = z.object({
    cirurgiao: z.string(),
    posicao: z.number(),
    procedimento: z.string(),
    tipo: z.string(),
})

const texto = z.object({
    texto: z.string(),
})

const especialidade = z.object({
    posicao: z.number(),
    tipo: z.string(),
    especialidade: z.string(),
})

export const cabecalhosTabela = z.object({
    posicao: z.number(),
    tipo: z.string(),
    textos: z.array(texto),
})

export const dadosOrdemTabelaSchema = z.object({
    cabecalhos: z.array(cabecalhosTabela),
    cirurgiao: z.array(z.string()),
    especialidade: z.array(especialidade),
    procedimento: z.array(procedimento),
})

export type OrdemTabelaFormData = z.infer<typeof dadosOrdemTabelaSchema>;