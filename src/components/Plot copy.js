import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import D3TsChart from '../d3-helpers/d3-ts-chart';

function Plot() {
    const [data, setData] = useState([]);
    const [connected, setConnected] = useState(true);
    const [error, setError] = useState('');
    const [lastTimestamp, setLastTimestamp] = useState(null);

    const seriesList = [
        {
            name: 'sensor-data',
            type: 'LINE',
            stroke: '#038C7E',
            strokeWidth: 5,
            label: 'Readings',
            labelClass: 'readings',
        },
        {
            name: 'z-score',
            type: 'AREA',
            fill: 'rgba(216, 13, 49, 0.2)',
            stroke: 'transparent',
            strokeWidth: 0,
            label: 'Peaks',
            labelClass: 'z-score',
        }
    ]

    const tsChart = new D3TsChart();

    const parentRef = ReactDOM.findDOMNode(this);

    tsChart.init({
        elRef: document.getElementsByClassName('chart-container')[0],
        classList: {
            svg: 'z-chart'
        }
    });

    tsChart.addSeries(this.seriesList[0]); // readings
    tsChart.addSeries(this.seriesList[1]); //z-score

    // state = {
    //     data: [],
    //     lastTimestamp: null,
    //     connected: false,
    //     error: ''
    // }

    useEffect(() => {
        const options = {
            // headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZmxJZFhjdzVZSDdmR3E5NzRrU3ZvcHg1Q3RHMWNmRG9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLm5vZ3ZhLm5vIiwiaWF0IjoxNjIzMzUzMTE5LCJleHAiOjE2MjM0Mzk1MTksImF6cCI6ImZsSWRYY3c1WUg3ZkdxOTc0a1N2b3B4NUN0RzFjZkRvIiwic2NvcGUiOiJyZWFkOnNlbnNvcmRhdGEgcmVhZDptbGRhdGEgd3JpdGU6c2Vuc29yZGF0YSB3cml0ZTptbGRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.gC2o7ecitkOI4t46zaK-zRKP1A6V-E5bJ-clPjXhbdnEUANCK71RC_Zq2K220uteCwLc27A-OKLAbjdbsm_MPXONX953aagpMyI0wtWnqlo4mxzjWv9mQrq8SRD7cmnJUvRX5dXEUaxESDmsdz2ykTMSZag2Uyyky0wynJUzAZ-Q6EvosFwrxMeOAcqpezXn-jBkB6AEQbRyBKSIp2sutypnViY7iPBCi5IjgNnpTEamGWqXnWCHU_U204Pp_xqXvABUJfebs4xbsTKB_ofFnVEzY3YgWQ9bpq2jwLXkwFtdpgclK38ATDiZBCZa5cKWxJ-pn_fjgwSyk5uEwnkcbQ' }
            headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnRhZmpvcmQubm8iLCJpYXQiOjE2MjMzNTY0MTcsImV4cCI6MTYyMzQ0MjgxNywiYXpwIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXAiLCJzY29wZSI6InJlYWQ6c2Vuc29yZGF0YSByZWFkOm1sZGF0YSB3cml0ZTpzZW5zb3JkYXRhIHdyaXRlOm1sZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.PvctkaN8qOW7OWg3kIdM4eAq-5Enqt5A7czCY2u31aLOLNH9lnLIaxtXJuU5WBxN5JvY4iFBB1sPrl7_EbbOZJtcmiioEkovxHeaPIrnZ3xtItJxNmXuwT4ThP2BJWmFPxzkA7t0nWwXmdLHMH2Xaa8J8Zlfq4BKzLadn2euvqsJq9O0wYYM-KgfPt2bBazphMGY6SYnl--8xQaGO9I1Mvl__chqpkPKjgxrKGKHQ8pAJsdYWuohHcGXnVCL3MhjiDMXZlMdtoKQYV7kThEJ02lJAHaLSPzOLUOVIyMsAFPT4PMBk7qfmI-2JCKx-EjOqlpCAUp1yaBdKeVljMRFeQ' }
        };
        // datas = data
        // axios.get('https://nogvahubrestapi.azurewebsites.net/api/sensors?limit=60&sensor=engine_power&plant=Geirangerfjord2&aggregation=snap_mean&component=13185-2', options)
        axios.get('https://tafjordhubrestapi.azurewebsites.net/api/sensors?limit=60&sensor=vibration_sensor_1&plant=ice_water_pump_1&aggregation=mae', options)
            .then(res => {
                // result.json().then((data) => {
                console.log(res.data.dbdata[0])
                // setData(res.data.dbdata.map(row => row.value))
                // datas.push(res.data.dbdata.map(row => row.value));

                setData(res.data.dbdata.map(row => row.value))
                
                setLastTimestamp(Date.now())
                // });

            })
    }, [])

    return (
        <div className={'chart-container'} style={{
            width: `400px`,
            height: `200px`,

        }}>
            {data}
        </div>
    );

}
export default Plot;


