package boletimdasaude.application.usecases.especialidade;

import boletimdasaude.application.gateways.especialidade.IEspecialidadeRepository;
import boletimdasaude.application.responses.especialidade.EspecialidadeResponse;
import boletimdasaude.domain.especialidade.Especialidade;

import java.util.ArrayList;
import java.util.List;

public class EspecialidadeInteractor {

    private final IEspecialidadeRepository especialidadeRepository;

    public EspecialidadeInteractor(IEspecialidadeRepository especialidadeRepository) {
        this.especialidadeRepository = especialidadeRepository;
    }

    public Especialidade criarEspecialidade(Especialidade especialidade) {
        return especialidadeRepository.criarEspecialidade(especialidade);
    }

    public List<Especialidade> buscarTodasEspecialidades() {
        List<Especialidade> resultado = new ArrayList<>();

        List<Especialidade> especialidades = especialidadeRepository.buscarTodasEspecialidades();

        for (Especialidade especialidade : especialidades) {
            if (especialidade.ativo()) {
                resultado.add(especialidade);
            }
        }

        return resultado;
    }

    public List<EspecialidadeResponse> buscarTodosNomesDeEspecialidade() {
        List<EspecialidadeResponse> especialidadesResponse = new ArrayList<>();

        List<Especialidade> especialidades = especialidadeRepository.buscarTodasEspecialidades();

        for (Especialidade especialidade : especialidades) {
            if (especialidade.ativo()) {
                especialidadesResponse.add(new EspecialidadeResponse(especialidade.id(), especialidade.especialidade()));
            }
        }

        return especialidadesResponse;
    }

    public List<Especialidade> buscarTodasEspecialidadesComDadosMes(String data) {
        return especialidadeRepository.buscarTodasEspecialidadesComDadosMes(data);
    }

    public Especialidade editarEspecialidade(Long id, Especialidade especialidade) {
        return especialidadeRepository.editarEspecialidade(id, especialidade);
    }

    public String excluirEspecialidade(Long id) {
        return especialidadeRepository.excluirEspecialidade(id);
    }

}
