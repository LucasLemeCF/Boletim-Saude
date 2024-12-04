
export function montarValoresLinhas(tabela) {
    const linhas: any[] = [];

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            cabecalho.linhasEspecialidades.map((especialidade) => {
                linhas.push({
                    posicao: especialidade.posicao,
                    tipo: "ESPECIALIDADE_LINHA",
                    componenteId: especialidade.idEspecialidade,
                });
            });
        });

        tabela.cabecalhosCirurgioes.map((cirurgiao) => {
            cirurgiao.listaProcedimentos.map((procedimento) => {
                linhas.push({
                    posicao: procedimento.posicao,
                    tipo: "CIRURGIAO_LINHA",
                    componenteId: procedimento.idProcedimento,
                });
            });
        });
    }

    return linhas;
}

export function montarCabecalhosEspecialidades(tabela) {
    const cabecalhosEspecialidades: any[] = [];

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            const linhasEspecialidades: any[] = [];

            cabecalho.linhasEspecialidades.map((especialidade) => {
                linhasEspecialidades.push({
                    posicao: especialidade.posicao,
                    idEspecialidade: especialidade.idEspecialidade,
                    nomeEspecialidade: especialidade.nomeEspecialidade,
                });
            });

            cabecalhosEspecialidades.push({
                posicao: cabecalho.posicao,
                textos: [cabecalho.textos[0]],
                linhasEspecialidades: linhasEspecialidades
            });
        });
    }
   
    return cabecalhosEspecialidades;
}

export function montarCabecalhosCirurgioes(tabela) {
    const cabecalhosCirurgioes: any[] = [];

    if (tabela !== null) {
        tabela.cabecalhosCirurgioes.map((cabecalho) => {
            const listaProcedimentos: any[] = [];

            cabecalho.listaProcedimentos.map((procedimento) => {
                listaProcedimentos.push({
                    posicao: procedimento.posicao,
                    idProcedimento: procedimento.idProcedimento,
                    nomeCirurgiao: procedimento.nomeCirurgiao,
                    nomeProcedimento: procedimento.nomeProcedimento,
                });
            });

            cabecalhosCirurgioes.push({
                posicao: cabecalho.posicao,
                textos: [cabecalho.textos[0], cabecalho.textos[1]],
                listaProcedimentos: listaProcedimentos
            });
        });
    }

    return cabecalhosCirurgioes;
}

export function montarValoresCabecalhos(tabela) {
    const cabecalhos = [] as any;

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0],
                    }
                ]
            });
        });

        tabela.cabecalhosCirurgioes.map((cirurgiao) => {
            cabecalhos.push({
                posicao: cirurgiao.posicao,
                tipo: "CIRURGIAO_CABECALHO",
                textos: [
                    {
                        texto: cirurgiao.textos[0],
                    },
                    {
                        texto: cirurgiao.textos[1],
                    }
                ]
            });
        });
    }

    return cabecalhos;
}

export function montarEspecialidade(dadosTabela) {
    const especialidades = [] as any;

    if (dadosTabela !== undefined) {
        dadosTabela.cabecalhosEspecialidades.map((cabecalho) => {
            cabecalho.linhasEspecialidades.map((especialidade) => {
                especialidades.push({
                    posicao: especialidade.posicao,
                    tipo: "ESPECIALIDADE_LINHA",
                    especialidade: especialidade.nomeEspecialidade,
                });
            });
        });
    }

    return especialidades;
}

export function montarProcedimentos(dadosTabela) {
    const procedimentos = [] as any;

    if (dadosTabela !== undefined) {
        dadosTabela.cabecalhosCirurgioes.map((cabecalho) => {
            cabecalho.listaProcedimentos.map((procedimento) => {
                procedimentos.push({
                    posicao: procedimento.posicao,
                    tipo: "CIRURGIAO_LINHA",
                    procedimento: procedimento.nomeCirurgiao,
                });
            });
        });
    }

    return procedimentos;
}