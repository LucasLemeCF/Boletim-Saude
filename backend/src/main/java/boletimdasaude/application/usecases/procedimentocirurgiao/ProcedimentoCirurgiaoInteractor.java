package boletimdasaude.application.usecases.procedimentocirurgiao;

import boletimdasaude.application.gateways.cirurgiao.ICirurgiaoRepository;
import boletimdasaude.application.gateways.procedimentocirurgiao.IProcedimentoCirurgiaoRepository;
import boletimdasaude.application.responses.procedimento.ProcedimentoResponse;
import boletimdasaude.application.responses.procedimentoCirurgiao.ProcedimentoDoCirurgiaoResponse;
import boletimdasaude.application.responses.procedimentoCirurgiao.ProcedimentosDoCirurgiaoResponse;
import boletimdasaude.domain.cirurgiao.Cirurgiao;
import boletimdasaude.domain.cirurgiao.ProcedimentoCirurgiao;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProcedimentoCirurgiaoInteractor {

    private final IProcedimentoCirurgiaoRepository procedimentoCirurgiaoRepository;
    private final ICirurgiaoRepository cirurgiaoRepository;

    public ProcedimentoCirurgiaoInteractor(IProcedimentoCirurgiaoRepository procedimentoCirurgiaoRepository, ICirurgiaoRepository cirurgiaoRepository) {
        this.procedimentoCirurgiaoRepository = procedimentoCirurgiaoRepository;
        this.cirurgiaoRepository = cirurgiaoRepository;
    }

    public ProcedimentoCirurgiao criarProcedimentoCirurgiao(ProcedimentoCirurgiao procedimentoCirurgiao, Long cirurgiaoId) {
        return procedimentoCirurgiaoRepository.criarProcedimentoCirurgiao(procedimentoCirurgiao, cirurgiaoId);
    }

    public List<ProcedimentoCirurgiao> buscarTodosProcedimentosCirurgioes() {
        List<ProcedimentoCirurgiao> resultado = new ArrayList<>();

        List<ProcedimentoCirurgiao> procedimentos = procedimentoCirurgiaoRepository.buscarTodosProcedimentosCirurgioes();

        for (ProcedimentoCirurgiao procedimento: procedimentos) {
            if (procedimento.ativo()) {
                resultado.add(procedimento);
            }
        }

        return resultado;
    }

    public List<ProcedimentoResponse> buscarTodosNomesDeProcedimentos() {
        List<ProcedimentoResponse> procedimentoCirurgioesResponse = new ArrayList<>();

        List<Cirurgiao> cirurgioes = cirurgiaoRepository.buscarTodosCirurgioes();

        for (Cirurgiao cirurgiao : cirurgioes) {
            for (ProcedimentoCirurgiao procedimento : cirurgiao.procedimentos()) {
                if (procedimento.ativo()) {
                    procedimentoCirurgioesResponse.add(new ProcedimentoResponse(procedimento.id(), cirurgiao.nome(), procedimento.nome()));
                }
            }
        }

        return procedimentoCirurgioesResponse;
    }

    public ProcedimentosDoCirurgiaoResponse buscarTodosProcedimentosDoCirurgiao(Long id) {
        List<ProcedimentoCirurgiao> procedimentos = new ArrayList<>();
        String nomeCirurgiao = "";

        List<Cirurgiao> listaCirurgioes = cirurgiaoRepository.buscarTodosCirurgioes();

        for (Cirurgiao cirurgiao : listaCirurgioes) {
            if (Objects.equals(cirurgiao.id(), id) && cirurgiao.ativo()) {
                nomeCirurgiao = cirurgiao.nome();

                List<ProcedimentoCirurgiao> procedimentosCirurgiao = new ArrayList<>();

                for (ProcedimentoCirurgiao procedimento : cirurgiao.procedimentos()) {
                    if (procedimento.ativo()) {
                        procedimentosCirurgiao.add(procedimento);
                    }
                }

                procedimentos.addAll(procedimentosCirurgiao);
            }
        }

        List<ProcedimentoDoCirurgiaoResponse> procedimentosResponse = converterProcedimentosResponse(procedimentos);

        return new ProcedimentosDoCirurgiaoResponse(nomeCirurgiao, procedimentosResponse);
    }

    private List<ProcedimentoDoCirurgiaoResponse> converterProcedimentosResponse(List<ProcedimentoCirurgiao> procedimentos) {
        List<ProcedimentoDoCirurgiaoResponse> procedimentosResponse = new ArrayList<>();

        for (ProcedimentoCirurgiao procedimento : procedimentos) {
            procedimentosResponse.add(new ProcedimentoDoCirurgiaoResponse(procedimento.id(), procedimento.nome()));
        }

        return procedimentosResponse;
    }

    public ProcedimentoCirurgiao editarProcedimentoCirurgiao(Long id, ProcedimentoCirurgiao procedimentoCirurgiao, Long cirurgiaoId) {
        return procedimentoCirurgiaoRepository.editarProcedimentoCirurgiao(id, procedimentoCirurgiao, cirurgiaoId);
    }

    public String excluirProcedimentoCirurgiao(Long id) {
            return procedimentoCirurgiaoRepository.excluirProcedimentoCirurgiao(id);
    }
}
