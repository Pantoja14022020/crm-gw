import Button from "./Button";
import { SiCivicrm } from "react-icons/si";


function Nav(){
    return (
        <nav className="navbar-dashboard">
            <header className="header-navbar">
                <div><SiCivicrm color="#fff"/></div><p>crm</p>
            </header>
            <div className="container-button-nav">
                <Button txt="New contact" size="100%" iconAdd={true} colorIcon="#8585b6"/>
            </div>
        </nav>
    )
}

export default Nav;