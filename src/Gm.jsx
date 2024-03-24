import Navbar from './components/gm/Navbar'
import Overview from './components/gm/Overview'
import Board from './components/gm/Board'
import './styles/gm/gm.css'
import './styles/gm/navbar.css'
import './styles/gm/logo.css'
import './styles/gm/overview.css'
import './styles/gm/board.css'
import './styles/gm/table.css'
import './styles/gm/subsectionBoard.css'
import './styles/gm/companyItem.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Gm(){


    //Establece la opcion del navbar seleccionada y establece que interfaz se mostrara
    const [interfaceSelected, setInterfaceSelected] = useState('overview')


    //Options para el navbar principal
    const options = [
        {
            title: 'Overview',
            name: 'overview'
        },
        {
            title: 'Board',
            name: 'board'
        },
        {
            title: 'Prospecto',
            name: 'prospecto'
        },
        {
            title: 'Calificacion',
            name: 'calificacion'
        },
        {
            title: 'Compromiso',
            name: 'compromiso'
        },
        {
            title: 'Negociacion',
            name: 'negociacion'
        },
        {
            title: 'Cierre',
            name: 'cierre'
        },
        {
            title: 'Postventa',
            name: 'postventa'
        }
    ]
    //Funcion para cerrar sesion
    const logout = () => {
        localStorage.removeItem("session")
        window.location.href = '/'
    }


    const [customers,setCustomers] = useState([])
    async function getCustomersDB(){
        const response = await axios.get('https://api-gw-cpa-pc-20aq.onrender.com/gm/customer');   
        setCustomers(prevs => {
            return response.data.customers.map((row) => { 
                return row;
            });
        });
    }
    useEffect(()=>{
        getCustomersDB()
    },[])

    
    return(
        <main className='content-gm'>
            <Navbar options={options} location="main" interfaceSelected={interfaceSelected} setInterfaceSelected={setInterfaceSelected} logout={logout}/>
            {
                interfaceSelected == 'overview' ? <Overview/> : <></>
            }
            {
                interfaceSelected == 'board' ? <Board customers={customers}/> : <></>
            }
        </main>
    )
}

export default Gm;