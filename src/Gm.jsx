import Navbar from './components/gm/Navbar'
import Overview from './components/gm/Overview'
import Board from './components/gm/Board'
import Prospecto from './components/gm/Prospecto'
import './styles/gm/gm.css'
import './styles/gm/navbar.css'
import './styles/gm/logo.css'
import './styles/gm/overview.css'
import './styles/gm/board.css'
import './styles/gm/table.css'
import './styles/gm/subsectionBoard.css'
import './styles/gm/companyItem.css'
import './styles/gm/search.css'
import './styles/gm/prospecto.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Gm(){


    //Establece la opcion del navbar seleccionada y establece que interfaz se mostrara
    const [interfaceSelected, setInterfaceSelected] = useState(localStorage.getItem('interfaceSelectedGM') == null ? 'overview' : localStorage.getItem('interfaceSelectedGM'))


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
            title: 'Prospect',
            name: 'prospecto'
        },
        {
            title: 'Qualification',
            name: 'calificacion'
        },
        {
            title: 'Engagement',
            name: 'compromiso'
        },
        {
            title: 'Negotiation',
            name: 'negociacion'
        },
        {
            title: 'Closing',
            name: 'cierre'
        },
        {
            title: 'Post Sale',
            name: 'postventa'
        }
    ]
    //Funcion para cerrar sesion
    const logout = () => {
        localStorage.removeItem("session")
        window.location.href = '/'
    }


    const [customers,setCustomers] = useState([])
    const [showSpinner,setShowSpinner] = useState(true)
    async function getCustomersDB(){
        const response = await axios.get('https://api-gw-cpa-pc-20aq.onrender.com/gm/customer');   
        setCustomers(prevs => {
            return response.data.customers.map((row) => { 
                return row;
            });
        });
        setShowSpinner(false)
    }
    useEffect(()=>{
        getCustomersDB()
    },[])

    
    return(
        <main className='content-gm'>
            <Navbar options={options} location="main" interfaceSelected={interfaceSelected} setInterfaceSelected={setInterfaceSelected} logout={logout}/>
            {
                interfaceSelected == 'overview' ? <Overview customers={customers} showSpinner={showSpinner}/> : <></>
            }
            {
                interfaceSelected == 'board' ? <Board customers={customers} setCustomers={setCustomers} showSpinner={showSpinner} /> : <></>
            }
            {
                interfaceSelected == 'prospecto' ? <Prospecto customers={customers.filter(customer => customer.prospecto == true)} showSpinner={showSpinner}/> : <></>
            }
        </main>
    )
}

export default Gm;