import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { RiContactsFill } from "react-icons/ri";


function Navbar({options,location,setInterfaceSelected,interfaceSelected,logout}){

    
    //USE STATES y useEffects para el navbar principal o el navbar con la clase 'navbar-gm-main'
    const [showOptions, setShowOptions] = useState(false)//Mostrar las opciones o fases
    const [showOptionContacts,setShowOptionsContacts] = useState(true)
    function handleClickBtnContact(){//Cuando se de click en el boton de contactos
        setShowOptions(false)
        setInterfaceSelected('contacts')
    }
    //USE STATES y useEffects para el navbar principal o el navbar con la clase 'navbar-gm-main'    




    return(
        <>
            {
                location == 'main' ? 
                    <nav className="navbar-gm-main">
                        <h1><span>GM</span> International Consultants</h1>
                        <ul>
                            {
                                showOptions ? 
                                    options.map((option,idx)=>(
                                        <li className={`${interfaceSelected == option.name ? 'active-option-main' : ''}`} key={idx} onClick={e => setInterfaceSelected(option.name)} >{option.title}</li>
                                    ))
                                : <></>
                            }
                            <button className={`btn-show-navbar-main ${showOptions ? 'rotate-navbar-main' : ''}`} onClick={e => setShowOptions(!showOptions)}><CgMenuGridO /></button>
                            {
                                showOptionContacts ? <button className="btn-contacts-navbar-main" onClick={e => handleClickBtnContact()} ><RiContactsFill /></button> : <></>
                            }
                        </ul>
                        <button onClick={e => logout()}>Log Out</button>
                    </nav> 
                : <></>
            }
        </>
    )
}

export default Navbar;