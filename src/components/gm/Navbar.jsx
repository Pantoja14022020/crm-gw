import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";


function Navbar({options,location,setInterfaceSelected,interfaceSelected,logout}){

    //USE STATES para el navbar principal
    const [showOptions, setShowOptions] = useState(false)

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
                        </ul>
                        <button onClick={e => logout()}>Log Out</button>
                    </nav> 
                : <></>
            }
        </>
    )
}

export default Navbar;