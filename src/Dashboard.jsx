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
import './styles/components/section.css'
import './styles/components/option.css'
import './styles/components/board.css'
import './styles/components/precandidate.css'
import './styles/components/barstatus.css'
import './styles/components/search.css'
import './styles/components/table.css'
import './styles/components/actionbar.css'
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import tlu from './public/tl.png';
import gm from './public/gm.png';
import gw from './public/gw.jpg';
import { getTypeUser,getOptionSelectedFromLocalStorage,getUserLogged} from './helpers/localstorage';
import { useEffect, useState } from 'react'
import {fetchUrlGet} from './helpers/fetchs'
import Board from './components/Board'
import Precandidate from './components/Precandidate'

function Dashboard(){


    //Obtener los datos de la sesion que se logeo en el sistema
    const {id_user,email,msg,area,fullname} = getUserLogged();


    const [interfaceShowed,setInterfaceShowed] = useState(localStorage.getItem('optionSelected'));
    






    //DEFINIR LAS FILAS Y COLUMNAS DE LA TABLA TLU 
    const [filteredCandidates, setFilteredCandidates] = useState([]);//Defino los elementos filtrados o filas filtradas en un inicio tendra todod
    const [columnsTLU, setColumnsTLU] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);//Vraiable auxiliar
    //const [rowsTLU, setRowsTLU] = useState([]);
    async function getPrecandidates(){
        const {candidates} = await fetchUrlGet('https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/');   
        
        //Definir columnas
        const columns= candidates[0]
        const formattedColumns = columns.map((column, idx) => {
            if (idx <= 9) {
                return { id: idx, txt: column }; // Devolvemos un objeto con id y txt
            }
            return null; // Si no cumple la condición, devolvemos null
        }).filter(col => col !== null); // Filtramos los elementos nulos
        setColumnsTLU(formattedColumns)  //Solo almacenamos las primeras 8 columnas  
        
        
        //Definir filas
        const rows = candidates.slice(1)//Saca el primer arreglo ya son las columnas
        setFilteredCandidates(prevRows => {
            return rows.map((row, idx) => { // Recorro arreglo por arreglo [[],[],[]] o fila por fila
                let precandidate = {fullname:'', email:'', phone:'', country:'', dateBirth:'', civilStatus:'', gender:'', levelStudies:'', position:'', englishLevel:''};
        
                row.forEach((pre, idy) => {
                    if (idy <= 9) {
                        let attribute = Object.keys(precandidate)[idy];
                        precandidate[attribute] = pre;
                    }
                });
        
                precandidate['select'] = <IoMdCheckmark size="1rem" />;
                precandidate['id'] = idx;
        
                return precandidate;
            });
        });


        //Crear un respaldo d elas filas como variable auxiliar y se pueda restablecer todos cuando en el buscador es vacio
        setAllCandidates(prevRows => {
            return rows.map((row, idx) => { // Recorro arreglo por arreglo [[],[],[]] o fila por fila
                let precandidate = {fullname:'', email:'', phone:'', country:'', dateBirth:'', civilStatus:'', gender:'', levelStudies:'', position:'', englishLevel:''};
        
                row.forEach((pre, idy) => {
                    if (idy <= 9) {
                        let attribute = Object.keys(precandidate)[idy];
                        precandidate[attribute] = pre;
                    }
                });
        
                precandidate['select'] = <IoMdCheckmark size="1rem" />;
                precandidate['id'] = idx;
        
                return precandidate;
            });
        });
    }
    useEffect(()=>{//Aqui hago peticion para obtener los candidatos del excel para TL GM o GW
        if(getTypeUser() == 'tl'){
            getPrecandidates();
        }
    },[])







    //Options por cada crm 
    const tl = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview'
        },
        {
            id: 1,
            txt: "Precandidates",
            icon: <FaUserFriends />,
            name: 'precandidate'
        }
    ]
    

    const gmi = [
        {
            id: 0,
            txt: "Overview",
            icon: <RxDashboard />,
            name: 'overview'
        },
        {
            id: 1,
            txt: "Board",
            icon: <FaUserFriends />,
            name: 'board'
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
            name: 'overview'
        }
    ]


    //UseStates para el buscador o search de la seccion precandidates
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(()=>{
        if(searchTerm === ''){
            setFilteredCandidates(allCandidates)
        }else{
            setFilteredCandidates(allCandidates.filter(candidate => {
                return candidate.fullname.toLowerCase().includes(searchTerm.toLowerCase())
            }))
        }
    },[searchTerm])


    return(
        <main className="dashboard">
            <Nav options={  getTypeUser() == 'gm' ? gmi : ( getTypeUser() == 'gw' ? gwcpa : tl)   } /**profiles={profiles}**/ setInterfaceShowed={setInterfaceShowed}/>
            <aside style={{backgroundColor: `${interfaceShowed !== 'overview' ? '#fff' : '' }`}}>
                <Header interfaceShowed={interfaceShowed} fullname={fullname}/>
                <div className="content-dashboard">
                    {   /*Aqui decidimo que tipo de Overview vamos a mostrar, dependiendo el tipo de usuario que inicio sesion */
                        
                        interfaceShowed == 'overview' ? //Si la opcion seleccionada es el overview, entonces
                            (getTypeUser() == 'tl' ? <Overview info="tl"/> : ( getTypeUser() == "gm" ? <Overview info="gm"/> : <Overview info="gw"/>))//Evaluamos que overvies mostramos, depende del tipo de usuario que ha iniciado sesion
                        :(interfaceShowed == 'board' ? 
                            <Board/>
                        :(interfaceShowed == "precandidate" ? <Precandidate rows={filteredCandidates} columns={columnsTLU} setColumnsTLU={setColumnsTLU} setRowsTLU={setFilteredCandidates} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                        : <></>)) 
                    }              
                </div>
            </aside>
        </main>
    )
}

export default Dashboard;