import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getSession, getTypeUser, getUserLogged } from '../helpers/localstorage';
import Option from './Option'
import { useState } from 'react';
import BarStatus from './BarStatus';

function Header({interfaceShowed,fullname}){

    const [showModalOption, setShowModalOption] = useState(false)

    const logout = () => {//Funcion para cerrar sesion
        localStorage.removeItem("session")
        localStorage.clear()
        window.location.href = '/'
    }

    const showModalOptions = () => {
        setShowModalOption(!showModalOption)
    }

    const optionsProfile = [//Opciones que se muestran como por ejemplo (cerrar sesion)
        {
            id: 0,
            txt: "Cerrar sesion",
            icon: "logout",
            fn: logout
        }
    ]



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
                <Icon type="icon" name="notification" spaceHorizontal={true} width="40px" height="40px"/>
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
        </header>
    )
}

export default Header;