import { IoIosArrowDown } from "react-icons/io";
import Icon from './Icon'
import tl from '../public/tl.png'

function Profile(){
    return(
        <div className="profiles">
            <Icon type="image" url={tl}/>
            <div className="name-profile">
                <h5>Trabajo Legal Usa</h5>
                <p>Workspace</p>
            </div>
            <button>
                <IoIosArrowDown />
            </button>
        </div>   
    )
}

export default Profile;