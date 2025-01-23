package boletimdasaude.application.usecases.especialidade;

import boletimdasaude.application.gateways.especialidade.IEspecialidadeRepository;
import boletimdasaude.application.requests.especialidade.AtendimentosMesEspecialidadeRequest;
import boletimdasaude.application.responses.especialidade.EspecialidadeResponse;
import boletimdasaude.domain.especialidade.Especialidade;
import boletimdasaude.domain.especialidade.ResultadoMensalEspecialidade;

import java.util.ArrayList;
import java.util.Arrays;
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

    public List<AtendimentosMesEspecialidadeRequest> buscarQuantidadeAtendimentosMes(int ano) {
        List<AtendimentosMesEspecialidadeRequest> reponse = new ArrayList<>();
        List<Especialidade> especialidades = buscarTodasEspecialidades();
        for (Especialidade especialidade : especialidades) {
            List<Integer> atendimentoPorMes = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            for (ResultadoMensalEspecialidade resultadoMensal : especialidade.resultadosMensais()) {
                if (resultadoMensal.ano() == ano) {
                    atendimentoPorMes.set(resultadoMensal.mes() - 1, resultadoMensal.atendimentos());
                }
            }
            AtendimentosMesEspecialidadeRequest AtendimentosMesEspecialidadeRequest = new AtendimentosMesEspecialidadeRequest(
                    especialidade.especialidade(),
                    atendimentoPorMes
            );
            reponse.add(AtendimentosMesEspecialidadeRequest);
        }
        return reponse;
    }

}
