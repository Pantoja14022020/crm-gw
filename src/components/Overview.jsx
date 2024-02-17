import React from 'react';
import Section from './Section'
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement} from 'chart.js'
Chart.register(ArcElement,Legend,Tooltip,CategoryScale,LinearScale,BarElement);


function Overview(){


    //Datos para los graficos
    const data_general = {
        labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
        datasets: [
          {
            data: [100, 50, 80,45,89,43],
            backgroundColor: ['#ff4141','#2a63ff','#38e421','#7f00d4','#ffd000','#1696ff']
          },
        ],
    };
    const data_type_employment = {
        labels: ['Profesional', 'Oficio'],
        datasets: [{
          data: [20,10],
          backgroundColor: ['#ff4141','#2a63ff']
        }]
    };
    const data_status_professional = {
        labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
        datasets: [{
          data: [20,10,5,12,4,12],
          backgroundColor: ['#ff4141','#7f00d4','#2a63ff','#ffd000','#1696ff','#38e421']
        }]
    };
    const data_status_trade = {
      labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
      datasets: [{
        data: [20,10,5,12,4,12],
        backgroundColor: ['#7f00d4','#2a63ff','#ffd000','#ff4141','#38e421','#1696ff']
      }]
    };
    const options_bar = {
        plugins: {
          legend:{
            display: false
          }
        },
        scales: {
            x: {
              grid: {display: false},
              display: false
            },
            y: {
              grid: {display: false},
            },
        }
    }
    const options_dought = {
      plugins:{
        legend:{
          display: false
        }
      }
    }


    return(
        <div className="overview overview-tlu">
            <Section sectionName="etr" title="Employment type requested" description="It's the type of employment that candidates aspire to">
                <Bar data={data_type_employment} options={options_bar}/>
            </Section>
            <Section sectionName="pes" title="Professional Employment Status" description="It's status in selection process to employment professional">
                <Bar data={data_status_professional} options={options_bar}/>
            </Section>
            <Section sectionName="tes" title="Trade Employment Status" description="It's status in selection process to employment trade">
                <Bar className='centerVertical' data={data_status_trade} options={options_bar}/>
            </Section>
            <Section sectionName="gen" title="Status all candidates" description="It's status all candidates in selection process">
                <Doughnut className='centerVertical' data={data_general} options={options_dought}/>
            </Section>
        </div>
    )
}

export default Overview;