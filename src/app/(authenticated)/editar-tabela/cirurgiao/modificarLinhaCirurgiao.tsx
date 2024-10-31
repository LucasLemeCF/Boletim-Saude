export function alterarCirurgiao(value, procedimento, indexProcedimento, update) {
  let novoValor = {
    ...procedimento, 
    nomeCirurgiao: value
  };

  update(indexProcedimento, novoValor);
}

export function alterarProcedimento(value, procedimento, indexProcedimento, update, cirurgioes) {
  let novoValor = {
    ...procedimento,
    nomeProcedimento: value,
    idProcedimento: buscarIdProcedimento(value, procedimento.nomeCirurgiao, cirurgioes)
  };

  update(indexProcedimento, novoValor);
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

export function removerLinha(remove, indexProcedimento, procedimento, updateCabecalho, getValues) {
  remove(indexProcedimento);
  alterarPosicaoProcedimento(procedimento.posicao, updateCabecalho, getValues);
}
  
function alterarPosicaoProcedimento(posicaoRemovida, updateCabecalho, getValues) {
  const tabela = getValues();

  tabela.cabecalhosCirurgioes.map((cabecalho, indexCabecalho) => {
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

    const listaProcedimentos: any[] = [];
    
    cabecalho.listaProcedimentos.map((linha) => {
      const index = calcularIndex(indexCabecalho, tabela);

      if (estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index)) {
        let novaPosicao = calcularNovaPosicao(linha.posicao, posicaoRemovida);

        let novaLinha = {
          ...linha,
          posicao: novaPosicao
        };

        listaProcedimentos.push(novaLinha);
      }
    });

    novoCabecalho = {
      ...novoCabecalho,
      listaProcedimentos: listaProcedimentos
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

  if (indexCabecalho + 1 < tabela.cabecalhosCirurgioes.length) {
    index = indexCabecalho + 1;
  }

  return index;
}
  
function estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index) {
  return linha.posicao > cabecalho.posicao 
    && (
      linha.posicao < tabela.cabecalhosCirurgioes[index].posicao || 
      indexCabecalho + 1 === tabela.cabecalhosCirurgioes.length
    )
}

export function adicionarLinha(indexProcedimento, insert, procedimento, updateCabecalho, getValues) {
  const index = indexProcedimento + 1;
  const novaPosicao = procedimento.posicao + 1;
  alterarPosicaoEspecialidadesAdicionado(novaPosicao, updateCabecalho, getValues);
  insert(index, {nomeCirurgiao: "", nomeProcedimento: "", posicao: novaPosicao});
}

function alterarPosicaoEspecialidadesAdicionado(posicaoAdicionada, updateCabecalho, getValues) {
  const tabela = getValues();

  tabela.cabecalhosCirurgioes.map((cabecalho, indexCabecalho) => {
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

    const listaProcedimentos: any[] = [];
    
    cabecalho.listaProcedimentos.map((linha) => {
    const index = calcularIndex(indexCabecalho, tabela);

    if (estaNoInterValoDoCabecalho(linha, cabecalho, indexCabecalho, tabela, index)) {
      let novaPosicao = calcularNovaPosicaoAdicao(linha.posicao, posicaoAdicionada);

      let novaLinha = {
        ...linha,
        posicao: novaPosicao
      };

      listaProcedimentos.push(novaLinha);
    }
    });

    novoCabecalho = {
      ...novoCabecalho,
      listaProcedimentos: listaProcedimentos
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

export function descer(indexProcedimento, fieldsProcedimentos, linha, update, move) {
  if (indexProcedimento + 1 < fieldsProcedimentos.length) {
    fieldsProcedimentos.map((procedimento) => {
      if (procedimento.posicao === linha.posicao) {
        let novaEspecialidade = {
          ...procedimento,
          posicao: linha.posicao + 1
        };

        update(indexProcedimento, novaEspecialidade);
      } else if (procedimento.posicao === linha.posicao + 1) {
        let novaEspecialidade = {
          ...procedimento,
          posicao: linha.posicao
        };

        update(indexProcedimento + 1, novaEspecialidade);
      }
    });

    move(indexProcedimento, indexProcedimento + 1);
  }
}

export function subir(indexProcedimento, fieldsProcedimentos, linha, update, move) {
  if (indexProcedimento > 0) {
    fieldsProcedimentos.map((procedimento) => {
      if (procedimento.posicao === linha.posicao) {
          let novaEspecialidade = {
            ...procedimento,
            posicao: linha.posicao - 1
          };

        update(indexProcedimento, novaEspecialidade);
      } else if (procedimento.posicao === linha.posicao - 1) {
          let novaEspecialidade = {
            ...procedimento,
            posicao: linha.posicao
          };

        update(indexProcedimento - 1, novaEspecialidade);
      }
    });

    move(indexProcedimento, indexProcedimento - 1);
  }
}