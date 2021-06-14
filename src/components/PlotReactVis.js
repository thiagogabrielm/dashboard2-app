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
    const limit = 1440;
    const [lastDrawLocation, setLastDrawLocation] = useState(null)


    useEffect(() => {
        const interval = setInterval(() => {

            const apiCall = async () => {
                var data_db = [];
                const options = {
                    headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ims3NHM4RXR3SEp6RlV4Y19sSDNsUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1kaXBhaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnRhZmpvcmQubm8iLCJpYXQiOjE2MjM2MDA5MDcsImV4cCI6MTYyMzY4NzMwNywiYXpwIjoiUjVaNVowaXdqdm1qeTF5MGxMRXlmRmVPR1JjV2dXeXAiLCJzY29wZSI6InJlYWQ6c2Vuc29yZGF0YSByZWFkOm1sZGF0YSB3cml0ZTpzZW5zb3JkYXRhIHdyaXRlOm1sZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.IoBgP4TRYAfpQ_h8WqXDxyMZcCL51zhTUZHvBetY1W8pwhGgtok-SMDLUtQxBPRS_Z0gxTeQ-11pNCS6IMOrKaSvz_qkzKXq19PHu6TG9oQ95khIFSQLjUVaIz_6IHG7sTjCrIkUlRjv98XFVRT67HAnnHPV6lFKSOL-t4tXAMYT4J0KQXd0IKl3G-bbsOTp5GW8eFKTsiXCpfHvOlryoGU9wPAJZ7R3RI2fVlbbRrdItjXlHCwiy8y7m6Vh_6Clf2Z_6g4iRm7bHVgK2Leocoti4qd_uqf9MW8AfEWtX_V_8AnO893fm8TWl_3jgJzYTH_emUP34aLyKIth4ZtCBA' }
                };
                const url = 'https://tafjordhubrestapi.azurewebsites.net/api/sensors?limit=' + limit + '&sensor=' + sensor + '&plant=' + plant + '&aggregation=' + aggregation;
                const res = await axios.get(url, options);
                // console.log(res.data.dbdata[0])
                // var unit = unitRef.current
                // unit = res.data.dbdata[0].unit;
                await data_db.push(res.data.dbdata.map(row => ({ x: new Date(Date.parse(row.time)).getTime(), y: 20 * parseFloat(row.value) })))
                var seriesCopy = series.slice();
                seriesCopy[0].data = data_db[0]
                seriesCopy[0].loaded = true
                setSeries(seriesCopy)
                // console.log(data_db)
                console.log('apicall')


            }
            apiCall();

        }, 10000);
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
                            <YAxis position='end' title='g' />
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
