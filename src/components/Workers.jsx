import { useEffect, useState } from 'react';
import '../styles/components/workers.css'
import '../styles/components/clientdocuments.css'
import Search from './Search';
import Load from './Load';
import Table from './Table';
import ClientDocuments from './ClientDocuments';
import iconNoData from '../public/nothing.svg';
import Modal from './Modal';

function Workers({getPrecandidates,notificationModal,setNotificationModal,idElementEdited,sectionSelectedTLUWorkers,setRowsTLU,rows,setSearchTerm,searchTerm,showSpinner,checkedOptions,setCheckedOptions}){
    
    


    const columnsClientDocuments = [//Columnas para la tabla de la subseccion selection process  
        {id:0,txt:'Nombre(s) y apellidos'},
        {id:1,txt:'Correo electrónico'},
        {id:2,txt:'Número telefónico'},
        {id:3,txt:'Birth certificate'},
        {id:4,txt:'Passport'},
        {id:5,txt:'Proof of address'},
        {id:6,txt:'With family'},
        {id:9,txt:'Send to GM Process'}
    ]
    const columnsGMProcess = [//Columnas para la tabla de la subseccion selection process  
        {id:0,txt:'Nombre(s) y apellidos'},
        {id:1,txt:'Correo electrónico'},
        {id:2,txt:'Número telefónico'},
        {id:3,txt:'Birth certificate'},
        {id:4,txt:'Passport'},
        {id:5,txt:'Proof of address'},
        {id:6,txt:'With family'},
        {id:9,txt:'Send to GM Process'}
    ]

    const [fetchUpdate,setFetchUpdate] = useState(false);//Para determinar si lo que se quiere es editar


    const [precandidateSelected, setPrecandidateSelected] = useState(null);//Son los datos del objeto a editar
    const [documentsFamily,setDocumentsFamily] = useState([])
    /*const [valoresClientDocuments, setValoresClientDocuments] = useState({
        birthCertificate:'',
        passport:'',
        proofAddress:''
    });*/



    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [type,setType] = useState("");
    //ES PARA QUITAR EL MODAL PASADO CIERTO TIEMPO (SEGUNDOS)
    //Una vez aparezca el modal de mensaje, eliminarlo pasado los x segundos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setModal(false)
        },5000)
        return () => clearTimeout(timer)
    },[modal])
    

        //Para quitar el modal de notificacion una vez aparezca
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setNotificationModal(false)
        },10000)
        return () => clearTimeout(timer)
    },[notificationModal])

    return(
        <>
            <section className="section-workers">
                
            {  //El el modal o alert cuando se crear o edita un precandidato
                modal ? 
                    <>
                        <div className="modal-msg-section-precandidates">{/*Es el cuadro padre que almacena el modal */}
                            <Modal title={title} message={message} type={type}/>
                        </div>
                    </>
                :
                    <></>
            }
            {//Es el modal de notificacion cuando hay cambios en el excel
                notificationModal ? 
                <>
                    <div className="modal-notify-section-precandidates">{/*Es el cuadro padre que almacena el modal */}
                        <Modal title="New Changes" message="There's changes in your SpreadSheets, its been added" type="notify" modalType="alert"/>
                    </div>
                </>
                :
                <></>
            }
                
                
                
                {
                    sectionSelectedTLUWorkers == 'cd' ? 
                        <>
                            <div className="header-container-worker">
                                <div className="search-container">
                                    {   //Aqui decido que componente search mostrar, si el de la subseccion informacion general o process recruitment
                                        <Search txt="Search name candidate in Client Documents" setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                                    }
                                </div>
                            </div>
                            <div className="container-workers">
                                {
                                    showSpinner 
                                    ? 
                                        <div className="spinner-table-precandidates"><Load/></div>
                                    : 
                                        <>
                                            {/**<Table height="pr" idElementEdited={idElementEdited} columns={columnsClientDocuments} rows={rows.filter(row => row.selectionProcess == true)} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setRowsTLU={setRowsTLU} setPrecandidateSelected={setPrecandidateSelected} setValoresClientDocuments={setValoresClientDocuments} setFetchUpdate={setFetchUpdate} sectionSelectedTLU={sectionSelectedTLUWorkers}/>*/}
                                            {
                                                rows.filter(row => row.clientDocuments == true).length > 0 ?
                                                    <ClientDocuments type={type} setType={setType} title={title} setTitle={setTitle} message={message} setMessage={setMessage} modal={modal} setModal={setModal} getPrecandidates={getPrecandidates} rows={rows.filter(row => row.clientDocuments == true)} setRowsTLU={setRowsTLU} />
                                                : 
                                                <>
                                                    <div className="not-data-hero">{/*Esta clase esta en precandidate.css */}
                                                        <img width="100px" height="100px" src={iconNoData} alt="icon" />
                                                    </div>
                                                </>
                                            }
                                        </>
                                }
                            </div>
                        </>
                    :(sectionSelectedTLUWorkers == 'gmp' ? 
                        <>
                            <div className="header-container-worker">
                                <div className="search-container">
                                    {   //Aqui decido que componente search mostrar, si el de la subseccion informacion general o process recruitment
                                        <Search txt="Search name candidate in GM Proccess" setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                                    }
                                </div>
                            </div>
                            <div className="container-workers">
                                {
                                    showSpinner 
                                    ? 
                                        <div className="spinner-table-precandidates"><Load/></div>
                                    : 
                                        <>
                                            {/**<Table height="pr" idElementEdited={idElementEdited} columns={columnsClientDocuments} rows={rows.filter(row => row.selectionProcess == true)} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setRowsTLU={setRowsTLU} setPrecandidateSelected={setPrecandidateSelected} setValoresClientDocuments={setValoresClientDocuments} setFetchUpdate={setFetchUpdate} sectionSelectedTLU={sectionSelectedTLUWorkers}/>*/}
                                            {
                                                rows.filter(row => row.gmProcess == true).length > 0 ?
                                                    <ClientDocuments gmp={true} type={type} setType={setType} title={title} setTitle={setTitle} message={message} setMessage={setMessage} modal={modal} setModal={setModal} getPrecandidates={getPrecandidates} rows={rows.filter(row => row.gmProcess == true)} setRowsTLU={setRowsTLU} />
                                                : 
                                                <>
                                                    <div className="not-data-hero">{/*Esta clase esta en precandidate.css */}
                                                        <img width="100px" height="100px" src={iconNoData} alt="icon" />
                                                    </div>
                                                </>
                                            }
                                        </>
                                }
                            </div>
                        </>
                    :<></>)
                }






            </section>
        </>
    )
}

export default Workers;