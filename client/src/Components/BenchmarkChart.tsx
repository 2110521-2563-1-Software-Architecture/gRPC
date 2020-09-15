import React from 'react';
import {Scatter} from 'react-chartjs-2';

interface BenchmarkChartState {
    chartData: object
}

export default function BenchmarkChart(props: { data: any; }) {
    const [state, setState] = React.useState<BenchmarkChartState>({
        chartData: {
            datasets:[{
                label: 'REST API',
                data: props.data,
                pointRadius: 5,
                pointHoverRadius: 5,
                fill: false,
                showLine: true,
                borderColor: 'rgb(255,100,100)'
            }]
        }
    });
    React.useEffect(() => {
        setState({
                chartData: {
                    datasets:[{
                        label: 'REST API',
                        data: props.data,
                        pointRadius: 5,
                        pointHoverRadius: 5,
                        fill: false,
                        showLine: true
                    }]
                }
        });
    }, [props]);
    return (
        <div>
            <Scatter
            data={state.chartData}
            options={{
                title:{
                    display: true,
                    text: 'Comparing response times (ms)',
                    fontSize: 25
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                },
            }}
            width={800}
            height={400}/>
        </div>
    );
}