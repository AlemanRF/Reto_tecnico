import './App.css';
import LinesChart from './Components/LinesChart.js';
import BarsChart from './Components/BarsChart.js';
import PiesChart from './Components/PiesChart.js';
import RadarChart from './Components/RadarChart.js';
import DinamicChart from './Components/DinamicChart.js';
import { useEffect, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://raw.githubusercontent.com/marcomjte/dummy-data/refs/heads/main/charts.json"

  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect (() => {
    fetch(url)
      .then(resp => {
        if (!resp.ok){
          throw new Error('Error al cagar el arhivo JSON');
        }
        return resp.json();
      })
      .then(data => {
        //Grafica de linea
        const ventasFiltradas = data.filter(item => item.categoria === "Ventas" && item.fecha).map(item => ({
            fecha: item.fecha,
            valor: item.valor
          }))
          .sort((a, b) => a.fecha.localeCompare(b.fecha));
        setVentas(ventasFiltradas);
        
        //Grafica de barras
        const clientesFiltrados = data.filter(item => item.categoria === "Clientes");
        setClientes(clientesFiltrados);
        
        //Grafica de pie
        const inventarioFiltrado = data.filter(item => item.categoria === "Inventario");
        setInventario(inventarioFiltrado);
        
        //Grafica de radar
        const jugadoresFiltrados = data.filter(item => item.nombre);
        setJugadores(jugadoresFiltrados);
        
        //Grafica de barras Dinamica
        const groupDatasets = [];
        const ventasDin = data.filter(item => item.categoria === "Ventas");
        groupDatasets.push(ventasDin);
        const inventarioDin = data.filter(item => item.categoria === "Inventario");
        groupDatasets.push(inventarioDin);
        const preferenciasDin = data.filter(item => item.grupo === "Preferencias");
        groupDatasets.push(preferenciasDin);
        const clientesDin = data.filter(item => item.categoria === "Clientes");
        groupDatasets.push(clientesDin);

        setDatasets(groupDatasets);
        
        setLoading(false);

      })
      .catch (error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if(loading) return <p>Cargano datos...</p>;
  if(error) return <p>Error: {error}</p>

  return (
    <div>
      <h1 className="title__section">Reto técnico de Julio Alemán con React y ChartJS</h1>
        <div className='dashboard'>
          <div className="card">
              <LinesChart datos={ventas} />
          </div>
          <div className="card">
              <PiesChart datos={inventario} />
          </div>
          <div className="card">
              <RadarChart datos={jugadores} />
          </div>
          <div className="card">
            <BarsChart datos={clientes} />                           
            </div>
        </div>
        <div className='card'>
          <DinamicChart datos={datasets}/>     
        </div>
    </div>
  );
}