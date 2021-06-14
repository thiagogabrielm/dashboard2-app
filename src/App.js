import './App.css';
import PlotReactVis from './components/PlotReactVis'

function App() {
  return (
    <div className="App">
      <PlotReactVis plant={'ice_water_pump_2'} sensor={'vibration_sensor_1'} aggregation={'mae'}></PlotReactVis>

      {/* <PlotReactVis plant={'ice_water_pump_2'} sensor={'vibration_sensor_2'} aggregation={'mae'}></PlotReactVis>

      <PlotReactVis plant={'sea_water_pump_2'} sensor={'vibration_sensor_1'} aggregation={'mae'}></PlotReactVis>

      <PlotReactVis plant={'sea_water_pump_2'} sensor={'vibration_sensor_2'} aggregation={'mae'}></PlotReactVis> */}
      
           
    </div>
  );
}

export default App;
