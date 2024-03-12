import { useEffect } from 'react';
import Section from './Section'
import CountUp from 'react-countup';
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement} from 'chart.js'
import Modal from './Modal';
Chart.register(ArcElement,Legend,Tooltip,CategoryScale,LinearScale,BarElement);


function Overview({info,notificationModal,setNotificationModal,totalAllPeople,jobTrade,jobProfessional}){


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



    //Para quitar el modal de notificacion una vez aparezca
    useEffect(()=>{
      const timer = setTimeout(()=>{
          setNotificationModal(false)
      },10000)
      return () => clearTimeout(timer)
    },[notificationModal])


    return(
        <div className={`overview ${info == "tl" ? 'overview-tlu' : (info == "gm" ? 'overview-gm' : 'overview-gw')}`}>{/*Aqui decidimos que estrcutura del resumen vamos a mostrar */}
            {
              info == "tl" ? 
                  <>
                    {//Es el modal de notificacion cuando hay cambios en el excel
                            notificationModal ? 
                            <>
                                <div className="modal-notify-section-precandidates">{/*Es el cuadro padre que almacena el modal */}
                                    <Modal title="New Changes" message="There's changes in your SpreadSheets, its been added" type="notify" modalType="alert"/>
                                </div>
                            </>
                        :
                        <></>
                    }
                    <Section sectionName="etr" title="Quantity hired people" description="It's the total of people hired for a trade and professional job" icon={true} nameIcon="chart">
                      {/*<Bar data={data_type_employment} options={options_bar_tlu} className='centerVerticalSmall'/>*/}
                      <CountUp className='centerVertical' start={0} end={jobProfessional + jobTrade} duration={2.5} style={{width: "90%",textAlign:"center",marginTop:"1rem",fontSize: "3rem", fontWeight: "900", color: '#222'}} />
                    </Section>
                    <Section sectionName="pes" title="Hired for a professional job" description="Hired people for a job professional" icon={true} nameIcon="chart">
                        {/**<Bar data={data_status_professional} options={options_bar_tlu} className='centerVerticalSmall'/>**/}
                        <CountUp className='centerVertical' start={0} end={jobProfessional} duration={2.5} style={{width: "90%",textAlign:"center",marginTop:"1rem",fontSize: "3rem", fontWeight: "900", color: '#222'}} />
                    </Section>
                    <Section sectionName="tes" title="Hired for a trade job" description="Hired people for trade job" icon={true} nameIcon="chart">
                        {/**<Bar data={data_status_trade} options={options_bar_tlu} className='centerVerticalSmall'/>**/}
                        <CountUp className='centerVertical' start={0} end={jobTrade} duration={2.5} style={{width: "90%",textAlign:"center",marginTop:"1rem",fontSize: "3rem", fontWeight: "900", color: '#222'}} />
                    </Section>
                    {/*<Section sectionName="gen" title="Status all candidates" description="It's status all candidates (trade & professional) in selection process" icon={true} nameIcon="chart">
                        <Bar data={data_general_tlu} options={options_bar_tlu} className='centerVertical'/>
                        {/*<Doughnut className='centerVertical' data={data_general_tlu} options={options_dought} style={{width:"400px",height:"4000px"}}/>*/}
                    {/*</Section>*/}
                    <Section sectionName="tc" title="Total People" description="All people registered in our Data Base">
                      <CountUp className='centerVertical' start={0} end={totalAllPeople} duration={2.5} style={{width: "90%",textAlign:"center",marginTop:"1rem",fontSize: "3rem", fontWeight: "900", color: '#222'}} />
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