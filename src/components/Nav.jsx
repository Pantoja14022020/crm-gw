import Button from "./Button";
import Profile from "./Profile"
import Option from './Option'
import { SiCivicrm } from "react-icons/si";


function Nav({options}){

    return (
        <nav className="navbar-dashboard">
            <div>
                <header className="header-navbar">
                    <div><SiCivicrm color="#fff"/></div><p>crm</p>
                </header>
                <Profile/>
                <div className="options-navbar">
                    {
                        options.map((option,idx)=>(
                            <Option idx={idx} key={idx} txt={option.txt} icon={option.icon}/>
                        ))
                    }
                </div>
            </div>
            <div className="container-button-nav">
                <Button txt="New contact" size="100%" iconAdd={true} colorIcon="#8585b6"/>
            </div>
        </nav>
    )
}

export default Nav;