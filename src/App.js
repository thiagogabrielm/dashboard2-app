import './App.css';
import PlotReactVis from './components/PlotReactVis'
import React, { useState } from 'react';

function App() {
  const [ferryOne, setFerryOne] = useState(true)

  const aggregation = "snap_mean"
  const plant21 = "Geirangerfjord2/13185-1"
  const plant22 = "Geirangerfjord2/13185-2"
  const plant11 = "Geirangerfjord1/9648-1"
  const plant12 = "Geirangerfjord1/9648-2"
  const sensors_geiranger2 = ["rpm", "boost_pressure", "engine_power", "fuel_rate", "cooling_water_temperature", "exhaust_temperature_1", "lube_oil_temperature", "lube_oil_pressure"]

  // const sensors_geiranger2 = ["rpm", "fuel_rate", "cooling_water_temperature", "exhaust_temperature_1", "throttle", "service_battery", "start_battery", "manifold_air_temperature", "exhaust_temperature_2",
  // "lube_oil_temperature", "lube_oil_pressure", "boost_pressure", "gear_oil_temp", "gear_oil_pressure", "engine_power"]

  const sensors_geiranger1 = ["rpm", "boost_pressure", "engine_power", "fuel_rate", "cooling_water_temperature", "exhaust_temperature_1", "lube_oil_temperature", "lube_oil_pressure"]

  // const sensors_geiranger1 = ["rpm", "fuel_rate", "cooling_water_temperature", "exhaust_temperature_1", "service_battery", "start_battery", "exhaust_temperature_2",
  // "lube_oil_temperature", "lube_oil_pressure", "boost_pressure", "gear_oil_temp", "gear_oil_pressure", "engine_power"]

  return (

    <div className="App">
      {/* <button onClick={()=>setFerryOne(!ferryOne)}>Change Ferry</button>
      {console.log(ferryOne)} */}
      {/* {ferryOne ? ( */}
      <React.Fragment>
        {sensors_geiranger1.map((sensor, index) => (
          <PlotReactVis key={index} plant={plant11} sensor={sensor} aggregation={aggregation}></PlotReactVis>
        ))}

        {sensors_geiranger2.map((sensor, index) => (
          <PlotReactVis key={index} plant={plant22} sensor={sensor} aggregation={aggregation}></PlotReactVis>
        ))}
      </React.Fragment>
      {/* ) : (
        { console.log("...") }
      )} */}
      {/* <PlotReactVis plant={plant} sensor={"gear_oil_temp"} aggregation={aggregation}></PlotReactVis>

      <PlotReactVis plant={plant} sensor={"service_battery"} aggregation={aggregation}></PlotReactVis> */}


    </div>
  );
}

export default App;
