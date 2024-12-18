package boletimdasaude.infra.persitence.cirurgiao.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "PROCEDIMINTOS_CIRURGIOES")
public class ProcedimentoCirurgiaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PROCEDIMENTO")
    private Long id;
    @Column(name = "DES_NOME")
    private String nome;
    @OneToMany(mappedBy = "procedimento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResultadoMensalCirurgiaoEntity> resultadosMensais;
    @ManyToOne
    @JoinColumn(name="ID_CIRURGIAO", nullable = true)
    private CirurgiaoEntity cirurgiao;
    @Column(name = "DES_ATIVO")
    private boolean ativo;

    public ProcedimentoCirurgiaoEntity(String nome, List<ResultadoMensalCirurgiaoEntity> resultadosMensais, boolean ativo) {
        this.nome = nome;
        this.resultadosMensais = resultadosMensais;
        this.ativo = ativo;
    }

    public ProcedimentoCirurgiaoEntity() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<ResultadoMensalCirurgiaoEntity> getResultadosMensais() {
        return resultadosMensais;
    }

    public void setResultadosMensais(List<ResultadoMensalCirurgiaoEntity> resultadosMensais) {
        this.resultadosMensais = resultadosMensais;
    }

    public CirurgiaoEntity getCirurgiao() {
        return cirurgiao;
    }

    public void setCirurgiao(CirurgiaoEntity cirurgiao) {
        this.cirurgiao = cirurgiao;
    }

    public boolean isAtivo() {return ativo;}

    public void setAtivo(boolean ativo) {this.ativo = ativo; }

}
