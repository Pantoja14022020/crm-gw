import React from 'react';
import Section from './Section'
import CountUp from 'react-countup';
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement} from 'chart.js'
Chart.register(ArcElement,Legend,Tooltip,CategoryScale,LinearScale,BarElement);


function Overview({info}){


    const data_general_gm = {
      labels: ['Prospecto', 'Calificación', 'Compromiso','Negociación','Cierre','Postventa'],
      datasets: [
        {
          data: [23,12,45,21,16,32],
          backgroundColor: ['#e60000','#00b94d','#6a19ff','#1984ff','#ff1952','#ffee03']
        }
      ]
    }

    //Datos para los graficos
    const data_general_tlu = {
        labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
        datasets: [
          {
            data: [100, 50, 80,45,89,43],
            backgroundColor: ['#2020cc']
          },
        ],
    };
    const data_type_employment = {
        labels: ['Profesional', 'Oficio'],
        datasets: [{
          data: [20,10],
          backgroundColor: ['#eb0027','#2020cc']
        }]
    };
    const data_status_professional = {
        labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
        datasets: [{
          data: [20,10,5,12,4,12],
          backgroundColor: ['#eb0027']
        }]
    };
    const data_status_trade = {
      labels: ['No continuo', 'Pendiente', 'En revisión','Rechazado','En consideración','Contratado'],
      datasets: [{
        data: [20,10,5,12,4,12],
        backgroundColor: ['#2020cc']
      }]
    };
    const options_bar_tlu = {
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


    const options_bar_gm = {
        plugins:{
          legend:{
            display: false
          }
        },
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
        <div className={`overview ${info == "tl" ? 'overview-tlu' : (info == "gm" ? 'overview-gm' : 'overview-gw')}`}>{/*Aqui decidimos que estrcutura del resumen vamos a mostrar */}
            {
              info == "tl" ? 
                  <>
                    <Section sectionName="etr" title="Employment type requested" description="It's the type of employment that candidates aspire to" icon={true} nameIcon="chart">
                      <Bar data={data_type_employment} options={options_bar_tlu}/>
                    </Section>
                    <Section sectionName="pes" title="Professional Employment Status" description="It's status in selection process to employment professional" icon={true} nameIcon="chart">
                        <Bar data={data_status_professional} options={options_bar_tlu}/>
                    </Section>
                    <Section sectionName="tes" title="Trade Employment Status" description="It's status in selection process to employment trade" icon={true} nameIcon="chart">
                        <Bar data={data_status_trade} options={options_bar_tlu}/>
                    </Section>
                    <Section sectionName="gen" title="Status all candidates" description="It's status all candidates (trade & professional) in selection process" icon={true} nameIcon="chart">
                        <Doughnut className='centerVertical' data={data_general_tlu} options={options_dought}/>
                    </Section>
                    <Section sectionName="tc" title="Total candidates" description="Have applied for a professional or trade type of job">
                      <CountUp className='centerVertical' start={0} end={100} duration={2.5} style={{width: "90%",textAlign:"center",marginTop:"1rem",fontSize: "3rem", fontWeight: "900", color: '#222'}} />
                    </Section>
                  </>
                : (info == "gm" ? 
                  <>
                    <Section sectionName="sta" title="Overview status customers" description="An overview about custumer's current state " icon={true} nameIcon="chart">
                      <Bar className='centerVertical size-bar' width="400px" data={data_general_gm} options={options_bar_gm} />
                    </Section>
                  </>
                  : 
                  <></>
                )
            }
        </div>
    )
}

export default Overview;