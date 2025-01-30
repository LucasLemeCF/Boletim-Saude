
export function RodapeEspecialidades({dadosTabela, linhasTabela}) {
  const totalDia = somarAtendimentosDia(linhasTabela);
  const totalMetaDia = somarMetaDia(dadosTabela);
  const totalAtingidoDia = calculaPorcentagemDia(dadosTabela, linhasTabela);

  const totalMes = somarAtendimentosMes(dadosTabela) + totalDia;
  const totalMetaMes = somarMetaMes(dadosTabela);
  const totalAtingidoMes = calcularPorcentagemMes(dadosTabela, linhasTabela);

  return (
    <div className="flex border border-t-0 divide-x border-black bg-[#337B5B] w-full">
      <div className="flex items-center justify-center border-black w-[300px]">
        <p className="font-semibold text-white">Total de Consultas</p>
      </div>

      <div className="flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalDia}</p>
      </div>
      <div className="hidden sm:flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalMetaDia}</p>
      </div>
      <div className="hidden sm:flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalAtingidoDia}%</p>
      </div>

      <div className="hidden sm:flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalMes}</p>
      </div>
      <div className="hidden sm:flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalMetaMes}</p>
      </div>
      <div className="hidden sm:flex items-center justify-center border-black w-[100px]">
        <p className="font-semibold text-white">{totalAtingidoMes}%</p>
      </div>
    </div>
  )
}

function somarAtendimentosDia(linhasTabela) {
  let totalDia = 0;

  linhasTabela.map((linha) => {
    if (!Number.isNaN(linha.pacientesAtendidos) && linha.tipo === "ESPECIALIDADE_LINHA") {
      totalDia += linha.pacientesAtendidos;
    }
  });

  return totalDia;
}
  
function somarMetaDia(dadosTabela) {
  let totalMetaDia = 0;
  
  if (dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        totalMetaDia += especialidade.metaDiaria;
      });
    });
  }
  
  return totalMetaDia;
}

function somarAtendimentosMes(dadosTabela) {
  let totalMes = 0;

  if (dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        totalMes += especialidade.pacientesAtendidosMes;
        totalMes -= especialidade.pacientesAtendidosDia;
      });
    });
  }

  return totalMes;
}

function somarMetaMes(dadosTabela) {
  let totalMetaMes = 0;

  if (dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        totalMetaMes += especialidade.metaMensal;
      });
    });
  }

  return totalMetaMes;
}

function calculaPorcentagemDia(dadosTabela, linhasTabela) {
  let totalPacientesAtendidosDia = 0;
  let totalMetasDiarias = 0;

  if (linhasTabela !== undefined) {
    linhasTabela.map((linha) => {
      if (!Number.isNaN(linha.pacientesAtendidos) && linha.tipo === "ESPECIALIDADE_LINHA") {
        totalPacientesAtendidosDia += Number(linha.pacientesAtendidos);
      }
    });
  }

  if (dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        if (especialidade.metaDiaria > 0) {
          totalMetasDiarias += Number(especialidade.metaDiaria);
        }
      });
    });
  }

  let resultado = ((totalPacientesAtendidosDia/totalMetasDiarias) * 100).toFixed(2); 
  
  if (isNaN(Number(resultado)) || resultado === "Infinity") {
    resultado = "100";
  } 

  return resultado;
}

function calcularPorcentagemMes(dadosTabela, linhasTabela) {
  let totalPacientesAtendidosMes = 0;
  let totalMetasMensais = 0;

  if (linhasTabela !== undefined) {
    linhasTabela.map((linha) => {
      if (!Number.isNaN(linha.pacientesAtendidos) && linha.tipo === "ESPECIALIDADE_LINHA") {
        totalPacientesAtendidosMes += Number(linha.pacientesAtendidos);
      }
    });
  }

  if (dadosTabela.especialidadesCabecalhos !== undefined) {
    dadosTabela.especialidadesCabecalhos.map((cabecalho) => {
      cabecalho.especialidades.map((especialidade) => {
        if (especialidade.metaMensal > 0) {
          totalPacientesAtendidosMes += Number(especialidade.pacientesAtendidosMes);
          totalPacientesAtendidosMes -= Number(especialidade.pacientesAtendidosDia);
          totalMetasMensais += Number(especialidade.metaMensal);
        }
      });
    });
  }

  let resultado = ((totalPacientesAtendidosMes/totalMetasMensais) * 100).toFixed(2);

  if (isNaN(Number(resultado)) || resultado === "Infinity") {
    resultado = "100";
  } 
  
  return resultado;
} 