import Button from "./Button";
import Profile from "./Profile"
import Option from './Option'
import { SiCivicrm } from "react-icons/si";


function Nav({options}){

    const selectedBtn = e => {
        console.log("click")
        e.target.parentNode.childNodes.forEach(op => {
            if(parseInt(op.getAttribute('id')) == parseInt(e.target.getAttribute('id'))){
                console.log("yo")
                e.target.classList.add('active') //e.target.classList.contains('option-navbar')
            }else{
                e.target.classList.remove('active')
            }
        })
        //console.log(parseInt(e.target.getAttribute('id')))
        //if (e.target.classList.contains('option-navbar') ) e.target.classList.add('active') 
    }

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
                            <Option idx={idx} key={idx} txt={option.txt} icon={option.icon} fn={selectedBtn}/>
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