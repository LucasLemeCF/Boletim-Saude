import { useState } from "react";
import { Bar } from "react-chartjs-2";

function BarChartPorcentagem({ dadosMes, chartRef }) {
  const [chartData] = useState({
    type: 'bar',
    datasets: [{
      data: montarData(dadosMes),
      backgroundColor: '#337B5B',
    }],
    labels: montarLabels(dadosMes),
  });

  return (
    <div>
      <div className="hidden sm:flex justify-center chart-container mt-4 px-8">
        <Bar
          ref={el => chartRef.current[1] = el}
          height='50vh'
          width='80vw'
          type='bar'
          data={chartData}
          plugins={[topNumber]}
          options={{
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Total da meta atingida',
                font: {
                  size: 16,
                  weight: 'bold'
              }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grace: 1,
                ticks: {
                  padding: 0,
                  font: {
                    size: 12
                  }
                },
              },
              x: {
                ticks: {
                  padding: 0,
                  font: {
                    size: 12
                  },
                  callback: function (value) {
                    return value + '%';
                  },
                }
              }
            }
          }}
        />
      </div>

      <div className="flex sm:hidden justify-center chart-container mt-4">
        <Bar
          height='550px'
          width='400px'
          type='bar'
          data={chartData}
          plugins={[topNumber]}
          options={{
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Total da meta atingida',
                font: {
                  size: 16,
                  weight: 'bold'
              }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grace: 1,
                ticks: {
                  padding: 0,
                  font: {
                    size: 10
                  }
                },
              },
              x: {
                ticks: {
                  padding: 0,
                  font: {
                    size: 12
                  },
                  callback: function (value) {
                    return value + '%';
                  },
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

const topNumber = {
  id: 'topNumber',
  afterDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;

    ctx.save();
    chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(data.datasets[0].data[index] + "%", datapoint.x + 25, datapoint.y + 5);

    });
  }
}

function montarLabels(dadosMes) {
  let labels = [];

  dadosMes.map(especialidade => {
    if (especialidade.resultadosMensais[0].metaMensal > 0) {
      labels.push(especialidade.especialidade);
    }
  });

  return labels;
}

function montarData(dadosMes) {
  let resultado = [];
  
  dadosMes.map(especialidade => {
    if (especialidade.resultadosMensais[0].metaMensal > 0) {
      let soma = 0;

      especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
        soma += resultadosDiario.atendimentos / especialidade.resultadosMensais[0].metaMensal;
      });

      resultado.push((soma * 100).toFixed(2));
    }
  });

  return resultado;
}

export default BarChartPorcentagem;