// import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios'

// import D3TsChart from '../d3-helpers/d3-ts-chart';

// const MAX_POINTS_TO_STORE = 50;
// const DEFAULT_X_TICKS = 20;

/**
*  Component cycle:
* 1. `componentDidMount()`
*     => Initialize a `D3TsChart()` with nod data
* 2. `socket.connect()` pings WebSocket then on each `on('reading')` event:
*     => `storeReading()` in component `state`
*     => `updateChart()` seperates original data from peak detection series
*         then calls `D3TsChart.setSeriesData()`
*
* 3. `componentWillUnmount()` disconects from socket.
*/
// export class Plot extends React.Component {
// function Plot() {
//     seriesList = [
//         {
//             name: 'sensor-data',
//             type: 'LINE',
//             stroke: '#038C7E',
//             strokeWidth: 5,
//             label: 'Readings',
//             labelClass: 'readings',
//         },
//         {
//             name: 'z-score',
//             type: 'AREA',
//             fill: 'rgba(216, 13, 49, 0.2)',
//             stroke: 'transparent',
//             strokeWidth: 0,
//             label: 'Peaks',
//             labelClass: 'z-score',
//         }
//     ]

//     tsChart = new D3TsChart();
//     socket;
//     state = {
//         data: [],
//         lastTimestamp: null,
//         connected: true,
//         error: ''
//     }

//     // useEffect(() => {
//     //     console.log("oiiiii")
//     // },[this.state.data]);

//     //componentDidMount() {
//         // if (this.props['sensorId'] === undefined) throw new Error('You have to pass \'sensorId\' prop to Chart component');
//         // if (this.props['x-ticks'] > MAX_POINTS_TO_STORE) throw new Error(`You cannot display more than ${MAX_POINTS_TO_STORE} 'x-ticks'. `);

//     const parentRef = ReactDOM.findDOMNode(this);

//     this.tsChart.init({
//         elRef: parentRef.getElementsByClassName('chart-container')[0],
//         classList: {
//             svg: 'z-chart'
//         }
//     });

//     this.tsChart.addSeries(this.seriesList[0]); // readings
//     this.tsChart.addSeries(this.seriesList[1]); //z-score
//         // setInterval(() => {
            

//             // this.connect();
//     this.storeReading();
//     // this.attachFocusWatcher();
//         // },1000);

//     // }

//     // componentWillUnmount() {
//     //     console.log("unmount")
//     //     // this.socket.disconnect();
//     // }

    


//     // attachFocusWatcher() {
//     //     window.focused = true;
//     //     window.onblur = () => {
//     //         window.focused = false;
//     //     };
//     //     window.onfocus = () => {
//     //         window.focused = true;
//     //     };
//     // }

//     //   setError = (type, error) => {
//     //     this.setState({ data: [], connected: false, error: `${error.toString()} | ${type}` });
//     //   }

//     /**
//     * `pointsToStore` is the number of stored data points
//     * - We need to cache more date than 20 
//     * - This should be useful when implementing variable `x-ticks` in UI
//     */
//     storeReading = () => {
//         // const reading = JSON.parse(response);


//         this.setState((prevState) => {
//             const data = prevState.data;

//             // const pointsToStore = Math.max(data.length - MAX_POINTS_TO_STORE, 0);

