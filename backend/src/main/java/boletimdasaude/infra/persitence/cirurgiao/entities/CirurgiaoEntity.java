package boletimdasaude.infra.persitence.cirurgiao.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "CIRURGIOES")
public class CirurgiaoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CIRURGIAO")
    private Long id;
    @Column(name = "DES_NOME")
    private String nome;
    @OneToMany(mappedBy = "cirurgiao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProcedimentoCirurgiaoEntity> procedimentos;
    @Column(name = "DES_ATIVO")
    private boolean ativo;

    public CirurgiaoEntity(String nome, List<ProcedimentoCirurgiaoEntity> procedimentos, boolean ativo) {
        this.nome = nome;
        this.procedimentos = procedimentos;
        this.ativo = ativo;
    }

    public CirurgiaoEntity(Long id, String nome, List<ProcedimentoCirurgiaoEntity> procedimentos, boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.procedimentos = procedimentos;
        this.ativo = ativo;
    }

    public CirurgiaoEntity() {}

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

    public List<ProcedimentoCirurgiaoEntity> getProcedimentos() {
        return procedimentos;
    }

    public void setProcedimentos(List<ProcedimentoCirurgiaoEntity> procedimentos) {
        this.procedimentos = procedimentos;
    }

    public boolean isAtivo() {return ativo;}

    public void setAtivo(boolean ativo) {this.ativo = ativo;}

}
