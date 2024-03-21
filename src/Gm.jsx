import Navbar from './components/gm/Navbar'
import Overview from './components/gm/Overview'
import './styles/gm/gm.css'
import './styles/gm/navbar.css'
import './styles/gm/logo.css'
import './styles/gm/overview.css'
import { useState } from 'react'

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





    return(
        <main className='content-gm'>
            <Navbar options={options} location="main" interfaceSelected={interfaceSelected} setInterfaceSelected={setInterfaceSelected} logout={logout}/>
            {
                interfaceSelected == 'overview' ? <Overview/> : <></>
            }
        </main>
    )
}

export default Gm;