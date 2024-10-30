
export function montarValoresLinhas(tabela) {
    const linhas: any[] = [];

    if (tabela !== null) {
        tabela.cabecalhosEspecialidades.map((cabecalho) => {
            cabecalho.linhasEspecialidades.map((especialidade) => {
                linhas.push({
                    posicao: especialidade.posicao,
                    tipo: "ESPECIALIDADE_LINHA",
                    componenteId: especialidade.especialidade,
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

// export function montarCabecalhos(tabela) {
//     const cabecalhos: any[] = [];

//     if (tabela !== null) {
//         tabela.cabecalhosEspecialidades.map((cabecalho) => {
//             cabecalhos.push({
//                 posicao: cabecalho.posicao,
//                 tipo: "ESPECIALIDADE_CABECALHO",
//                 textos: [
//                     {
//                         texto: cabecalho.textos[0],
//                     }
//                 ]
//             });
//         });

//         tabela.cabecalhosCirurgioes.map((cabecalho) => {
//             cabecalhos.push({
//                 posicao: cabecalho.posicao,
//                 tipo: "CIRURGIAO_CABECALHO",
//                 textos: [
//                     {
//                         texto: cabecalho.textos[0],
//                     },
//                     {
//                         texto: cabecalho.textos[1],
//                     }
//                 ]
//             });
//         });
//     }
   
//     return cabecalhos;
// }

export function montarCabecalhos(tabela) {
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

export function montarTabela(dadosTabela, especialidades, procedimentosCirurgioes) {
    let resultado = {} as any;

    if (dadosTabela !== null && especialidades !== null) {
        resultado = {
            cabecalhosEspecialidade: montarCabecalhosEspecialidade(dadosTabela),
            cabecalhosCirurgioes: montarCabecalhosCirurgioes(dadosTabela),
            linhasEspecialdades: montarLinhasEspecialidades(dadosTabela, especialidades),
            linhasCirurgioes: montarLinhasCirurgioes(dadosTabela, procedimentosCirurgioes),
        }
    }

    return resultado
}

function montarCabecalhosEspecialidade(dadosTabela) {
    const cabecalhos = [] as any;

    dadosTabela.cabecalhosTabela.map((cabecalho) => {
        if (cabecalho.tipo == "ESPECIALIDADE_CABECALHO") {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "ESPECIALIDADE_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    }
                ]
            });
        }
    });

    return cabecalhos;
}

function montarCabecalhosCirurgioes(dadosTabela) {
    const cabecalhos = [] as any;

    dadosTabela.cabecalhosTabela.map((cabecalho) => {
        if (cabecalho.tipo == "CIRURGIAO_CABECALHO") {
            cabecalhos.push({
                posicao: cabecalho.posicao,
                tipo: "CIRURGIAO_CABECALHO",
                textos: [
                    {
                        texto: cabecalho.textos[0].texto,
                    },
                    {
                        texto: cabecalho.textos[1].texto,
                    }
                ]
            });
        }
    });

    return cabecalhos;
}

function montarLinhasEspecialidades(dadosTabela, especialidades) {
    const linhas = [] as any;

    dadosTabela.linhasTabela.map((linha) => {
        if (linha.tipo == "ESPECIALIDADE_LINHA") {
            linhas.push({
                posicao: linha.posicao,
                tipo: "ESPECIALIDADE_LINHA",
                nomeCirurgiao: buscarNomeEspecialidade({linha, especialidades}),
                componenteId: linha.componenteId,
            });
        }
    });

    return linhas;
}

function montarLinhasCirurgioes(dadosTabela, procedimentosCirurgioes) {
    const linhas = [] as any;

    dadosTabela.linhasTabela.map((linha) => {
        if (linha.tipo == "CIRURGIAO_LINHA") {
            linhas.push({
                posicao: linha.posicao,
                tipo: "CIRURGIAO_LINHA",
                componenteId: linha.componenteId,
            });
        }
    });

    return linhas;
}

function buscarNomeEspecialidade({linha, especialidades}) {
    let nomeEspecialidade = "";
  
    especialidades.map((especialidade) => {
      if (especialidade.id == linha.componenteId) {
        nomeEspecialidade = especialidade.especialidade;
      }
    });
  
    return nomeEspecialidade;
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