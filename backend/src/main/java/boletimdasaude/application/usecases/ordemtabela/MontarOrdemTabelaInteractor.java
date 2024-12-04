package boletimdasaude.application.usecases.ordemtabela;

import boletimdasaude.application.gateways.cirurgiao.ICirurgiaoRepository;
import boletimdasaude.application.gateways.cirurgiao.IResultadoMensalCirurgiaoRepository;
import boletimdasaude.application.gateways.especialidade.IResultadoMensalEspecialidadeRepository;
import boletimdasaude.application.gateways.ordemtabela.IOrdemTabelaRepository;
import boletimdasaude.application.responses.ordemTabela.*;
import boletimdasaude.application.responses.tabela.TabelaCabecalhoCirurgioesResponse;
import boletimdasaude.application.responses.tabela.TabelaCabecalhoEspecialidadesResponse;
import boletimdasaude.application.responses.tabela.TabelaCirurgioesResponse;
import boletimdasaude.application.responses.tabela.TabelaEspecialidadesResponse;
import boletimdasaude.domain.cirurgiao.Cirurgiao;
import boletimdasaude.domain.ordemtabela.TextoCabecalhoTabela;

import java.util.ArrayList;
import java.util.List;

public class MontarOrdemTabelaInteractor {

    private final IOrdemTabelaRepository tabelaRepository;
    private final IResultadoMensalEspecialidadeRepository resultadoMensalEspecialidadeRepository;
    private final IResultadoMensalCirurgiaoRepository resultadoMensalCirurgiaoRepository;
    private final ICirurgiaoRepository cirurgiaoRepository;

    private String data;

    public MontarOrdemTabelaInteractor(
            IOrdemTabelaRepository tabelaRepository,
            IResultadoMensalEspecialidadeRepository resultadoMensalEspecialidadeRepository, IResultadoMensalCirurgiaoRepository resultadoMensalCirurgiaoRepository,
            ICirurgiaoRepository cirurgiaoRepository
    ) {
        this.tabelaRepository = tabelaRepository;
        this.resultadoMensalEspecialidadeRepository = resultadoMensalEspecialidadeRepository;
        this.resultadoMensalCirurgiaoRepository = resultadoMensalCirurgiaoRepository;
        this.cirurgiaoRepository = cirurgiaoRepository;
    }

    public OrdemTabelaResponse criarOrdemTabelaResponse(String data) {
        this.data = data;

        List<CabecalhoEspecialidadeResponse> cabecalhosEspecialidades = criarCabecalhosEspecialidades();
        List<CabecalhoCirurgiaoResponse> cabecalhosCirurgioes = criarCabecalhosCirurgioes();

        return new OrdemTabelaResponse(
                data,
                cabecalhosEspecialidades,
                cabecalhosCirurgioes
        );
    }

    private List<CabecalhoEspecialidadeResponse> criarCabecalhosEspecialidades() {
        List<CabecalhoEspecialidadeResponse> resultado = new ArrayList<>();

        List<TabelaCabecalhoEspecialidadesResponse> listaCabecalhosEspecialidades = tabelaRepository.buscarCabecalhosEspecialidades(data);

        for (int index = 0; index < listaCabecalhosEspecialidades.size(); index++) {
            List<String> textos = new ArrayList<>();

            for (TextoCabecalhoTabela texto : listaCabecalhosEspecialidades.get(index).textos()) {
                textos.add(texto.texto());
            }

            int nextIndex = calculaProximoIndexEspecialidade(index, listaCabecalhosEspecialidades);

            resultado.add(
                new CabecalhoEspecialidadeResponse(
                    listaCabecalhosEspecialidades.get(index).posicao(),
                    textos,
                    criarLinhasEspecialidades(listaCabecalhosEspecialidades.get(index).posicao(), listaCabecalhosEspecialidades.get(nextIndex).posicao())
                )
            );
        }

        return resultado;
    }

    private int calculaProximoIndexEspecialidade(int index, List<TabelaCabecalhoEspecialidadesResponse> listaCabecalhosEspecialidades) {
        int nextIndex = index + 1;

        if (nextIndex < listaCabecalhosEspecialidades.size()) {
            return nextIndex;
        }

        return index;
    }

