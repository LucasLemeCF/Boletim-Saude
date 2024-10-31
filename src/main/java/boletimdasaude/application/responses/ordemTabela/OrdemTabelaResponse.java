package boletimdasaude.application.responses.ordemTabela;

import java.util.List;

public record OrdemTabelaResponse(
        String data,
        List<CabecalhoEspecialidadeResponse> cabecalhosEspecialidades,
        List<CabecalhoCirurgiaoResponse> cabecalhosCirurgioes
) {
}
