import Button from "./Button";
import Profile from "./Profile"
import {NavLink, json} from 'react-router-dom'
import { SiCivicrm } from "react-icons/si";
import { useState, useEffect } from "react";
import { getTypeUser,saveOptionSelected } from '../helpers/localstorage';
import { MdArrowForwardIos } from "react-icons/md";
import Profiles from "./Profiles";
import Icon from "./Icon";
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';


function Nav({options,profiles,setInterfaceShowed, showNavbar, setShowNavbar}){

    //Variable para mostrar los distintos worspaces gw gm y tlu
    const [showProfiles, setShowProfiles] = useState(false);

    //Seleccionamos o pintamos el primer elemento
    const [optionSelected, setOptionSelected] = useState(localStorage.getItem('optionSelected') || options[0].name);//Permite alamcenar la opcion seleccionada
    



    //setInterfaceShowed(localStorage.getItem('optionSelected') || options[0].name)
    
    

    //Cada que se seleccione la opcion, se guarda en el localstorage
    useEffect(()=>{
        localStorage.setItem('optionSelected',optionSelected)
        setInterfaceShowed(localStorage.getItem('optionSelected'))
    },[optionSelected])


    //Funcion para mostrar o esconder el cuadro de espacios de trabajo: gw o gm o tl
    function handleShowProfiles(){
        setShowProfiles(!showProfiles)
    }

    return (
        <>
        <div className={`btn-menu-nav ${showNavbar ? 'right-show' : 'move-arrow left-hide' }`} onClick={(e)=>setShowNavbar(!showNavbar)}>{/*Este es el boton negro que oculta o muestra el navbar */}
                <MdArrowForwardIos />
        </div>
        <nav className={`navbar-dashboard ${showNavbar ? 'position-relative' : 'hide-navbar-dashboard'}`}>
            {
                showProfiles ? <Profiles profiles={profiles}/> : <></>
            }
            <div>
                <ul className="options-navbar">
                    {
                        options.map((option,id)=>(
                            <li key={id}>
                                <NavLink 
                                    onClick={()=> setOptionSelected(option.name)}
                                    className={optionSelected == option.name ? 'selected' : ''}
                                >
                                        <i>{option.icon}</i>
                                        <p>{option.txt}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                getTypeUser() == 'gm' 
                ? 
                  <>
                    <div className="container-button-nav">
                        <Button txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6"/>
                    </div>
                  </>
                : <></>
            }
        </nav>
        </>
    )
}

export default Nav;