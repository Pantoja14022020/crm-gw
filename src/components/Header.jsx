import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getTypeUser } from '../helpers/localstorage';
import Option from './Option'
import { useState } from 'react';

function Header({interfaceShowed}){

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

    return(
        <header className='header-aside-dashboard'>
            {
                interfaceShowed == 'overview' ? <h1 className='animate__animated animate__bounceInDown'>¡Welcome Daniel! 👋</h1> : <></>
            }
            <div className="icons-header-aside">
                <Icon type="icon" name="notification" spaceHorizontal={true} width="40px" height="40px"/>
                <Icon type="icon" name="options" spaceHorizontal={true} width="40px" height="40px" fn={showModalOptions}/>
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