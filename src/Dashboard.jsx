import Nav from './components/Nav'
import Header from './components/Header'
import Overview from './components/Overview'
import './styles/dashboard.css'
import './styles/components/nav.css'
import './styles/components/header.css'
import './styles/components/icon.css'
import './styles/components/profile.css'
import './styles/components/profiles.css'
import './styles/components/overview.css'
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import tlu from './public/tl.png';
import gm from './public/gm.png';
import gw from './public/gw.jpg';
import { getTypeUser,getOptionSelectedFromLocalStorage } from './helpers/localstorage';

function Dashboard(){

    /*const profiles = [
        {
            id: 0,
            name: "tlu",
            txt: 'Trabajo Legal USA',
            image: tlu
        },
        {
            id: 1,
            name: "gmi",
            txt: 'GM International',
            image: gm
        },
        {
            id: 2,
            name: "gw",
            txt: 'GW CPA',
            image: gw
        }
    ]*/



    //Options por cada crm 
    const tl = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview_tl'
        },
        {
            id: 1,
            txt: "Board",
            icon: <FaUserFriends />,
            name: 'board_tl'
        },
        {
            id: 2,
            txt: "Candidates",
            icon: <FaUserFriends />,
            name: 'candidates_tl'
        }
    ]
    

    const gmi = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview_gm'
        },
        {
            id: 1,
            txt: "Board",
            icon: <FaUserFriends />,
            name: 'board_gm'
        },
        {
            id: 2,
            txt: "Customers",
            icon: <FaUserFriends />,
            name: 'customers_gm'
        }
    ]


    const gwcpa = [
        {
            id: 0,
            txt: "Overview",
            icon: <FaUserFriends />,
            name: 'overview_gw'
        }
    ]



    return(
        <main className="dashboard">
            <Nav options={  getTypeUser() == 'gm' ? gmi : ( getTypeUser() == 'gw' ? gwcpa : tl)   } /**profiles={profiles}**//>
            <aside>
                <Header/>
                <div className="content-dashboard">
                   <Overview/>               
                </div>
            </aside>
        </main>
    )
}

export default Dashboard;