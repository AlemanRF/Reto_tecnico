import { Radar } from 'react-chartjs-2';
import data from './charts.json';
import { useState } from 'react';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const jugadores = data.filter(item => item.nombre);

const etiquetas = [...new Set(jugadores.map(j => j.atributo))];

const jugadoresMap = {};
jugadores.forEach(({ nombre, atributo, valor }) => {
  if (!jugadoresMap[nombre]) {
    jugadoresMap[nombre] = {};
  }
  jugadoresMap[nombre][atributo] = valor;
});

const datasets = Object.entries(jugadoresMap).map(([nombre, atributos], index) => ({
  label: nombre,
  data: etiquetas.map(etiqueta => atributos[etiqueta] || 0), // ordena según las etiquetas
  fill: true,
  backgroundColor: `rgba(${50 + index * 50}, 99, 132, 0.2)`,
  borderColor: `rgba(${50 + index * 50}, 99, 132, 1)`,
  pointBackgroundColor: `rgba(${50 + index * 50}, 99, 132, 1)`
}));

export default function RadarChart() {
    const [maxR, setMaxR] = useState(100);

    const midata = {
      labels: etiquetas,
      datasets: datasets
    };

    const misoptions = {
      responsive: true,
      scales: {
        r: {
          min: 0,
          max: maxR,
          ticks: {
            stepSize: 10
          },
          pointLabels: {
            font: {
              size: 14
            }
          }
        }
      },
      plugins: {
        legend: {
          position: "bottom"
        },
        title: {
          display: true,
          text: "Atributos del Jugador"
        }
      }
    };

    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <h2>Gráfico de radar con eje radial variable</h2>

        <label>
          Rango máximo del eje radial: {maxR}
          <input
            type="range"
            min={40}
            max={150}
            step={10}
            value={maxR}
            onChange={e => setMaxR(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </label>

        <Radar data={midata} options={misoptions}/>  
      </div>
    );
}