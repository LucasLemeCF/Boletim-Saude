package boletimdasaude.application.usecases.ordemtabela;

import boletimdasaude.application.gateways.ordemtabela.IOrdemTabelaRepository;
import boletimdasaude.application.responses.ordemTabela.OrdemTabelaResponse;
import boletimdasaude.domain.ordemtabela.OrdemTabela;

public class EditarOrdemTabelaInteractor {

    private final IOrdemTabelaRepository tabelaRepository;

    private final MontarOrdemTabelaInteractor montarOrdemTabelaInteractor;

    public EditarOrdemTabelaInteractor(IOrdemTabelaRepository tabelaRepository, MontarOrdemTabelaInteractor montarOrdemTabelaInteractor) {
        this.tabelaRepository = tabelaRepository;
        this.montarOrdemTabelaInteractor = montarOrdemTabelaInteractor;
    }

    public OrdemTabela adicionarOrdemTabela(OrdemTabela ordemTabela) {
        return tabelaRepository.adicionarOrdemTabela(ordemTabela);
    }

    public OrdemTabela editarOrdemTabela(OrdemTabela ordemTabela) {
        return tabelaRepository.editarOrdemTabela(ordemTabela);
    }

    public OrdemTabelaResponse buscarOrdemTabela(String data) {
        return montarOrdemTabelaInteractor.criarOrdemTabelaResponse(data);
    }

}
