package boletimdasaude.application.requests.especialidade;

import java.util.List;

public record AtendimentosMesEspecialidadeRequest(
        String especialidade,
        List<Integer> atendimentoPorMes
) {
}