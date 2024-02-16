import { IoIosArrowDown } from "react-icons/io";
import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getTypeUser } from '../helpers/localstorage';

function Profile({fn}){
    return(
        <div className="profile" onClick={fn}>
            <Icon type="image" url={getTypeUser() == 'gm' ? gm : ( getTypeUser() == 'gw' ? gw : tlu)} width="40px" height="40px"/>
            <div className="name-profile">
                <h5>Trabajo Legal Usa</h5>
                <p>Workspace</p>
            </div>
            <button onClick={fn}>
                <IoIosArrowDown />
            </button>
        </div>   
    )
}

export default Profile;