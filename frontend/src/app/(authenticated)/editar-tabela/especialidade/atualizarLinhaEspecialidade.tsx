export function atualizarLinha(value, linha, especialidades, indexEspecialidade, update) {
    let novoValor = {
      ...linha,
      nomeEspecialidade: value,
      idEspecialidade: buscarIdEspecialidade(value, especialidades)
    };

    update(indexEspecialidade, novoValor);
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