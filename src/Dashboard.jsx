import Nav from './components/Nav'
import Header from './components/Header'
import './styles/dashboard.css'
import './styles/components/nav.css'
import './styles/components/header.css'
import './styles/components/icon.css'

function Dashboard(){
    return(
        <main className="dashboard">
            <Nav/>
            <aside>
                <Header/>
            </aside>
        </main>
    )
}

export default Dashboard;