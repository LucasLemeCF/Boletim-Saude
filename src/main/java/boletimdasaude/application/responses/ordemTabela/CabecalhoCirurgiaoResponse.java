package boletimdasaude.application.responses.ordemTabela;

import java.util.List;

public record CabecalhoCirurgiaoResponse(
        Long posicao,
        List<String> textos,
        List<LinhaProcedimentoResponse> listaProcedimentos
) {
}
