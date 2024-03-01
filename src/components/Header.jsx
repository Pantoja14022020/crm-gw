import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getSession, getTypeUser, getUserLogged } from '../helpers/localstorage';
import Option from './Option'
import { useEffect, useState } from 'react';
import BarStatus from './BarStatus';

function Header({interfaceShowed,fullname, notificationsStored, numNotifications, setNumNotifications,setNotificationsStored}){

    const [showModalOption, setShowModalOption] = useState(false)
    const [showModalNotifications, setShowModalNotifications] = useState(false);

    const logout = () => {//Funcion para cerrar sesion
        localStorage.removeItem("session")
        localStorage.clear()
        window.location.href = '/'
    }


    useEffect(()=>{//Cuando cambie el estado de mostrar el modal de notificaciones
        if(showModalNotifications){//Ponerlo a 0 
            setNumNotifications(0)
        } else{
            //AQUI PODRIA QUITAR LA ETIQUETA DE NUEVOOO
            //notificationsStored es el arreglo que contiene todas las notificaciones
            if(notificationsStored.length > 0){
                const modifiedNotStored = notificationsStored.map( notif =>{
                    return {...notif, status: false}
                })
                setNotificationsStored(modifiedNotStored)
            }
        }
    },[showModalNotifications])

    const showModalOptions = () => {
        setShowModalOption(!showModalOption)
    }

    const showModalNotifis = () => {
        setShowModalNotifications(!showModalNotifications);
    }

    const optionsProfile = [//Opciones que se muestran como por ejemplo (cerrar sesion)
        {
            id: 0,
            txt: "Cerrar sesion",
            icon: "logout",
            fn: logout
        }
    ]

    /*const notifies = [//Son las notificaciones que se mostraran en el cuadro o modal al dar click en notificaciones
        {
            id: 0,
            txt: 'New row added in Sheets',
            icon: "sheets"
        },
        {
            id: 1,
            txt: 'New row added in Sheets',
            icon: "sheets"
        },
        {
            id: 2,
            txt: 'New row added in Sheets',
            icon: "sheets"
        }
    ]*/



    const stagesP = [
        {
            id: 0,
            title: 'Pre-Candidates',
            description: 'General Information and Recruitment Process',
            icon: <Icon color="#2020cc" size="1rem" name="edit" spaceHorizontal="true"/>,
            paint: true,
            end: false
        },
        {
            id: 1,
            title: 'Candidates',
            description: 'Selection Process',
            icon: <Icon color="#2020cc" size="1rem" name="user" spaceHorizontal="true"/>,
            paint: false,
            end: false
        },
        {
            id: 2,
            title: 'EB3 Workers',
            description: 'Client Documents and GM Process',
            icon: <Icon color="#00833b" size="1rem" name="check" spaceHorizontal="true"/>,
            paint: false,
            end: true
        }

    ]


    return(
        <header className='header-aside-dashboard'>
            {
                interfaceShowed == 'overview' 
                    ? <h1 className='animate__animated animate__bounceInDown'>¡Hola {fullname}! 👋</h1> 
                    : (interfaceShowed == 'precandidate' ? <BarStatus effect="animate__animated animate__bounceInDown" stages={stagesP} /> : <></>) 
            }
            <div className="icons-header-aside">
                <Icon num={numNotifications} type="icon" name="notification" spaceHorizontal={true} width="40px" height="40px" fn={showModalNotifis} showCounter={true}/>
                <Icon type="icon" name="options" spaceHorizontal={true} width="40px" height="40px" fn={showModalOptions}/>
                <Icon type="image"  url={getTypeUser() == 'gm' ? gm : ( getTypeUser() == 'gw' ? gw : tlu)} width="30px" height="30px"/>
                {/**<div className="profile-icon"><Icon shape="circle" width="40px" height="40px" type="image" url={ getTypeUser() == 'gm' ? gm : ( getTypeUser() == 'gw' ? gw : tlu) }/></div>**/}
            </div>
            {
                showModalOption ? 
                    <>
                        <div className="options-header">
                            <Option options={optionsProfile}/>
                        </div>
                    </> 
                :   <></>
            }
            {
                showModalNotifications ?  //Es el modal que se muestra con las notificaciones
                    <>
                        <div className="notifications-header">
                            {
                                notificationsStored.length > 0 ?
                                    <Option options={notificationsStored} showTitle={true} txtTitle="Notifications"/>
                                : <></>
                            }
                        </div>
                    </>
                :
                    <></>
            }
        </header>
    )
}

export default Header;