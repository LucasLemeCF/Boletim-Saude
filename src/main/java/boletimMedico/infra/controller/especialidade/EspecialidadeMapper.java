package boletimMedico.infra.controller.especialidade;

import boletimMedico.domain.especialidade.Especialidade;

import java.util.*;

public class EspecialidadeMapper {

    public static Especialidade toDomain(EspecialidadeRequest request) {
        return new Especialidade(
                null,
                request.especialidade(),
                request.medico(),
                request.metaDiaria(),
                request.metaMensal(),
                new ArrayList<>()
        );
    }

}
