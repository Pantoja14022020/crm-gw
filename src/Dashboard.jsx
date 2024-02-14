import Nav from './components/Nav'
import Header from './components/Header'
import './styles/dashboard.css'
import './styles/components/nav.css'
import './styles/components/header.css'
import './styles/components/icon.css'
import './styles/components/profile.css'
import './styles/components/option.css'
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";


function Dashboard(){

    const tl = [
        {
            txt: "Dashboard",
            icon: <RxDashboard />
        },
        {
            txt: "Candidates",
            icon: <FaUserFriends />
        }
    ]

    return(
        <main className="dashboard">
            <Nav options={tl}/>
            <aside>
                <Header/>
            </aside>
        </main>
    )
}

export default Dashboard;