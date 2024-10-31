export function atualizarLinha(value, linha, especialidades, indexEspecialidade, update) {
    let novoValor = {
      ...linha,
      nomeEspecialidade: value,
      idEspecialidade: buscarIdEspecialidade(value, especialidades)
    };

    update(indexEspecialidade, novoValor);
}

export function adicionarLinha(indexEspecialidade, insert, linha, updateCabecalho, getValues) {
    const index = indexEspecialidade + 1;
    const novaPosicao = linha.posicao + 1;
    alterarPosicaoEspecialidadesAdicionado(novaPosicao, updateCabecalho, getValues);
    insert(index, {nomeEspecialidade: "", posicao: novaPosicao});
}

export function removerEspecialidade(remove, indexEspecialidade, linha, updateCabecalho, getValues) {
    remove(indexEspecialidade);
    alterarPosicaoEspecialidades(linha.posicao, updateCabecalho, getValues);
}

export function descer(indexEspecialidade, fieldsEspecialidades, linha, update, move) {
    if (indexEspecialidade + 1 < fieldsEspecialidades.length) {
        fieldsEspecialidades.map((especialidade) => {
        if (especialidade.posicao === linha.posicao) {
            let novaEspecialidade = {
                ...especialidade,
                posicao: linha.posicao + 1
            };

            update(indexEspecialidade, novaEspecialidade);
        } else if (especialidade.posicao === linha.posicao + 1) {
            let novaEspecialidade = {
                ...especialidade,
                posicao: linha.posicao
            };

            update(indexEspecialidade + 1, novaEspecialidade);
        }
        });

        move(indexEspecialidade, indexEspecialidade + 1);
    }
}

export function subir(indexEspecialidade, fieldsEspecialidades, linha, update, move) {
    if (indexEspecialidade > 0) {
      fieldsEspecialidades.map((especialidade) => {
        if (especialidade.posicao === linha.posicao) {
            let novaEspecialidade = {
                ...especialidade,
                posicao: linha.posicao - 1
            };

          update(indexEspecialidade, novaEspecialidade);
        } else if (especialidade.posicao === linha.posicao - 1) {
            let novaEspecialidade = {
                ...especialidade,
                posicao: linha.posicao
            };

          update(indexEspecialidade - 1, novaEspecialidade);
        }
      });

      move(indexEspecialidade, indexEspecialidade - 1);
    }
}

function alterarPosicaoEspecialidades(posicaoRemovida, updateCabecalho, getValues) {
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

function alterarPosicaoEspecialidadesAdicionado(posicaoAdicionada, updateCabecalho, getValues) {
    const tabela = getValues();

    tabela.cabecalhosEspecialidades.map((cabecalho, indexCabecalho) => {
        let novoCabecalho = {
        ...cabecalho
        }

        if (cabecalho.posicao >= posicaoAdicionada) {
        let novaPosicao = calcularNovaPosicaoAdicao(cabecalho.posicao, posicaoAdicionada);
        
        novoCabecalho = {
            ...novoCabecalho,
            posicao: novaPosicao
        };
        }

        const linhasEspecialidades: any[] = [];
        
        cabecalho.linhasEspecialidades.map((linha) => {
        const index = calcularIndex(indexCabecalho, tabela);

        if (estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index)) {
            let novaPosicao = calcularNovaPosicaoAdicao(linha.posicao, posicaoAdicionada);

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

function calcularNovaPosicaoAdicao(posicaoAntiga, posicaoRemovida) {
    if (posicaoAntiga >= posicaoRemovida) {
        return posicaoAntiga + 1;
    } else {
        return posicaoAntiga;
    }
}

function buscarIdEspecialidade(nomeEspecialidade, especialidades) {
    let idEspecialidade = undefined;

    especialidades.map((especialidade) => {
        if (especialidade.especialidade === nomeEspecialidade) {
        idEspecialidade = especialidade.id;
        }
    });

    return idEspecialidade;
}