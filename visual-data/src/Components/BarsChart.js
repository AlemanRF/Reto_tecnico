import { Bar } from 'react-chartjs-2';
import { useState } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Bars({datos}) {
    const [color, setColor] = useState("rgba(0, 220, 195, 0.5)");

    const regiones = datos.map(c => c.region);
    const values = datos.map(c => c.valor);

    const midata = {
        labels: regiones,
        datasets: [
            {
                label: 'Clientes',
                data: values,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }
        ]
    };

    const misoptions = {
        responsive: true,
            plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Clientes por región' }
            },
            scales: {
            y: {
                beginAtZero: true
            }
            }
    };

    return (
        <div style={{ width: "80%", margin: "0 auto" }}>
            <h2>Gráfico de barras con selector de color</h2>

            <label>Selecciona el color: </label>
            <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={{ marginRight: "1rem" }}
            />

            <Bar data={midata} options={misoptions} />
        </div>
    );
}