    private List<LinhaEspecialidadeResponse> criarLinhasEspecialidades(Long posicaoCabecalho, Long posicaoProximoCabecalho) {
        List<LinhaEspecialidadeResponse> resultado = new ArrayList<>();

        List<TabelaEspecialidadesResponse> listaEspecialidades = resultadoMensalEspecialidadeRepository.buscarDadosEspecialidades(data);

        for (TabelaEspecialidadesResponse especialidade : listaEspecialidades) {
            if (estaNoIntervalo(posicaoCabecalho, posicaoProximoCabecalho, especialidade)) {
                resultado.add(new LinhaEspecialidadeResponse(
                        especialidade.posicao(),
                        especialidade.especialidadeId(),
                        especialidade.especialidade()
                ));
            }
        }

        return resultado;
    }

    private boolean estaNoIntervalo(Long posicaoCabecalho, Long posicaoProximoCabecalho, TabelaEspecialidadesResponse especialidade) {
        return passouDoPrimeiroIntervalo(posicaoCabecalho, especialidade)
                && naoPassouDoUltimoIntervalo(posicaoCabecalho, posicaoProximoCabecalho, especialidade);
    }

    private boolean passouDoPrimeiroIntervalo(Long posicaoCabecalho, TabelaEspecialidadesResponse especialidade) {
        return posicaoCabecalho <= especialidade.posicao();
    }

    private boolean naoPassouDoUltimoIntervalo(Long posicaoCabecalho, Long posicaoProximoCabecalho, TabelaEspecialidadesResponse especialidade) {
        return especialidade.posicao() < posicaoProximoCabecalho || posicaoProximoCabecalho.equals(posicaoCabecalho);
    }

    private List<CabecalhoCirurgiaoResponse> criarCabecalhosCirurgioes() {
        List<CabecalhoCirurgiaoResponse> resultado = new ArrayList<>();

        List<TabelaCabecalhoCirurgioesResponse> listaCabecalhosCirurgioes = tabelaRepository.buscarCabecalhosCirurgioes(data);

        for (int index = 0; index < listaCabecalhosCirurgioes.size(); index++) {
            List<String> textos = new ArrayList<>();

            for (TextoCabecalhoTabela texto : listaCabecalhosCirurgioes.get(index).textos()) {
                textos.add(texto.texto());
            }

            int nextIndex = calculaProximoIndexCirurgiao(index, listaCabecalhosCirurgioes);

            resultado.add(
                    new CabecalhoCirurgiaoResponse(
                            listaCabecalhosCirurgioes.get(index).posicao(),
                            textos,
                            montarLinhasProcedimentos(listaCabecalhosCirurgioes.get(index).posicao(), listaCabecalhosCirurgioes.get(nextIndex).posicao())
                    )
            );
        }

        return resultado;
    }

    private int calculaProximoIndexCirurgiao(int index, List<TabelaCabecalhoCirurgioesResponse> listaCabecalhosCirurgioes) {
        int nextIndex = index + 1;

        if (nextIndex < listaCabecalhosCirurgioes.size()) {
            return nextIndex;
        }

        return index;
    }

    private List<LinhaProcedimentoResponse> montarLinhasProcedimentos(Long posicaoCabecalho, Long posicaoProximoCabecalho) {
        List<LinhaProcedimentoResponse> resultado = new ArrayList<>();

        List<TabelaCirurgioesResponse> listaProcedimentos = resultadoMensalCirurgiaoRepository.buscarDadosCirurgioes(data);

        for (TabelaCirurgioesResponse procedimento : listaProcedimentos) {
            if (estaNoIntervalo(posicaoCabecalho, posicaoProximoCabecalho, procedimento)) {
                resultado.add(new LinhaProcedimentoResponse(
                        procedimento.posicao(),
                        procedimento.procedimentoId(),
                        procedimento.cirurgiao(),
                        procedimento.procedimento()
                ));
            }
        }

        return resultado;
    }

    private boolean estaNoIntervalo(Long posicaoCabecalho, Long posicaoProximoCabecalho, TabelaCirurgioesResponse procedimento) {
        return passouDoPrimeiroIntervalo(posicaoCabecalho, procedimento)
                && naoPassouDoUltimoIntervalo(posicaoCabecalho, posicaoProximoCabecalho, procedimento);
    }

    private boolean passouDoPrimeiroIntervalo(Long posicaoCabecalho, TabelaCirurgioesResponse procedimento) {
        return posicaoCabecalho <= procedimento.posicao();
    }

    private boolean naoPassouDoUltimoIntervalo(Long posicaoCabecalho, Long posicaoProximoCabecalho, TabelaCirurgioesResponse procedimento) {
        return procedimento.posicao() < posicaoProximoCabecalho || posicaoProximoCabecalho.equals(posicaoCabecalho);
    }

}