import Icon from './Icon'
import tlu from '../public/tl.png';
import gm from '../public/gm.png';
import gw from '../public/gw.jpg';
import { getTypeUser } from '../helpers/localstorage';

function Header(){

    return(
        <header className='header-aside-dashboard'>
            <div className="icons-header-aside">
                <Icon type="icon" name="notification" spaceHorizontal={true} width="40px" height="40px"/>
                <div className="profile-icon"><Icon width="40px" height="40px" type="image" url={ getTypeUser() == 'gm' ? gm : ( getTypeUser() == 'gw' ? gw : tlu) }/></div>
            </div>
        </header>
    )
}

export default Header;