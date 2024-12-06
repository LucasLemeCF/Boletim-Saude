
export function montarValoresLinhas(tabela) {
    const linhas: any[] = [];

    if (tabela !== null) {
        let posicaoAtual = 0;

        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            posicaoAtual++;

            cabecalho.linhasEspecialidades.map((especialidade) => {
                posicaoAtual++;

                linhas.push({
                    posicao: posicaoAtual,
                    tipo: "ESPECIALIDADE_LINHA",
                    componenteId: especialidade.idEspecialidade,
                });
            });
        });

        tabela.cabecalhosCirurgioes.map((cirurgiao) => {
            posicaoAtual++;

            cirurgiao.listaProcedimentos.map((procedimento) => {
                posicaoAtual++;

                linhas.push({
                    posicao: posicaoAtual,
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

    let posicaoAtual = 0;

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            posicaoAtual++;

            cabecalhos.push({
                posicao: posicaoAtual,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0],
                    }
                ]
            });

            cabecalho.linhasEspecialidades.map(() => {
                posicaoAtual++;
            });
        });

        tabela.cabecalhosCirurgioes.map((cirurgiao) => {
            posicaoAtual++;

            cabecalhos.push({
                posicao: posicaoAtual,
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

            cirurgiao.listaProcedimentos.map(() => {
                posicaoAtual++;
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