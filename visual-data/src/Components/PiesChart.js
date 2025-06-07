import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend 
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import data from './charts.json';
import { useState } from 'react';

ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend
);

const inventario = data.filter(item => item.categoria === "Inventario");
const producto = [];
const piezas = [];

for (var i in inventario) {
    producto.push(inventario[i].producto);
    piezas.push(inventario[i].valor);
}

const colorMap = {
  "Producto A": "rgba(255, 99, 132, 0.6)",
  "Producto B": "rgba(54, 162, 235, 0.6)",
  "Producto C": "rgba(255, 206, 86, 0.6)",
  "Producto D": "rgba(75, 192, 192, 0.6)",
  "Producto E": "rgba(153, 102, 255, 0.6)"
};

export default function Pies() {
    const [minStock, setMinStock] = useState(0);

    const productosFiltrados = inventario.filter(p => p.valor >= minStock);

    const midata = {
        labels: productosFiltrados.map(p => p.producto),
        datasets: [
            {
                label: 'Unidades en inventario',
                data: productosFiltrados.map(p => p.valor),
                backgroundColor: productosFiltrados.map(p => colorMap[p.producto] || "rgba(100,100,100,0.6)"),
                borderWidth: 1,
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
        legend: { position: "right" },
        title: {
            display: true,
            text: "Inventario filtrado por cantidad mínima"
        }
        }
    };

    return (
        <div style={{ width: "70%", margin: "0 auto" }}>
        <h2>Gráfico circular con filtro de unidades en inventario</h2>

        <label>
            Mostrar productos con inventario mayor o igual a: {minStock}
            <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={minStock}
            onChange={e => setMinStock(Number(e.target.value))}
            style={{ width: "100%" }}
            />
        </label>

        <Pie data={midata} options={options} />
        </div>
    );
}
