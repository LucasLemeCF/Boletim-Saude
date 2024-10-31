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

export function removerLinha(remove, indexProcedimento) {
  remove(indexProcedimento);
  // alterarPosicaoProcedimento(procedimento.posicao, updateCabecalho, getValues);
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
  