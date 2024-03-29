import io from 'socket.io-client';//Prueba 1
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
import './styles/components/select.css'
import './styles/components/confirmation.css'
import './styles/components/radio.css'
import { RxDashboard } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import tlu from './public/tl.png';
import gm from './public/gm.png';
import gw from './public/gw.jpg';
import { getTypeUser,getOptionSelectedFromLocalStorage,getUserLogged} from './helpers/localstorage';
import { useEffect, useState } from 'react'
import {fetchUrlGet} from './helpers/fetchs'
import Board from './components/Board'
import Precandidate from './components/Precandidate'
import Candidate from './components/Candidate';
import Workers from './components/Workers';

const socket = io("https://api-gw-cpa-pc-20aq.onrender.com/");//PRUEBA 2  llega a prueba 3. Me conecto o inicializo
//const socket = io('http://localhost:8080')//PRUEBA 2    llega a prueba 3

function Dashboard(){


    //Obtener los datos de la sesion que se logeo en el sistema
    const {id_user,email,msg,area,fullname} = getUserLogged();


    const [interfaceShowed,setInterfaceShowed] = useState(localStorage.getItem('optionSelected'));
    
    useEffect(()=>{
        if(checkedOptions.length > 0){
            setCheckedOptions([])
        }
    },[interfaceShowed])

    const [showSpinner, setShowSpinner] = useState(true);



    //DEFINIR LAS FILAS Y COLUMNAS DE LA TABLA TLU 
    const [filteredCandidates, setFilteredCandidates] = useState([]);//Defino los elementos filtrados o filas filtradas en un inicio tendra todod
    //const [columnsTLU, setColumnsTLU] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);//Vraiable auxiliar
    //const [rowsTLU, setRowsTLU] = useState([]);
    async function getPrecandidates(){
        //Aqui decido que url voy a consumir los datos de excelm si el de local o el que esta desplegado
        const {precandidatos} = await fetchUrlGet('https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/');   
        //const {candidates} = await fetchUrlGet('http://localhost:8080/tl/excel/candidate/')
        //console.log(candidates)
        //Definir columnas
        //const columns= candidates[0] //[Tomas todas las columnas]
        //console.log(columns);
        /*const formattedColumns = columns.map((column, idx) => {
            if (idx <= 11 && idx !== 0 && idx !== 9) {
                return { id: idx, txt: column }; // Devolvemos un objeto con id y txt
            }
            return null; // Si no cumple la condición, devolvemos null
        }).filter(col => col !== null); // Filtramos los elementos nulos
        setColumnsTLU(formattedColumns) */ //Solo almacenamos las primeras 8 columnas  
        //console.log(columnsTLU)
        
        //Definir filas
        //const rows = candidates.slice(1)//Saca el primer arreglo ya son las columnas
        //console.log(rows);
        setFilteredCandidates(prevRows => {
            return precandidatos.map((row, idx) => { // Recorro arreglo por arreglo [[],[],[]] o fila por fila
                //let precandidate = {fullname:'', email:'', phone:'', country:'', dateBirth:'', civilStatus:'', gender:'', levelStudies:'', position:'', englishLevel:''};
                /*const {
                    id, 
                    fullname,
                    email,
                    phone,
                    dateBirth,
                    civilStatus, 
                    gender, 
                    country, 
                    levelStudies,
                    englishLevel, 
                    position
                } = row;
                precandidate*/
                row['select'] = <IoMdCheckmark size="1rem" />;
                return row;
            });
        });
        //console.log("filteres",filteredCandidates);


        //Crear un respaldo d elas filas como variable auxiliar y se pueda restablecer todos cuando en el buscador es vacio
        setAllCandidates(prevRows => {
            return precandidatos.map((row, idx) => { // Recorro arreglo por arreglo [[],[],[]] o fila por fila
                //let precandidate = {fullname:'', email:'', phone:'', country:'', dateBirth:'', civilStatus:'', gender:'', levelStudies:'', position:'', englishLevel:''};
                /*const {
                    id, 
                    fullname,
                    email,
                    phone,
                    dateBirth,
                    civilStatus, 
                    gender, 
                    country, 
                    levelStudies,
                    englishLevel, 
                    position
                } = row;
                precandidate['select'] = <IoMdCheckmark size="1rem" />;
                return precandidate;*/
                row['select'] = <IoMdCheckmark size="1rem" />;
                return row;
            });
        });
        //.log("all candidates",allCandidates);
    }



    
    const [notificationsStored, setNotificationsStored] = useState([]);
    async function getNotifications(){
        const {notificaciones} = await fetchUrlGet('https://api-gw-cpa-pc-20aq.onrender.com/tl/notifications');   
        setNotificationsStored(prevRows => {
            return notificaciones.map(row => { 
                row['status'] = false 
                row['icon'] = "sheets"
                return row;
            });
        });
    }


    useEffect(()=>{//Aqui hago peticion para obtener los candidatos del excel para TL GM o GW
        async function loadPrecandidates(){
            if(getTypeUser() == 'tl'){
                await getPrecandidates();
                setShowSpinner(false);
            }
        }
        async function loadNotifications(){
            if(getTypeUser() == 'tl'){
                await getNotifications();
            }
        }
        loadPrecandidates()
        loadNotifications()
    },[])

    



    //Estados para mostrar el modal de notificaciones
    const [notificationModal, setNotificationModal] = useState(false);
    const [numNotifications, setNumNotifications] = useState(0);
    const [showBtnRefresh, setBtnRefresh] = useState(false)
    const [idElementEdited, setIdElementEdited] = useState([])
    useEffect(()=>{//Monitorear cuando cambie el valor del id del elemento editado
        if(idElementEdited.length > 0){//Si el id no es nulo, (quiere decir que si hay un id de un elemento editado)
            setTimeout(()=>{
                setIdElementEdited([])
            },6000)
        }
    },[idElementEdited])
    socket.on('notify', (mensaje) => {
        const {fechaAccion,msg,ids} = mensaje;//Obtengo las propiedades que manda el servidor
        const itemNotification = {status:true,fechaAccion,txt:msg,icon:"sheets"}//Creo un objeto con esas propiedades
        setNotificationsStored([...notificationsStored, itemNotification])//Lo almaceno en mi arreglo
        setNotificationModal(true)
        setNumNotifications(1)//Es el numerito que esta en la campanita
        //setBtnRefresh(true)
        ids.forEach(id => setIdElementEdited([...idElementEdited,id]))
        getPrecandidates();//Actualizamos la tabla
       // console.log('Mensaje recibido solo para este cliente:', mensaje);
    });




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
        },
        {
            id: 2,
            txt: "Candidates",
            icon: <CgProfile />,
            name: 'candidate'
        },
        {
            id: 3,
            txt: "EB3Workers",
            icon: <IoDocumentTextOutline />,
            name: "eb3workers"
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
    //INICIO----AQUI DEFINO TODOS LOS CAMBIOS DE LOS PARAMETROS PARA FILTRAR
    const [searchTerm, setSearchTerm] = useState('');
    const [paramEnglishLevel, setParamEnglishLevel] = useState('')
    const [paramStudiesLevel, setParamStudiesLevel] = useState('');

    useEffect(()=>{
        //console.log("cambios")
        if(searchTerm === '' && paramEnglishLevel === '' && paramStudiesLevel === ''){
            setFilteredCandidates(allCandidates)
        }else{
            if(paramEnglishLevel === 'English Level'){ //Es el option que inserte en Precandidate.jsx linea 17
                setParamEnglishLevel('');
            }
            if(paramStudiesLevel === 'Studies Level'){
                setParamStudiesLevel('');
            }

            const filterData = {
                searchTerm,paramEnglishLevel,paramStudiesLevel
            }
            //console.log(filterData)

            setFilteredCandidates(
                allCandidates.filter(candidate => {
                    //!filterData.searchTerm || candidate.fullname === filterData.searchTerm
                    return (candidate.fullname.toLowerCase().includes(filterData.searchTerm.toLocaleLowerCase())) &&
                           (!filterData.paramEnglishLevel || candidate.englishLevel === filterData.paramEnglishLevel) &&
                           (!filterData.paramStudiesLevel || candidate.levelStudies === filterData.paramStudiesLevel);
                })
            )

            //console.log(filteredCandidates.length == 0)
            //console.log(allCandidates)
            /*setFilteredCandidates(
                allCandidates.filter(candidate => 
                    {
                        return candidate.fullname.toLowerCase().includes(searchTerm.toLowerCase())
                    }
                ).filter(candidate => 
                    {
                        return candidate.englishLevel.toLowerCase() === paramEnglishLevel.toLocaleLowerCase()
                    }
                ).filter(candidate => 
                    {
                        return candidate.levelStudies.toLowerCase() === paramStudiesLevel.toLocaleLowerCase()
                    }
                )
            )*/
        }
    },[searchTerm,paramEnglishLevel,paramStudiesLevel])
    //FIN-----AQUI DEFINO TODOS LOS CAMBIOS DE LOS PARAMETROS PARA FILTRAR



    
    const [showNavbar, setShowNavbar] = useState(true);//Variable para definir si se muestra el navbar




    //Este es para seccion precandidato para CRM Trabajo Legal USA
    //Define que tabla mostrar, si informacion general(precandidatos) o process recruitment(precandiatos)
    const [sectionSelectedTLU, setSectionSelectedTLU] =  useState( localStorage.getItem('sectionSelectedTLU') || 'gi');
    const [sectionSelectedTLUCandidate, setSectionSelectedTLUCandidate] =  useState( localStorage.getItem('sectionSelectedTLUCandidate') || 'sb');
    const [sectionSelectedTLUWorkers, setSectionSelectedTLUWorkers] = useState(localStorage.getItem('sectionSelectedTLUWorkers') || 'cd')

    //Para guardar en el local storage la seccion seleccionada de la etapa precandidate
    useEffect(()=>{
        localStorage.setItem('sectionSelectedTLU',sectionSelectedTLU)
        //Estos set para son para cuando se cambie de seccion en el bar satatus, se resetee los select de filtros
        setParamEnglishLevel('')
        setParamStudiesLevel('')
        setSearchTerm('')
        setCheckedOptions([])
    },[sectionSelectedTLU])


    //Para guardar en el local storage la seccion seleccionada de la etapa candidate
    useEffect(()=>{
        localStorage.setItem('sectionSelectedTLUCandidate',sectionSelectedTLUCandidate)
        setSearchTerm('')
        setCheckedOptions([])
    },[sectionSelectedTLUCandidate])


    //Para gaurdar en el localstorage la seccion seleccionada de la etapa eb3workers
    useEffect(()=>{
        localStorage.setItem('sectionSelectedTLUWorkers',sectionSelectedTLUWorkers)
        setSearchTerm('')
        setCheckedOptions([])
    },[sectionSelectedTLUWorkers])


    const [checkedOptions, setCheckedOptions] = useState([])//Un estado par gaurdar el id de los checkbox seleccionados 




    //Estos los utilizo en el archivo Precandidate .jsx
    const [showConfirmAction, setShowConfirmAction] = useState(false)//Para mostrar o ocultar el modal de confirmar para hacer alguna accion
    const [txtTitleConfirmationAction, setTxtTitleConfirmationAction] = useState('')//Establecer el titulo del modal de confirmacion de alguna accion
    const [txtConfirmationAction, setTxtConfirmationAction] = useState('')//Ademas del titulo tambien es la descripcion de lo que se desea hacer


    


    //style={{backgroundColor: `${interfaceShowed !== 'overview' ? '#fff' : '' }`}} 
    return(
        <main className="dashboard">
            {
                getTypeUser() == 'tl' ? 
                <>
                    <Nav options={  getTypeUser() == 'gm' ? gmi : ( getTypeUser() == 'gw' ? gwcpa : tl)   } /**profiles={profiles}**/ setInterfaceShowed={setInterfaceShowed} showNavbar={showNavbar} setShowNavbar={setShowNavbar}/>
                    <aside className={`${showNavbar ? 'part-width' : 'all-width'}`} style={{backgroundColor: `${interfaceShowed == 'eb3workers' ? '#fff' : ''}`}}>
                        <Header interfaceShowed={interfaceShowed} fullname={fullname} notificationsStored={notificationsStored} numNotifications={numNotifications} setNumNotifications={setNumNotifications} setNotificationsStored={setNotificationsStored} sectionSelectedTLU={sectionSelectedTLU} setSectionSelectedTLU={setSectionSelectedTLU} checkedOptions={checkedOptions} sectionSelectedTLUCandidate={sectionSelectedTLUCandidate} setSectionSelectedTLUCandidate={setSectionSelectedTLUCandidate} sectionSelectedTLUWorkers={sectionSelectedTLUWorkers} setSectionSelectedTLUWorkers={setSectionSelectedTLUWorkers} setCheckedOptions={setCheckedOptions} setParamEnglishLevel={setParamEnglishLevel} setParamStudiesLevel={setParamStudiesLevel}/>
                        <div className="content-dashboard">
                            {   /*Aqui decidimo que tipo de Overview vamos a mostrar, dependiendo el tipo de usuario que inicio sesion */
                                
                                interfaceShowed == 'overview' ? //Si la opcion seleccionada es el overview, entonces
                                    (getTypeUser() == 'tl' ? <Overview  info="tl" notificationModal={notificationModal} setNotificationModal={setNotificationModal} totalAllPeople={filteredCandidates.length} jobTrade={filteredCandidates.filter( row => row.status == 'Contratado' && row.tipoTrabajo == 'Oficio').length} jobProfessional={filteredCandidates.filter( row => row.status == 'Contratado' && row.tipoTrabajo == 'Profesión').length} /> : ( getTypeUser() == "gm" ? <Overview info="gm"/> : <Overview info="gw"/>))//Evaluamos que overvies mostramos, depende del tipo de usuario que ha iniciado sesion
                                :(interfaceShowed == 'board' ? 
                                    <Board/>
                                :(interfaceShowed == "precandidate" && getTypeUser() == 'tl' ? <Precandidate options={allCandidates} rows={filteredCandidates} setRowsTLU={setFilteredCandidates} setSearchTerm={setSearchTerm} searchTerm={searchTerm} showSpinner={showSpinner} setShowSpinner={setShowSpinner} setParamEnglishLevel={setParamEnglishLevel} setParamStudiesLevel={setParamStudiesLevel} getPrecandidates={getPrecandidates} notificationModal={notificationModal} setNotificationModal={setNotificationModal} showBtnRefresh={showBtnRefresh} setShowBtnRefresh={setBtnRefresh} idElementEdited={idElementEdited} setIdElementEdited={setIdElementEdited} sectionSelectedTLU={sectionSelectedTLU} showConfirmAction={showConfirmAction} setShowConfirmAction={setShowConfirmAction} txtTitleConfirmationAction={txtTitleConfirmationAction} setTxtTitleConfirmationAction={setTxtTitleConfirmationAction} txtConfirmationAction={txtConfirmationAction} setTxtConfirmationAction={setTxtConfirmationAction} checkedOptions={checkedOptions} setCheckedOptions={setCheckedOptions}/>
                                :(interfaceShowed == "candidate" && getTypeUser() == 'tl' ? <Candidate sectionSelectedTLUCandidate={sectionSelectedTLUCandidate} rows={filteredCandidates} contratado={filteredCandidates.filter(row => row.status == 'Contratado')} consideracion={filteredCandidates.filter(row => row.status == 'En consideración')} rechazado={filteredCandidates.filter(row => row.status == 'Rechazado')} revision={filteredCandidates.filter(row => row.status == 'En revision')} pendientes={filteredCandidates.filter(row => row.status == 'Pendiente')} setRowsTLU={setFilteredCandidates} setSearchTerm={setSearchTerm} searchTerm={searchTerm} showSpinner={showSpinner} setShowSpinner={setShowSpinner} idElementEdited={idElementEdited} setIdElementEdited={setIdElementEdited} checkedOptions={checkedOptions} setCheckedOptions={setCheckedOptions} getPrecandidates={getPrecandidates} notificationModal={notificationModal} setNotificationModal={setNotificationModal} showConfirmAction={showConfirmAction} setShowConfirmAction={setShowConfirmAction} txtTitleConfirmationAction={txtTitleConfirmationAction} setTxtTitleConfirmationAction={setTxtTitleConfirmationAction} txtConfirmationAction={txtConfirmationAction} setTxtConfirmationAction={setTxtConfirmationAction}/> 
                                :(interfaceShowed == "eb3workers" && getTypeUser() == 'tl' ? <Workers sectionSelectedTLUWorkers={sectionSelectedTLUWorkers} setRowsTLU={setFilteredCandidates} rows={filteredCandidates} setSearchTerm={setSearchTerm} searchTerm={searchTerm} showSpinner={showSpinner} idElementEdited={idElementEdited} checkedOptions={checkedOptions} setCheckedOptions={setCheckedOptions} getPrecandidates={getPrecandidates} notificationModal={notificationModal} setNotificationModal={setNotificationModal}/>
                                :<></>)))) 
                            }              
                        </div>
                    </aside>
                </>
                : <></>
            }
        </main>
    )
}

export default Dashboard;