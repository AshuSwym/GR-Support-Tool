import { getDate } from '@/utils/utilFunctions'
import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import {
    TimeScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from 'chart.js'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip)
ChartJS.defaults.borderColor = '#fff'
ChartJS.defaults.color = '#fff'
ChartJS.defaults.font.size = 12
ChartJS.defaults.font.family = 'Jetbrains Mono'
ChartJS.defaults.scale.grid.display = false

const Graph = () => {
    const [data, setData] = useState({})
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Requests Logged',
            },
            scales: {
                x: {
                    type: 'time',
                    color: "red",
                    backgroundColor: "black",

                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY',
                        },
                    },
                },
                y: {
                    suggestedMin: -50,
                    suggestedMax: 500,
                },
            },
        },
    }

    useEffect(() => {
        const getData = async () => {
            const dataLine = {}
            const logs = await axios.get('/logs/getLogs')
            logs.data.forEach((log) => {
                const time = getDate(log.time)
                const val = dataLine[time] ? dataLine[time] + 1 : 1
                dataLine[time] = val
            })
            setData(dataLine)
        }

        getData()
    }, [])

    const labels = Object.keys(data)
    const values = Object.values(data)

    return (
        <div
            className="rounded-md"
            style={{
                background: 'rgba( 13, 13, 13, 0 )',
                boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                backdropFilter: 'blur( 13.5px )',
                WebkitBackdropFilter: 'blur( 13.5px )',
                borderRadius: '10px',
                border: '1px solid rgba( 255, 255, 255, 0.18 )',
                marginTop: "10px"
            }}
        >
            <div className="bg-white-300 p-2 sm:p-4 rounded-md h-350-px">
                <Line
                    updateMode="resize"
                    options={options}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Requests',
                                data: values,
                                backgroundColor: 'white',
                                borderColor: 'gray',
                                tension: 0.3,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    )
}

export default Graph
