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
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import tlu from './public/tl.png';
import gm from './public/gm.png';
import gw from './public/gw.jpg';
import { getTypeUser,getOptionSelectedFromLocalStorage,getUserLogged} from './helpers/localstorage';
import { useState } from 'react'

function Dashboard(){


    //Obtener los datos de la sesion que se logeo en el sistema
    const {id_user,email,msg,area,fullname} = getUserLogged();


    const [interfaceShowed,setInterfaceShowed] = useState('');

    /*const profiles = [
        {
            id: 0,
            name: "tlu",
            txt: 'Trabajo Legal USA',
            image: tlu
        },
        {
            id: 1,
            name: "gmi",
            txt: 'GM International',
            image: gm
        },
        {
            id: 2,
            name: "gw",
            txt: 'GW CPA',
            image: gw
        }
    ]*/



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
            txt: "Board",
            icon: <FaUserFriends />,
            name: 'board_tl'
        },
        {
            id: 2,
            txt: "Candidates",
            icon: <FaUserFriends />,
            name: 'candidates_tl'
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
            name: 'board_gm'
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
            <aside>
                <Header interfaceShowed={interfaceShowed} fullname={fullname}/>
                <div className="content-dashboard">
                    {   /*Aqui decidimo que tipo de Overview vamos a mostrar, dependiendo el tipo de usuario que inicio sesion */
                        
                        interfaceShowed == 'overview' ? //Si la opcion seleccionada es el overview, entonces
                            (getTypeUser() == 'tl' ? <Overview info="tl"/> : ( getTypeUser() == "gm" ? <Overview info="gm"/> : <Overview info="gw"/>))//Evaluamos que overvies mostramos, depende del tipo de usuario que ha iniciado sesion
                        :<></> 
                    }              
                </div>
            </aside>
        </main>
    )
}

export default Dashboard;