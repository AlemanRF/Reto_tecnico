import { Line } from 'react-chartjs-2';
import data from './charts.json';
import { useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ventas = data.filter(item => item.categoria === "Ventas");

const ventasPorFecha = {};

ventas.forEach(({ fecha, valor }) => {
  if (!ventasPorFecha[fecha]) {
    ventasPorFecha[fecha] = 0;
  }
  ventasPorFecha[fecha] += valor;
});

export default function LinesChart() {
    const [desde, setDesde] = useState("2024-06");
    const [hasta, setHasta] = useState("2025-06");

    const mesesDisponibles = ventas.map(v => v.fecha).sort();

    const ventasFiltradas = ventas
        .filter(v => v.fecha >= desde && v.fecha <= hasta)
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

    const midata = {
    labels: ventasFiltradas.map(v => v.fecha),
    datasets: [
      {
        label: "Ventas",
        data: ventasFiltradas.map(v => v.valor),
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3
      }
    ]
  };

  const misoptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ventas mensuales filtradas"
      },
      legend: {
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

    return (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <h2>Gráfico de línea con filtro de fechas</h2>

          <div style={{ marginBottom: "1rem" }}>
              <label>Desde: </label>
              <input
                type="month"
                min={mesesDisponibles[0]}
                max={mesesDisponibles[mesesDisponibles.length - 1]}
                value={desde}
                onChange={e => setDesde(e.target.value)}
                style={{ marginRight: "1rem" }}
              />
              <label>Hasta: </label>
              <input
                type="month"
                min={desde}
                max={mesesDisponibles[mesesDisponibles.length - 1]}
                value={hasta}
                onChange={e => setHasta(e.target.value)}
              />
          </div>

          <Line data={midata} options={misoptions}/>
        </div>
    ); 
}