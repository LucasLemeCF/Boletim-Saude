package boletimdasaude.application.responses.ordemTabela;

import java.util.List;

public record CabecalhoEspecialidadeResponse(
        Long posicao,
        List<String> textos,
        List<LinhaEspecialidadeResponse> linhasEspecialidades
) {
}
