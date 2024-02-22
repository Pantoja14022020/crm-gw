import Nav from './components/Nav'
import Header from './components/Header'
import Overview from './components/Overview'
import './styles/dashboard.css'
import './styles/components/nav.css'
import './styles/components/header.css'
import './styles/components/icon.css'
import './styles/components/profile.css'
import './styles/components/profiles.css'
import './styles/components/overview.css'
import './styles/components/section.css'
import './styles/components/option.css'
import './styles/components/board.css'
import './styles/components/precandidate.css'
import './styles/components/barstatus.css'
import './styles/components/search.css'
import './styles/components/table.css'
import './styles/components/actionbar.css'
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import tlu from './public/tl.png';
import gm from './public/gm.png';
import gw from './public/gw.jpg';
import { getTypeUser,getOptionSelectedFromLocalStorage,getUserLogged} from './helpers/localstorage';
import { useEffect, useState } from 'react'
import {fetchUrlGet} from './helpers/fetchs'
import Board from './components/Board'
import Precandidate from './components/Precandidate'

function Dashboard(){


    //Obtener los datos de la sesion que se logeo en el sistema
    const {id_user,email,msg,area,fullname} = getUserLogged();


    const [interfaceShowed,setInterfaceShowed] = useState(localStorage.getItem('optionSelected'));
    



    
    const [columnsTLU, setColumnsTLU] = useState([]);
    const [rowsTLU, setRowsTLU] = useState([]);
    async function getPrecandidates(){
        const {candidates} = await fetchUrlGet('https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/');   
        //Definir columnas
        setColumnsTLU(candidates[0]);
        //Definir filas
        const justRows = candidates.slice(1)//Saca el primer arreglo ya que ese son las columnas y nos quedamos con puras filas
        setRowsTLU(justRows);
    }
    useEffect(()=>{//Aqui hago peticion para obtener los candidatos del excel para TL GM o GW
        if(getTypeUser() == 'tl'){
            getPrecandidates();
        }
    },[])





    //Options por cada crm 
    const tl = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview'
        },
        {
            id: 1,
            txt: "Precandidates",
            icon: <FaUserFriends />,
            name: 'precandidate'
        }
    ]
    

    const gmi = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview'
        },
        {
            id: 1,
            txt: "Board",
            icon: <FaUserFriends />,
            name: 'board'
        },
        {
            id: 2,
            txt: "Customers",
            icon: <FaUserFriends />,
            name: 'customers_gm'
        }
    ]


    const gwcpa = [
        {
            id: 0,
            txt: "Overview",
            icon: <FaUserFriends />,
            name: 'overview'
        }
    ]



    return(
        <main className="dashboard">
            <Nav options={  getTypeUser() == 'gm' ? gmi : ( getTypeUser() == 'gw' ? gwcpa : tl)   } /**profiles={profiles}**/ setInterfaceShowed={setInterfaceShowed}/>
            <aside style={{backgroundColor: `${interfaceShowed !== 'overview' ? '#fff' : '' }`}}>
                <Header interfaceShowed={interfaceShowed} fullname={fullname}/>
                <div className="content-dashboard">
                    {   /*Aqui decidimo que tipo de Overview vamos a mostrar, dependiendo el tipo de usuario que inicio sesion */
                        
                        interfaceShowed == 'overview' ? //Si la opcion seleccionada es el overview, entonces
                            (getTypeUser() == 'tl' ? <Overview info="tl"/> : ( getTypeUser() == "gm" ? <Overview info="gm"/> : <Overview info="gw"/>))//Evaluamos que overvies mostramos, depende del tipo de usuario que ha iniciado sesion
                        :(interfaceShowed == 'board' ? 
                            <Board/>
                        :(interfaceShowed == "precandidate" ? <Precandidate rows={rowsTLU} columns={columnsTLU}/>
                        : <></>)) 
                    }              
                </div>
            </aside>
        </main>
    )
}

export default Dashboard;