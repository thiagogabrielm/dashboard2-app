import React, { useState, useEffect } from 'react';

import {
    XAxis,
    YAxis,
    Borders,
    HorizontalGridLines,
    XYPlot,
    LineSeries,
    Highlight
} from 'react-vis';

import axios from 'axios'


export default function PlotReactVis({ plant, sensor, aggregation }) {
    const [series, setSeries] = useState([
        {
            data: [],
            loaded: false,
            title: 'Plot'
        }
    ])

    const [selection, setSelection] = useState(null)
    const limit = 2000;
    const [lastDrawLocation, setLastDrawLocation] = useState(null)
    const [unit, setUnit] = useState(null)

    useEffect(() => {
        

        const apiCall = async () => {
            var data_db = [];
            const options = {
                headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZmxJZFhjdzVZSDdmR3E5NzRrU3ZvcHg1Q3RHMWNmRG9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLm5vZ3ZhLm5vIiwiaWF0IjoxNjIzNjc2NTgxLCJleHAiOjE2MjM3NjI5ODEsImF6cCI6ImZsSWRYY3c1WUg3ZkdxOTc0a1N2b3B4NUN0RzFjZkRvIiwic2NvcGUiOiJyZWFkOnNlbnNvcmRhdGEgcmVhZDptbGRhdGEgd3JpdGU6c2Vuc29yZGF0YSB3cml0ZTptbGRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.kFh2HTDSfhcKL4QDkBg3G4BC4GUZXMLSpbOfHkXYYKVj3v8nim6CxbZINYLynE9kLSfF22eoKTwK8wF0u8UnIj_rF3r4rMJmp0FNNP9-ajmAGMTJZSYD4Zi3y4uImI6JpGzAnISdvmytjdirya1CllrWTM7kmLqoH4NCRUB4R4pDksuDPe_81Ivfy6xq9tbbh4PvFKstc7Jhgu9BpW6z6OVi8LTvY-CEQICkXwGpVXYl7cSo1zmREGSd6y_WnmFSxYFZ1DOAK9Eac0JcY447IJY1ytuzxXeVdGlsBv-F4e1in9zI11Qh7DO7clq1VPpW-MymQfuIVT4DVSVSherMhQ' }
            };
            const url = 'https://nogvahubrestapi.azurewebsites.net/api/sensors?limit=' + limit + '&sensor=' + sensor + '&plant=' + plant + '&aggregation=' + aggregation;
            console.log('try fetch...')
            try {
                const res = await axios.get(url, options);
                // console.log(res.data.dbdata[0])
                await data_db.push(res.data.dbdata.map(row => ({ x: new Date(Date.parse(row.time)).getTime(), y: parseFloat(row.value) })))
                var seriesCopy = series.slice();
                seriesCopy[0].data = data_db[0]
                seriesCopy[0].loaded = true
                setSeries(seriesCopy)
                setUnit(res.data.dbdata[0].unit)
                // console.log(data_db)
                console.log('apicall')
            } catch (err) {
                console.log("error: ")
                console.log(err)
            }

        }
        apiCall();

      
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {

            const apiCall = async () => {
                var data_db = [];
                const options = {
                    headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZmxJZFhjdzVZSDdmR3E5NzRrU3ZvcHg1Q3RHMWNmRG9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLm5vZ3ZhLm5vIiwiaWF0IjoxNjIzNjc2NTgxLCJleHAiOjE2MjM3NjI5ODEsImF6cCI6ImZsSWRYY3c1WUg3ZkdxOTc0a1N2b3B4NUN0RzFjZkRvIiwic2NvcGUiOiJyZWFkOnNlbnNvcmRhdGEgcmVhZDptbGRhdGEgd3JpdGU6c2Vuc29yZGF0YSB3cml0ZTptbGRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.kFh2HTDSfhcKL4QDkBg3G4BC4GUZXMLSpbOfHkXYYKVj3v8nim6CxbZINYLynE9kLSfF22eoKTwK8wF0u8UnIj_rF3r4rMJmp0FNNP9-ajmAGMTJZSYD4Zi3y4uImI6JpGzAnISdvmytjdirya1CllrWTM7kmLqoH4NCRUB4R4pDksuDPe_81Ivfy6xq9tbbh4PvFKstc7Jhgu9BpW6z6OVi8LTvY-CEQICkXwGpVXYl7cSo1zmREGSd6y_WnmFSxYFZ1DOAK9Eac0JcY447IJY1ytuzxXeVdGlsBv-F4e1in9zI11Qh7DO7clq1VPpW-MymQfuIVT4DVSVSherMhQ' }
                };
                const url = 'https://nogvahubrestapi.azurewebsites.net/api/sensors?limit=' + limit + '&sensor=' + sensor + '&plant=' + plant + '&aggregation=' + aggregation;
                console.log('try fetch...')
                try {
                    const res = await axios.get(url, options);
                    // console.log(res.data.dbdata[0])
                    await data_db.push(res.data.dbdata.map(row => ({ x: new Date(Date.parse(row.time)).getTime(), y: parseFloat(row.value) })))
                    var seriesCopy = series.slice();
                    seriesCopy[0].data = data_db[0]
                    seriesCopy[0].loaded = true
                    setSeries(seriesCopy)
                    setUnit(res.data.dbdata[0].unit)
                    // console.log(data_db)
                    console.log('apicall')
                } catch (err) {
                    console.log("error: ")
                    console.log(err)
                }

            }
            apiCall();

        }, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <div style={{
                width: `1000px`,
                height: `420px`,
            }}>
                {series[0].loaded ? (
                    <>
                        <div>
                            {plant.replace(/_/g, " ")} / {sensor.replace(/_/g, " ")}
                        </div>
                        <XYPlot
                            xType="time"
                            animation
                            xDomain={
                                selection != null && selection.hasOwnProperty('selectionStart') && selection.selectionStart != null ? (lastDrawLocation ? [
                                    Math.max(selection.selectionStart, lastDrawLocation.left),
                                    Math.min(selection.selectionEnd, lastDrawLocation.right)
                                ] : [
                                    selection.selectionStart,
                                    selection.selectionEnd
                                ]) : (lastDrawLocation ? [
                                    lastDrawLocation.left,
                                    lastDrawLocation.right
                                ] : null)
                            }
                            yDomain={
                                lastDrawLocation && [
                                    lastDrawLocation.bottom,
                                    lastDrawLocation.top
                                ]
                            }

                            width={1000}
                            height={300}
                        >
                            <HorizontalGridLines />

                            {series.map(entry => (
                                <LineSeries key={entry.title} data={entry.data} />
                            ))}

                            <Borders style={{
                                all: { fill: 'white' },
                            }} />
                            <YAxis position='end' title={unit} />
                            <XAxis position='end' title='time' />

                            <Highlight
                                onBrushEnd={area => setLastDrawLocation(area)}
                                onDrag={area => {
                                    setLastDrawLocation({
                                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                                        left: lastDrawLocation.left - (area.right - area.left),
                                        right: lastDrawLocation.right - (area.right - area.left),
                                        top: lastDrawLocation.top + (area.top - area.bottom)
                                    }
                                    );
                                }}
                            />
                        </XYPlot>

                        <XYPlot
                            xType="time"
                            animation

                            width={1000}
                            height={100}
                        >
                            <HorizontalGridLines />

                            <YAxis />
                            <XAxis />

                            {series.map(entry => (
                                <LineSeries key={entry.title} data={entry.data} />
                            ))}

                            <Highlight
                                color="#829AE3"
                                drag
                                enableY={false}
                                onBrushEnd={area => {
                                    setSelection({
                                        selectionStart: area && area.left,
                                        selectionEnd: area && area.right
                                    });
                                }}
                                onDrag={area => {
                                    setSelection({
                                        selectionStart: area && area.left,
                                        selectionEnd: area && area.right
                                    });
                                }}
                                onDragEnd={area => {
                                    setSelection({
                                        selectionStart: area && area.left,
                                        selectionEnd: area && area.right
                                    });
                                }}
                            />

                        </XYPlot>

                    </>
                ) : (
                    <div>
                        Loading...
                    </div>
                )}
            </div>

        </>
    );

}
