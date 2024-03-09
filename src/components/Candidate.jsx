import { useEffect,useState,useRef } from 'react';
import '../styles/components/candidate.css'
import '../styles/components/card.css'
import Load from './Load';
import Search from './Search';
import Table from './Table';
import ActionBar from './ActionBar';
import Form from './Form';
import Modal from './Modal';
import { fetchUrlPut } from '../helpers/fetchs';
import Confirmation from './Confirmation';
import Card from './Card';

function Candidate({setShowSpinner,idElementEdited,setIdElementEdited,sectionSelectedTLUCandidate,rows,setRowsTLU,setSearchTerm,searchTerm,showSpinner,checkedOptions,setCheckedOptions,getPrecandidates, showConfirmAction, setShowConfirmAction,txtTitleConfirmationAction,setTxtTitleConfirmationAction,txtConfirmationAction,setTxtConfirmationAction}){


    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [type,setType] = useState("");
    const [fetchUpdate,setFetchUpdate] = useState(false);//Para determinar si lo que se quiere es editar
    const formRefCandidate = useRef(null)
    const [showSpinnerFormCandidate,setShowSpinnerFormCandidate] = useState(false)

    const columnsProcessSelection = [//Columnas para la tabla de la subseccion selection process  
        {id:0,txt:'Nombre(s) y apellidos'},
        {id:1,txt:'Correo electrónico'},
        {id:2,txt:'Número telefónico'},
        {id:3,txt:'Tipo de Trabajo'},
        {id:4,txt:'Employer'},
        {id:5,txt:'Referred'},
        {id:6,txt:'Contact method'},
        {id:7,txt:'Interviewed'},
        {id:8,txt:'Status'},
        {id:9,txt:''}
    ]




    const fieldsetsFormCandidate = [
        {
            id: 0,
            name: "employer",
            type: "text",
            htmlfor: "employer",
            txt: "Employer"
        },
        {
            id: 1,
            name: "referred",
            type: "text",
            htmlfor: "referred",
            txt: "Referred"
        },
        {
            id: 2,
            name: "methodContact",
            type: "select",
            htmlfor: "methodContact",
            txt: "Select method contact",
            options: ['mail','videocall','call']
        },
        {
            id: 3,
            name: "interviewed",
            type: "select",
            htmlfor: "interviewed",
            txt: "Interviewed",
            options: ['yes','no']
        },
        {
            id: 4,
            name: "status",
            type: "select",
            htmlfor: "status",
            txt: "Select status",
            options: ['No continuo','Pendiente','En revision','Rechazado','En consideración','Contratado']
        }
    ]
    const [status,setStatus] = useState('')
    const [methodContact,setMethodContact] = useState('')
    const [interviewed,setInterviewed] = useState('')
    const [valoresCandidate,setValoresCandidate] = useState({
        employer: '',
        referred: ''
    })
    const handleChangeCandidate = e => {//Funcion para cuando se este escribiendo en un input del formulario 'process'
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresCandidate({
            ...valoresCandidate,
            [name]: value
        });
    }
    const handleSubmitFormCandidate = async e => {//Funcion para cuando se envie el formulario
        e.preventDefault()
        const {employer,referred} = valoresCandidate
        
        if(employer.length == 0 || status.length == 0 || status == '---- Select ----' || methodContact.length == 0 || methodContact == '---- Select ----'|| interviewed.length == 0 || interviewed == '---- Select ----'){
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill fields")
            setType("error")
        }else{
            setShowSpinnerFormCandidate(true)
            const checkBoxs = document.querySelectorAll('.checkbox')
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
            let id_cand = checkedOptions[0]
            setCheckedOptions([])
            setShowFormProcessSelection(false)
            const datosForm = {
                "employer": employer,
                "referred": referred,
                "methodContact": methodContact,
                "interviewed": interviewed,
                "status": status
            }
            const {updated} = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${id_cand}`,datosForm)//Creamos un nuevo registro (precandidato)
            
            setPrecandidateSelected(null)
            await getPrecandidates()

            if(updated){

                setIdElementEdited([...idElementEdited,checkedOptions[0]])

                setModal(true)
                setTitle("Added Succesfully")
                setMessage('Data selection process was added')
                setType("success")
                setShowSpinnerFormCandidate(false)

            }else{
                //Mostramos un modal
                setModal(true)
                setTitle('Error In Server')
                setMessage('Its not posible to add')
                setType('error')
                setShowSpinnerFormCandidate(false)
            }
        }
    }




    const [valoresNewPrecandidate, setValoresNewPrecandidate] = useState({
        fullname: '',
        email: '',
        phone: '',
        dateBirth: '',
        country: '',
        //professionalArea: '',
        position: ''
    });



    //Opcion ready para mandar  objeto a la tercera etapa
    const [sendStageCandidates, setSendStageCandidates] = useState(false);
    const [idPrecandidateSentToCandidate,setIdPrecandidateSentToCandidate] = useState(null)    
    function confirmationStageToEB3Workers(id){//Esta funcion se ejecuta cuando damos click en el icono check de la tabla o registro
        setIdPrecandidateSentToCandidate(id)
        setShowConfirmAction(true)
        setTxtTitleConfirmationAction('Stage Candidates')
        setTxtConfirmationAction('¿Do you want send to Stage Candidates?')
        setSendStageCandidates(true)//Habilitamos que si queremos ver el modal de Stage Candidates
    }




    //Opcion back para regresar objeto a process recruitment
    const [showSpinnerChangeStagePR,setShowSpinnerChangeStagePR] = useState(false)
    function quitModalConfirmation(){
        setShowConfirmAction(false)
        setSendStageCandidates(false)
        setIdPrecandidateSentToCandidate(null)
        const checkBoxs = document.querySelectorAll('.checkbox')
        if(checkBoxs){
            checkBoxs.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.parentElement.parentElement.classList.remove('rowSelected')
            });
        }
        setCheckedOptions([])
    }
    const setFalseShownModalConfirmation = e => {//Funcion para quitar el modal cuando se de click fuera de el
        if(e.target.classList.contains('container-confirmation-modal')){
            setShowConfirmAction(false)
            setSendStageCandidates(false)
            setIdPrecandidateSentToCandidate(null)
            const checkBoxs = document.querySelectorAll('.checkbox')
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
            setCheckedOptions([])
        }
    }
    function confirmationSubsectionPR(){//Funcion para regresar a la subseccion informacion general, es para el boton regrsar
        setShowConfirmAction(true)
        setTxtTitleConfirmationAction('Process recruitment')
        setTxtConfirmationAction('¿Do you want to return these items?')
    }
    async function sendToSubsectionProcessSelection(){//Que hacer cuando se confirma la accion
        try {

            setShowSpinnerChangeStagePR(true)

            const body = {
                "recruitmenProcess": true,
                "selectionProcess": false,
                "employer": "",
                "referred": "",
                "methodContact": "",
                "interviewed": "",
                "status": ""
            }

            //console.log(checkedOptions)
            const promesas = checkedOptions.map(id => fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${id}`,body))
            const resultados = await Promise.all(promesas)
            await getPrecandidates()

            const checkBoxs = document.querySelectorAll('.checkbox')//Quitar o deschequear
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
            setCheckedOptions([])//Vacio el arreglo que contiene los ids de los elementos a pasar
            setShowConfirmAction(false)//Quito el modal de confirmacion

            setModal(true)
            setTitle("Send to subsection process selection")
            setMessage('Your precandidates was send to process selection')
            setType("success")
            setShowSpinnerChangeStagePR(false)
            
        } catch (error) {

            const checkBoxs = document.querySelectorAll('.checkbox')//Quitar o deschequear
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
            setCheckedOptions([])//Vacio el arreglo que contiene los ids de los elementos a pasar
            setShowConfirmAction(false)//Quito el modal de confirmacion

            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible send to selection process')
            setType('error')
            setShowSpinnerChangeStagePR(false)

        }
    }




    //FUNCION QUE SE EJECUTA CUANDO DAMOS CLICK FUERA DEL FORMULARIO CON EL FIN DE DESAPARECERLO
    const setFalseShowFormPrecandidate = e => {
        if(e.target.classList.contains('container-signup-precandidate')){
            setShowFormProcessSelection(false);

            setPrecandidateSelected(null);
            
            setCheckedOptions([])//Setear a que no hay chequeados, para quitar el action bar
            setValoresNewPrecandidate({
                fullname: '',
                country: '',
                email: '',
                dateBirth: '',
                phone: '',
                //professionalArea: '',
                position: ''
            })
            setFetchUpdate(false)


            //Cuando quitemos el modal o formulario, resetear los valores a su valor inicial
            setStatus('')
            setMethodContact('')
            setInterviewed('')
            setValoresCandidate({
                employer: '',
                referred: ''
            })

            const checkBoxs = document.querySelectorAll('.checkbox')
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
        }
    }
    //PARA QUITAR EL CARD DE LA INFORMACION DEL CANDIDATO
    const setFalseShowFormCardInfo = e => {
        if(e.target.classList.contains('container-signup-precandidate')){
            setShowCardInfoCandidate(false)

            setPrecandidateSelected(null);
            
            setCheckedOptions([])//Setear a que no hay chequeados, para quitar el action bar
            setFetchUpdate(false)

            const checkBoxs = document.querySelectorAll('.checkbox')
            if(checkBoxs){
                checkBoxs.forEach(checkbox => {
                    checkbox.checked = false;
                    checkbox.parentElement.parentElement.classList.remove('rowSelected')
                });
            }
        }
    }





    //VARIABLES PARA MOSTRAR EL CUADRO DE INFORMACION DEL CANDIDATO
    const [showCardInfoCandidate,setShowCardInfoCandidate] = useState(false)
    const setTrueShowCardInfoCandidate = () => {
        setShowCardInfoCandidate(true)
    }

    
    


    //VARIABLES PARA MOSTRAR EL FORMULARIO PARA SELECTION PROCESS
    const [showFormProcessSelection, setShowFormProcessSelection]  = useState(false);
    const setTrueShowFormProcessSelection = () => {//ESTE ES PARA EL EVENTO de click en el boton 'editar' del action bar
        setShowFormProcessSelection(true);
        setFetchUpdate(true);
    }




    const [precandidateSelected, setPrecandidateSelected] = useState(null);//Son los datos del objeto a editar
    const [showActions, setShowActions] = useState(false)//Definir estado para mostrar o no mostrar barra de acciones 
    const [optionEdit, setOptionEdit] = useState(false);//Mostrar o ni mostrar en la barra de actions la funcion de editar, solo si hay seleccionado
    useEffect(()=>{//Monitorear cuando se de check en los checks de la tabla de candidate
        checkedOptions.length > 0 ?
            setShowActions(true)
        :  
            setShowActions(false) 

        if(checkedOptions.length == 1){
            setOptionEdit(true)//Hacemos que aparezca el boton de editar en el action bar
            const rowFounded = rows.find(row => row.id == checkedOptions[0]);//Obtenemos la persona
            setPrecandidateSelected(rowFounded)//Establecemos la persona
            setFetchUpdate(false)

            //ESTO PARA EDITAR, OBTENGO LOS DATOS DE CANDIDATE Y LOS ASIGNO A LOS
            //USE STATE
            const valoresCuandoEditaCandidate = {
                employer: rowFounded['employer'],
                referred: rowFounded['referred']
            }
            setValoresCandidate(valoresCuandoEditaCandidate)

        }else{
            setOptionEdit(false)
        }
    },[checkedOptions])





    //ES PARA QUITAR EL MODAL PASADO CIERTO TIEMPO (SEGUNDOS)
    //Una vez aparezca el modal de mensaje, eliminarlo pasado los x segundos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setModal(false)
        },5000)
        return () => clearTimeout(timer)
    },[modal])





    return (
        <>
            <section className="section-candidate">
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


            {
                showFormProcessSelection ? 
                    <>
                        <div className="container-signup-precandidate" onClick={e => setFalseShowFormPrecandidate(e)}>
                            <div className="form-precandidate animate__animated animate__bounceInRight">
                                <h1>{
                                    precandidateSelected !== null && sectionSelectedTLUCandidate == 'sp' ? 
                                        `Fill in fields to ${precandidateSelected.fullname}` 
                                    : ''
                                }</h1>
                                {
                                    precandidateSelected !== null && sectionSelectedTLUCandidate == 'sp' ? //Formulario para la seccion process recruitment, el set paramDefault={true} es para decirle que agregara un valor por default, esto se utiliza cuando vamos a editar. El valueEditTipoTrabajo es el valor por default que va a ser, en este caso para un select
                                        <Form flexDirection="row" widthFieldset="48%" widthForm="100%" action="#" method="#" fieldsets={fieldsetsFormCandidate} txtButtonSubmit="Done" fnChange={handleChangeCandidate} fnSubmit={handleSubmitFormCandidate} reform={formRefCandidate} showSpinner={showSpinnerFormCandidate} status={status} setStatus={setStatus} methodContact={methodContact} setMethodContact={setMethodContact} interviewed={interviewed} setInterviewed={setInterviewed} precandidateSelected={precandidateSelected} setParamDefault={true} valueEditStatus={precandidateSelected.status !='' ? precandidateSelected.status : '---- Select ----'} valueEditMethodContact={precandidateSelected.methodContact != '' ? precandidateSelected.methodContact : '---- Select ----' } valueEditInterviewed={precandidateSelected.interviewed != '' ? precandidateSelected.interviewed : '---- Select ----' }/>
                                    :<></>
                                }
                            </div>
                        </div>
                    </>
                :<></>
            }






            {
                showCardInfoCandidate ? 
                <>
                        <div className="container-signup-precandidate" onClick={e => setFalseShowFormCardInfo(e)}>
                            <div className="form-candidate-card animate__animated animate__bounceInRight">
                                {/*<h1>{
                                    precandidateSelected !== null && sectionSelectedTLUCandidate == 'sp' ? 
                                        `${precandidateSelected.fullname}` 
                                    : ''
                                }</h1>*/}
                                <Card user={precandidateSelected}/>
                            </div>
                        </div>
                    </>
                :<></>
            }





            { //Es el modal que muestra para confirmar si se quiere pasar los precandidatos a la subseccion 'process recruitment'
                showConfirmAction && sectionSelectedTLUCandidate == 'sp' ?
                    <div className="container-confirmation-modal" onClick={e => setFalseShownModalConfirmation(e)}>
                        <Confirmation showSpinner={showSpinnerChangeStagePR} cancel={quitModalConfirmation} ok={sendToSubsectionProcessSelection} txtTitleConfirmationAction={txtTitleConfirmationAction} txtConfirmationAction={txtConfirmationAction}/>
                    </div> 
                : <></>
            }




            {
                sectionSelectedTLUCandidate == 'sb' ? 
                <>
                
                </>
                :(sectionSelectedTLUCandidate == 'sp' ?
                    <>
                        <div className="header-container-candidate">
                        <div className="search-container">
                            {   //Aqui decido que componente search mostrar, si el de la subseccion informacion general o process recruitment
                                <Search txt="Search name candidate in selection process" setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                            }
                        </div>
                        </div>
                        <div className="container-candidates">
                            {
                                showSpinner 
                                ? 
                                    <div className="spinner-table-precandidates"><Load/></div>
                                : 
                                    <>
                                        <Table height="pr" idElementEdited={idElementEdited} columns={columnsProcessSelection} rows={rows.filter(row => row.selectionProcess == true)} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setRowsTLU={setRowsTLU} setPrecandidateSelected={setPrecandidateSelected} setValoresNewPrecandidate={setValoresNewPrecandidate} setFetchUpdate={setFetchUpdate} sectionSelectedTLU={sectionSelectedTLUCandidate}/>
                                    </>
                            }
                        </div>
                    </>        
                :<></>)
            }







            {   //           optionEdit(si)          precandidateSelected(si)                                                                      sectionSelectedTLU(si)  
                showActions 
                ? <ActionBar optionEdit={optionEdit} precandidateSelected={precandidateSelected} showFormProcessSelection={setTrueShowFormProcessSelection} sectionSelectedTLU={sectionSelectedTLUCandidate} confirmationSubsectionPR={confirmationSubsectionPR} setTrueShowCardInfoCandidate={setTrueShowCardInfoCandidate}/>
                : <></> 
            }


            </section>
        </>
    )
}

export default Candidate;