//             const options = {
//                 headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnRhZmpvcmQubm8iLCJpYXQiOjE2MjMzNTY0MTcsImV4cCI6MTYyMzQ0MjgxNywiYXpwIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXAiLCJzY29wZSI6InJlYWQ6c2Vuc29yZGF0YSByZWFkOm1sZGF0YSB3cml0ZTpzZW5zb3JkYXRhIHdyaXRlOm1sZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.PvctkaN8qOW7OWg3kIdM4eAq-5Enqt5A7czCY2u31aLOLNH9lnLIaxtXJuU5WBxN5JvY4iFBB1sPrl7_EbbOZJtcmiioEkovxHeaPIrnZ3xtItJxNmXuwT4ThP2BJWmFPxzkA7t0nWwXmdLHMH2Xaa8J8Zlfq4BKzLadn2euvqsJq9O0wYYM-KgfPt2bBazphMGY6SYnl--8xQaGO9I1Mvl__chqpkPKjgxrKGKHQ8pAJsdYWuohHcGXnVCL3MhjiDMXZlMdtoKQYV7kThEJ02lJAHaLSPzOLUOVIyMsAFPT4PMBk7qfmI-2JCKx-EjOqlpCAUp1yaBdKeVljMRFeQ' }
//             };
//             axios.get('https://tafjordhubrestapi.azurewebsites.net/api/sensors?limit=60&sensor=vibration_sensor_1&plant=ice_water_pump_1&aggregation=mae', options)
//                 .then(res => {
//                     console.log(res.data.dbdata[0].value)
//                     console.log(data)
//                     data.push(res.data.dbdata.map(row => row.value));
//                     console.log(data[0].slice(10))
//                 })
//                 .then(() => {

//                     console.log(data[0].slice(20))
                    
//                     return {
//                         data: data[0].slice(20),
//                         connected: true,
//                         error: false,
//                         lastTimestamp: Date.now()
//                         // lastTimestamp: new Date(data[data.length - 1].timestamp).toLocaleTimeString()
//                     };
//                 })

//             //   data.push(reading);



//         });

//         this.updateChart();
//     }



//     /**
//      * `highestValueInView` is used to calculate out the highest value in the currently
//      * shown data in order to normalize the zscores 0/1 to it
//      */
//     updateChart(()=> {
//         console.log('oi')
//         console.log(this.state.data)
//         const xTicks = Math.max(this.state.data.length - (20 || DEFAULT_X_TICKS), 0);
//         const data = this.state.data.slice(xTicks);
//         const highestValueInView = Math.max(...data.map(p => p.value));
//         const zLine = data.map(p => ({ timestamp: p.timestamp, value: p.zscore ? highestValueInView : 0 }));

//         this.tsChart.adjustAxes(data);
//         this.tsChart.setSeriesData('sensor-data', data, false);
//         this.tsChart.setSeriesData('z-score', zLine, false);
//     }


//     toggleSeries = ({ target }) => {
//         target.classList.toggle('hidden');
//         this.tsChart.toggleSeries(target.id);
//     }

//     render = () => (
//         <div className="card">

//             <h2>{!this.state.lastTimestamp ? 'Connecting...' : `Sensor 1`}</h2>

//             <span className={'status ' + (this.state.connected ? 'success' : 'danger')}>
//                 {this.state.error}
//                 <i className="pulse"></i>
//                 {this.state.connected ? 'Connected' : 'Disconnected'}
//             </span>

//             <div className={'chart-container ' + (this.state.error ? 'faded' : '')}></div>


//             <div className="legend">
//                 {this.seriesList.map((series) => {
//                     return (
//                         <span
//                             id={series.name}
//                             key={series.name}
//                             className={series.labelClass}
//                             onClick={this.toggleSeries}>
//                             <i className="box"></i>
//                             {series.label}
//                         </span>
//                     );
//                 })}
//             </div>

//             <span className={'timestamp ' + (this.state.connected ? 'success' : 'danger')}>
//                 {this.state.connected ? '' : 'Last reading was at '}
//                 {this.state.lastTimestamp}
//             </span>

//         </div>
//     )

// }
// export default Plot;