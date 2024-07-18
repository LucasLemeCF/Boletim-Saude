package boletimdasaude.infra.gateways.especialidade;

import boletimdasaude.application.gateways.especialidade.IResultadoMensalEspecialidadeRepository;
import boletimdasaude.application.requests.tabela.LinhaTabelaRequest;
import boletimdasaude.application.responses.tabela.TabelaEspecialidadesResponse;
import boletimdasaude.application.util.ConverterData;
import boletimdasaude.config.exceptions.NotFoundException;
import boletimdasaude.domain.especialidade.ResultadoDiarioEspecialidade;
import boletimdasaude.domain.especialidade.ResultadoMensalEspecialidade;
import boletimdasaude.infra.gateways.especialidade.mappers.ResultadoDiarioEspecialidadeMapper;
import boletimdasaude.infra.gateways.especialidade.mappers.ResultadoMensalEspecialidadeMapper;
import boletimdasaude.infra.persitence.especialidade.IEspecialidadeRepositoryJpa;
import boletimdasaude.infra.persitence.especialidade.IResultadoMensalEspecialidadeRepositoryJpa;
import boletimdasaude.infra.persitence.especialidade.entities.EspecialidadeEntity;
import boletimdasaude.infra.persitence.especialidade.entities.IResultadoDiarioEspecialidadeRepositoryJpa;
import boletimdasaude.infra.persitence.especialidade.entities.ResultadoDiarioEspecialidadeEntity;
import boletimdasaude.infra.persitence.especialidade.entities.ResultadoMensalEspecialidadeEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class ResultadoMensalEspecialidadeRepository implements IResultadoMensalEspecialidadeRepository {

    private int dia;
    private int mes;
    private int ano;

    private final IEspecialidadeRepositoryJpa especialidadeRepositoryJpa;
    private final IResultadoMensalEspecialidadeRepositoryJpa resultadoMensalEspecialidadeRepositoryJpa;
    private final IResultadoDiarioEspecialidadeRepositoryJpa resultadoDiarioEspecialidadeRepositoryJpa;

    public ResultadoMensalEspecialidadeRepository(IEspecialidadeRepositoryJpa especialidadeRepositoryJpa,
                                                  IResultadoMensalEspecialidadeRepositoryJpa resultadoMensalEspecialidadeRepositoryJpa,
                                                  IResultadoDiarioEspecialidadeRepositoryJpa resultadoDiarioEspecialidadeRepositoryJpa) {
        this.especialidadeRepositoryJpa = especialidadeRepositoryJpa;
        this.resultadoMensalEspecialidadeRepositoryJpa = resultadoMensalEspecialidadeRepositoryJpa;
        this.resultadoDiarioEspecialidadeRepositoryJpa = resultadoDiarioEspecialidadeRepositoryJpa;
    }

    @Override
    public ResultadoMensalEspecialidade salvarDadosIniciaisDoMes(ResultadoMensalEspecialidade resultadoMensalEspecialidade, Long especialidadeId) {
        EspecialidadeEntity oldEspecialidadeEntity = especialidadeRepositoryJpa.findById(especialidadeId)
                .orElseThrow(() -> new NotFoundException(String.format("ID %s não encontrado", especialidadeId)));

        ResultadoMensalEspecialidadeEntity novoResultadoMensalEntity = ResultadoMensalEspecialidadeMapper.toEntity(resultadoMensalEspecialidade);
        novoResultadoMensalEntity.getResultadosDiarios().forEach(resultadoDiario -> resultadoDiario.setResultadoMensal(novoResultadoMensalEntity));

        oldEspecialidadeEntity.getResultadosMensais().add(novoResultadoMensalEntity);
        novoResultadoMensalEntity.setEspecialidade(oldEspecialidadeEntity);

        especialidadeRepositoryJpa.save(oldEspecialidadeEntity);

        return ResultadoMensalEspecialidadeMapper.toDomain(novoResultadoMensalEntity);
    }

    @Override
    public ResultadoMensalEspecialidade salvarDadosDoDia(ResultadoDiarioEspecialidade resultadoDiarioEspecialidade, Long especialidadeId, Date data) {
        ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity = ResultadoDiarioEspecialidadeMapper.toEntity(resultadoDiarioEspecialidade);

        this.dia = resultadoDiarioEspecialidade.dia();
        this.mes = ConverterData.toMes(data);
        this.ano = ConverterData.toAno(data);

        ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity = buscarMesAnoEspecialidade(data, especialidadeId);
        resultadoDiarioEspecialidadeEntity.setResultadoMensal(resultadoMensalEspecialidadeEntity);

        resultadoMensalEspecialidadeEntity.getResultadosDiarios().add(resultadoDiarioEspecialidadeEntity);
        resultadoMensalEspecialidadeEntity.setAtendimentos(somarAtendimentos(resultadoMensalEspecialidadeEntity));
        ResultadoMensalEspecialidadeEntity resultado = resultadoMensalEspecialidadeRepositoryJpa.save(resultadoMensalEspecialidadeEntity);

        return ResultadoMensalEspecialidadeMapper.toDomain(resultado);
    }

    private int somarAtendimentos(ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity) {
        int atendimentos = 0;

        for (ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity : resultadoMensalEspecialidadeEntity.getResultadosDiarios()) {
            atendimentos += resultadoDiarioEspecialidadeEntity.getAtendimentos();
        }

        return atendimentos;
    }

    private ResultadoDiarioEspecialidadeEntity buscarDiaEspecialidade(Date data, Long resultadoMensalId) {
        ResultadoDiarioEspecialidadeEntity resultado = null;

        instanciaVariaveis(data);

        Optional<EspecialidadeEntity> especialidadeEntity = especialidadeRepositoryJpa.findById(resultadoMensalId);

        if (especialidadeEntity.isPresent()) {
            resultado = percorrerResultadosMensal(especialidadeEntity.get());
        }

        return resultado;
    }

    private void instanciaVariaveis(Date data) {
        this.dia = ConverterData.toDia(data);
        this.mes = ConverterData.toMes(data);
        this.ano = ConverterData.toAno(data);
    }

    private ResultadoDiarioEspecialidadeEntity percorrerResultadosMensal(EspecialidadeEntity especialidadeEntity) {
        ResultadoDiarioEspecialidadeEntity resultado = null;

        for(ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity : especialidadeEntity.getResultadosMensais()) {
            if (mesmoMesEAno(resultadoMensalEspecialidadeEntity)) {
                resultado = percorrerResultadoDiario(resultadoMensalEspecialidadeEntity);
            }
        }

        return resultado;
    }

    private boolean mesmoMesEAno(ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity) {
        return resultadoMensalEspecialidadeEntity.getMes() == mes && resultadoMensalEspecialidadeEntity.getAno() == ano;
    }

    private ResultadoDiarioEspecialidadeEntity percorrerResultadoDiario(ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity) {
        ResultadoDiarioEspecialidadeEntity resultado = null;

        for (ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity : resultadoMensalEspecialidadeEntity.getResultadosDiarios()) {
            if (mesmoDia(resultadoDiarioEspecialidadeEntity)) {
                resultado = resultadoDiarioEspecialidadeEntity;
            }
        }

        return resultado;
    }

    private boolean mesmoDia(ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity) {
        return resultadoDiarioEspecialidadeEntity.getDia() == dia;
    }

    private ResultadoMensalEspecialidadeEntity buscarMesAnoEspecialidade(Date data, Long especialidadeId) {
        ResultadoMensalEspecialidadeEntity resultado = null;

        instanciaVariaveis(data);

        Optional<EspecialidadeEntity> especialidadeEntity = especialidadeRepositoryJpa.findById(especialidadeId);

        if (especialidadeEntity.isPresent()) {
            for(ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity : especialidadeEntity.get().getResultadosMensais()) {
                if (resultadoMensalEspecialidadeEntity.getMes() == mes && resultadoMensalEspecialidadeEntity.getAno() == ano) {
                    resultado = resultadoMensalEspecialidadeEntity;
                }
            }
        }

        return resultado;
    }

    @Override
    public boolean existeMesAnoEspecialidade(Date data, Long especialidadeId) {
        return buscarMesAnoEspecialidade(data, especialidadeId) != null;
    }

    @Override
    public boolean existeDiaEspecialidade(Date data, Long resultadoMensalId) {
        return buscarDiaEspecialidade(data, resultadoMensalId) != null;
    }

    @Override
    public ResultadoDiarioEspecialidade atualizarDadosDoDia(Date data, LinhaTabelaRequest linhaTabelaRequest) {
        ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity = buscarDiaEspecialidade(data, linhaTabelaRequest.componenteId());
        resultadoDiarioEspecialidadeEntity.setAtendimentos(linhaTabelaRequest.pacientesAtendidos());

        resultadoDiarioEspecialidadeEntity = resultadoDiarioEspecialidadeRepositoryJpa.save(resultadoDiarioEspecialidadeEntity);

        ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity = resultadoDiarioEspecialidadeEntity.getResultadoMensal();
        resultadoMensalEspecialidadeEntity.setAtendimentos(somarAtendimentos(resultadoMensalEspecialidadeEntity));
        resultadoMensalEspecialidadeRepositoryJpa.save(resultadoMensalEspecialidadeEntity);

        return ResultadoDiarioEspecialidadeMapper.toDomain(resultadoDiarioEspecialidadeEntity);
    }

    @Override
    public List<TabelaEspecialidadesResponse> buscarDadosEspecialidades(Date data) {
        List<TabelaEspecialidadesResponse> tabelaEspecialidadesResponses = new ArrayList<>();

        instanciaVariaveis(data);

        List<ResultadoMensalEspecialidadeEntity> listaResultadoMensal = resultadoMensalEspecialidadeRepositoryJpa.findByMesAndAno(mes, ano);
        List<ResultadoDiarioEspecialidadeEntity> listaResultadoDiario = buscarResultadoDiarioEspecialidade(listaResultadoMensal);

        montarTabelaEspecialidades(tabelaEspecialidadesResponses, listaResultadoDiario);

        return tabelaEspecialidadesResponses;
    }

    private List<ResultadoDiarioEspecialidadeEntity> buscarResultadoDiarioEspecialidade( List<ResultadoMensalEspecialidadeEntity> listaResultadoMensal) {
        List<ResultadoDiarioEspecialidadeEntity> listaResultadoDiario = new ArrayList<>();

        for (ResultadoMensalEspecialidadeEntity resultadoMensalEspecialidadeEntity : listaResultadoMensal) {
            for (ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity : resultadoMensalEspecialidadeEntity.getResultadosDiarios()) {
                if (resultadoDiarioEspecialidadeEntity.getDia() == dia) {
                    listaResultadoDiario.add(resultadoDiarioEspecialidadeEntity);
                }
            }
        }

        return listaResultadoDiario;
    }

    private void montarTabelaEspecialidades(List<TabelaEspecialidadesResponse> tabelaEspecialidadesResponses, List<ResultadoDiarioEspecialidadeEntity> listaResultadoDiario) {
        for (ResultadoDiarioEspecialidadeEntity resultadoDiarioEspecialidadeEntity : listaResultadoDiario) {
            TabelaEspecialidadesResponse tabelaEspecialidadesResponse = new TabelaEspecialidadesResponse(
                    resultadoDiarioEspecialidadeEntity.getResultadoMensal().getEspecialidade().getId(),
                    resultadoDiarioEspecialidadeEntity.getResultadoMensal().getEspecialidade().getEspecialidade(),
                    resultadoDiarioEspecialidadeEntity.getAtendimentos(),
                    resultadoDiarioEspecialidadeEntity.getResultadoMensal().getMetaDiaria(),
                    resultadoDiarioEspecialidadeEntity.getResultadoMensal().getAtendimentos(),
                    resultadoDiarioEspecialidadeEntity.getResultadoMensal().getMetaMensal()
            );

            tabelaEspecialidadesResponses.add(tabelaEspecialidadesResponse);
        }
    }

}
