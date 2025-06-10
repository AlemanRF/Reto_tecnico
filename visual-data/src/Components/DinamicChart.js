import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

export default function DatasetSelectorChart({datos}) {
  const [seleccion, setSeleccion] = useState("Ventas");
  console.log(datos);
  const ventasProc = datos[0].map(item => ({
    label: item.fecha,
    value: item.valor
  }));

  const inventarioProc = datos[1].map(item => ({
      label: item.producto,
      value: item.valor
  }));

  const clientesProc = datos[3].map(item => ({
      label: item.region,
      value: item.valor
  }));

  const preferenciasProc = datos[2].map(item => ({
      label: item.color,
      value: item.valor
  }));

  const datasetsMap = {
    Ventas: {
      label: "Ventas",
      data: ventasProc
    },
    Inventario: {
      label: "Inventario",
      data: inventarioProc
    },
    Clientes: {
      label: "Clientes",
      data: clientesProc
    },
    Preferencias: {
      label: "Preferencias",
      data: preferenciasProc
    }
  };

  const datosSeleccionados = datasetsMap[seleccion];

  const chartData = {
    labels: datosSeleccionados.data.map(item => item.label),
    datasets: [
      {
        label: datosSeleccionados.label,
        data: datosSeleccionados.data.map(item => item.value),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
    <h2>Gráfico dinámico con selección de conjuntos de datos</h2>

      <label>Selecciona un conjunto de datos: </label>
      <select value={seleccion} onChange={e => setSeleccion(e.target.value)}>
        {Object.keys(datasetsMap).map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `Visualización de ${seleccion}` }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
}