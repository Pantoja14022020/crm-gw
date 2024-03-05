import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getSession, getTypeUser, getUserLogged } from '../helpers/localstorage';
import Option from './Option'
import { useEffect, useState } from 'react';
import BarStatus from './BarStatus';

function Header({interfaceShowed,fullname, notificationsStored, numNotifications, setNumNotifications,setNotificationsStored, sectionSelectedTLU, setSectionSelectedTLU, checkedOptions, setCheckedOptions}){

    const [showModalOption, setShowModalOption] = useState(false)
    const [showModalNotifications, setShowModalNotifications] = useState(false);

    const logout = () => {//Funcion para cerrar sesion
        localStorage.removeItem("session")
        //localStorage.clear()
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




    //Son las subsecciones para la etapa Precandidate
    const sectionsPrecanditeTLU = [
        {
            id: 0,
            title: 'General Information',
            name: 'gi',
            paint: true
        },
        {
            id: 1,
            title: 'Process Recruitment',
            name: 'pr',
            paint: false
        }

    ]//Cual subseccion esta seleccionado en el Togle
    function setSelectedOption(name){
        setSectionSelectedTLU(name)
        setCheckedOptions([])
    }    


    return(
        <header className='header-aside-dashboard'>
            {
                interfaceShowed == 'overview' 
                    ? <h1 className='animate__animated animate__bounceInDown'>¡Hola {fullname}! 👋</h1> 
                    : (interfaceShowed == 'precandidate' ? <BarStatus sections={sectionsPrecanditeTLU} sectionSelected={sectionSelectedTLU} setSectionSelected={setSelectedOption}/> : <></>) 
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