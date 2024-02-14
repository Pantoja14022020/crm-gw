import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom'
import {useState} from 'react'
import Login from './Login'
import Dashboard from './Dashboard';
import {getSession} from './helpers/localstorage'

function App(){


    return (
        
        <Router>
            <Routes>
                <Route path='/' element={ getSession() ? <Dashboard/> : <Login/>} />
                {/**<Route path='/dashboard' element={ getSession() ? <Dashboard/> : <Navigate to="/" /> }/>**/}
            </Routes>
        </Router> 
    )
}

export default App;