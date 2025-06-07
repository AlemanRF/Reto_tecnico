import './App.css';
import LinesChart from './Components/LinesChart.js';
import BarsChart from './Components/BarsChart.js';
import PiesChart from './Components/PiesChart.js';
import RadarChart from './Components/RadarChart.js';
import DinamicChart from './Components/DinamicChart.js';

function App() {
  return (
    <div>
      <h1 className="title__section">Reto técnico de Julio Alemán con React y ChartJS</h1>
        <div className='dashboard'>
          <div className="card">
              <LinesChart />
          </div>
          <div className="card">
              <PiesChart />
          </div>
          <div className="card">
              <RadarChart />
          </div>
          <div className="card">
            <BarsChart />                           
            </div>
        </div>
        <div className='card'>
          <DinamicChart />     
        </div>
    </div>
  );
}

export default App;
