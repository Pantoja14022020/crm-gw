import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement} from 'chart.js'
Chart.register(ArcElement,Legend,Tooltip,CategoryScale,LinearScale,BarElement);


function Overview(){


    //Datos para los graficos
    const data_circle = {
        labels: ['Rojo', 'Verde', 'Azul'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
    };

    const data_bar = {
        labels: ['Profesional', 'Oficio'],
        datasets: [
          {
            label: 'Empleos',
            data: [65],
            backgroundColor: ['rgba(75,192,192,0.2)'],
            borderColor: ['rgba(255,255,255)']
          },
          {
            label: 'Empleos',
            data: [65],
            backgroundColor: ['rgba(75,192,192,0.2)'],
            borderColor: ['rgba(255,255,255)']
          },
        ],
    };
    const options_bar = {
        scales: {
            x: {
              grid: {display: false},
            },
            y: {
              grid: {display: false},
            },
        }
    }


    return(
        <div className="overview">
            <div className="graph-circle">
                <Bar data={data_bar} options={options_bar}/>
            </div>
        </div>
    )
}

export default Overview;