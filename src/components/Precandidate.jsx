import { getTypeUser } from "../helpers/localstorage";
import { useEffect, useState, useRef } from "react";
import BarStatus from "./BarStatus";
import Button from "./Button";
import Icon from "./Icon";
import Search from "./Search";
import Table from "./Table";
import ActionBar from "./ActionBar";
import Form  from "./Form";
import Load from "./Load";
import SelectDefault from "./SelectDefault";
import Modal from "./Modal";
import { fetchUrlPost, fetchUrlPut } from "../helpers/fetchs";

function Precandidate({options,columns,rows,setColumnsTLU,setRowsTLU,setSearchTerm,searchTerm,showSpinner,setShowSpinner, setParamEnglishLevel, setParamStudiesLevel}){

    const levelEnglishOptions = [...new Set (options.map((option) => option.englishLevel))]//Obtengo los valores para el select nivel de ingles
    const levelStudiesOptions = [...new Set (options.map((option) => option.levelStudies))]//Obtengo los valores para el select nivel de estudios
    levelEnglishOptions.push('English Level');//Agregamos el titulo como opcion para que no pierda
    levelStudiesOptions.push('Studies Level');
    levelEnglishOptions.reverse();//Rvertimos el orden de los elementos para que aparezca al inicio la opcion que agregamos
    levelStudiesOptions.reverse();



    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [type,setType] = useState("");
    const formRefNewPrecandidate = useRef(null); //Creamos la referencia del fomulario, algo como global var



    useEffect(()=>{
        if(rows.length == 0){
            console.log("apga spinner")
            //setShowSpinner(false)
        }else{
            setShowSpinner(false)
        }
        //console.log("cambiando longitud rows....")
    },[rows])

    //console.log(rows.length)///////////////////////////////////////////////
    //console.log(options)
    //rows.length > 0 ? setShowSpinner(false) : setShowSpinner(true);//Cuando ya se tenga registros en la tabla... quitar el spinner
    //console.log("precandidate jsx, cuando es la primera vez que carga", showSpinner)

    const formRef = useRef(null); //Creamos la referencia del fomulario, algo como global var

    const fieldsetsFormSignupPrecandidate = [
        {
            id: 0,
            name: "fullname",
            type: "text",
            htmlfor: "fullname",
            txt: "Fullname"
        },
        {
            id: 1,
            name: "email",
            type: "email",
            htmlfor: "email",
            txt: "Email"
        },
        {
            id: 2,
            name: "phone",
            type: "text",
            htmlfor: "phone",
            txt: "Phone"
        },
        {
            id: 3,
            name: "country",
            type: "text",
            htmlfor: "country",
            txt: "Country"
        },
        {
            id: 4,
            name: "dateBirth",
            type: "text",
            htmlfor: "dateBirth",
            txt: "Date Birth"
        },
        {
            id: 5,
            name: "civilStatus",
            type: "text",
            htmlfor: "civilStatus",
            txt: "Civil Status"
        },
        {
            id: 6,
            name: "gender",
            type: "select",
            htmlfor: "gender",
            txt: "Gender",
            options: ['Masculino', 'Femenino']
        },
        {
            id: 7,
            name: "levelStudies",
            type: "text",
            htmlfor: "levelStudies",
            txt: "Level of Last Studies"
        },
        {
            id: 8,
            name: "position",
            type: "text",
            htmlfor: "position",
            txt: "Position"
        },
        {
            id: 9,
            name: "englishLevel",
            type: "select",
            htmlfor: "englishLevel",
            txt: "English Level",
            options: ['Ninguno','Basico','Intermedio','Avanzado']
        },
    ]



    //AQUI OBTENEMOS Y FORMATEAMOS LAS FILA QUE RECIBIMOS A TRAVES DEL PROPS
    /*const rowsTableTLU = []
    rows.map((row,idx) => {//Recorro arreglo por arreglo [[],[],[]] o fila por fila
        //row [0,1,2,3,4,5,6,7,8,9]
        let precandidate = {fullname:'',email:'',phone:'',country:'',dateBirth:'',civilStatus:'',gender:'',levelStudies:'',position:'',englishLevel:''}
        row.map((pre,idy)=>{
            if(idy <= 9) {
                let attribute = Object.keys(precandidate)[idy]
                precandidate[attribute] = pre
            }
        })
        precandidate['select'] = <IoMdCheckmark size="1rem" />
        precandidate['id'] = idx;
        rowsTableTLU.push(precandidate)
    })*/



    /*const rows = [
        {id:0,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:1,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:2,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:3,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:4,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:5,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:6,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:7,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:8,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:9,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:10,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:11,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:12,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:13,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:14,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:15,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:16,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:17,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:18,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:19,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:20,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:21,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:22,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:23,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:24,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:25,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
        {id:26,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1', select: <IoMdCheckmark size="1rem" />},
    ]*/
    

    const actionsBarPrecandidates = [//Defino las opciones que tendra el nav de actions
        {id:0,icon:<Icon name="delete" size="1rem"/>,nameClass: 'delete-pre',color:'#fff'},
        {id:1,icon:<Icon name="ready" size="1rem"/>,nameClass: 'done-pre'}
    ]

    const [checkedOptions, setCheckedOptions] = useState([])//Un estado par gaurdar el id de los checkbox seleccionados 

    const [showActions, setShowActions] = useState(false)//Definir estado para mostrar o no mostrar barra de acciones 




    const [showFormPrecandidate, setFormPrecandidate]  = useState(false);
    const setTrueShowFormPrecandidate = () => {//ESTE ES PARA EL EVENTO de click en el boton crear nuevo precandidato
        setFormPrecandidate(true);
        setFetchUpdate(false);
    }
    const setTrueShowFormEditPrecandidate = () => {//ESTE ES PARA EL EVENTO de click en el boton 'editar' del action bar
        setFormPrecandidate(true);
        setFetchUpdate(true);
    }
    const setFalseShowFormPrecandidate = e => {
        if(e.target.classList.contains('container-signup-precandidate')){
            setFormPrecandidate(false);
            //setCheckedOptions([]);
            //if(precandidateSelected == null){
                setPrecandidateSelected(null);
                setCheckedOptions([])
                setValoresNewPrecandidate({
                    fullname: '',
                    country: '',
                    email: '',
                    dateBirth: '',
                    levelStudies: '',
                    phone: '',
                    civilStatus: '',
                    position: ''
                })

                const checkBoxs = document.querySelectorAll('.checkbox')
                if(checkBoxs){
                    checkBoxs.forEach(checkbox => {
                        checkbox.checked = false;
                        checkbox.parentElement.parentElement.classList.remove('rowSelected')
                        //console.log()
                        //checkbox.target.parentElement.parentElement.classList.toggle('rowSelected')
                    });
                }
            //}
        }
    }






    //Mostrar o ni mostrar en la barra de actions la funcion de editar, solo si hay seleccionado
    //una opcion
    const [optionEdit, setOptionEdit] = useState(false);
    const [precandidateSelected, setPrecandidateSelected] = useState(null);//Son los datos del objeto a editar
     //CREANDO LOS CAMPOS DEL FORMULARIO CUANDO SE ESTE CREANDO
     const [fieldsetsEditPrecandidate, setFieldsetsEditPrecandidate] = useState([])

    useEffect(()=>{//Cuando se modifique el arreglo de opciones chequeadas, decidir si mostrar o no el action bar
        checkedOptions.length > 0 ?
            setShowActions(true)
        :  
            setShowActions(false) 
        

        if (checkedOptions.length == 1) {  //Evaluar cuando mostrar la opcion de editar, solo cuando haya un 1 check seleccionado
            setOptionEdit(true)//Se muestra la opcion editar ya que solo hay una opcion seleccionada
            //Entonces sacamos los datos de ese precandidato seleccionado
            const rowFounded = rows.find(row => row.id == checkedOptions[0]);
            //console.log(rowFounded)
            
            setPrecandidateSelected(rowFounded)
            //console.log(precandidateSelected)
            setValoresNewPrecandidate(rowFounded)//-----------------------

            setFetchUpdate(false)
            console.log(fetchUpdate)
            const fieldsetsEditPrecandidateForm = [
                {
                    id: 0,
                    name: "fullname",
                    type: "text",
                    htmlfor: "fullname",
                    txt: "Fullname",
                    value: rowFounded['fullname']
                },
                {
                    id: 1,
                    name: "email",
                    type: "email",
                    htmlfor: "email",
                    txt: "Email",
                    value: rowFounded['email']
                },
                {
                    id: 2,
                    name: "phone",
                    type: "text",
                    htmlfor: "phone",
                    txt: "Phone",
                    value: rowFounded['phone']
                },
                {
                    id: 3,
                    name: "country",
                    type: "text",
                    htmlfor: "country",
                    txt: "Country",
                    value: rowFounded['country']
                },
                {
                    id: 4,
                    name: "dateBirth",
                    type: "text",
                    htmlfor: "dateBirth",
                    txt: "Date Birth",
                    value: rowFounded['dateBirth']
                },
                {
                    id: 5,
                    name: "civilStatus",
                    type: "text",
                    htmlfor: "civilStatus",
                    txt: "Civil Status",
                    value: rowFounded['civilStatus']
                },
                {
                    id: 6,
                    name: "gender",
                    type: "select",
                    htmlfor: "gender",
                    txt: "Gender",
                    options: ['Masculino', 'Femenino'],
                    value: rowFounded['gender']
                },
                {
                    id: 7,
                    name: "levelStudies",
                    type: "text",
                    htmlfor: "levelStudies",
                    txt: "Level of Last Studies",
                    value: rowFounded['levelStudies']
                },
                {
                    id: 8,
                    name: "position",
                    type: "text",
                    htmlfor: "position",
                    txt: "Position",
                    value: rowFounded['position']
                },
                {
                    id: 9,
                    name: "englishLevel",
                    type: "select",
                    htmlfor: "englishLevel",
                    txt: "English Level",
                    options: ['Ninguno','Basico','Intermedio','Avanzado'],
                    value: rowFounded['englishLevel']
                },
            ]
            setFieldsetsEditPrecandidate(fieldsetsEditPrecandidateForm)

            //console.log(fieldsetsEditPrecandidate)

        }else{
            //setPrecandidateSelected(null);
            setOptionEdit(false)
        }
        //console.log(checkedOptions) ARRAY 1
    },[checkedOptions])








    //-----------------------------FORMULARIO------------------------------
    //INICIO. APARTADO PARA VALIDAR QUE EL FORMULARIO ENVIA TODOS LOS DATOS REQUERIDOS
    const [valoresNewPrecandidate, setValoresNewPrecandidate] = useState({
        fullname: '',
        country: '',
        email: '',
        dateBirth: '',
        levelStudies: '',
        phone: '',
        civilStatus: '',
        position: ''
    });
    const [gender,setGender] = useState('');
    const  [levelEnglish, setLevelEnglish] =  useState('');
    const [showSpinnerFormPre, setShowSpinnerFormPre] = useState(false);//Es el spinner que muestra en el boton del formulario una vez que se registra un precandidato
    const handleChangeNewPrecandidate = e => {//Funcion para cuando se este escribiendo en un input del formulario 'new precandidate'
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresNewPrecandidate({
            ...valoresNewPrecandidate,
            [name]: value
        });
    }
    const [fetchUpdate,setFetchUpdate] = useState(false);
    const handleSubmitNewPrecandidate = async e => {//Funcion para cuando se envia el formulario
        e.preventDefault();
        const {fullname,country,email,dateBirth,levelStudies,phone,civilStatus,position} = valoresNewPrecandidate;
        const datosForm = {
            "fullname":fullname,
            "email":email,
            "phone":phone,
            "country":country,
            "dateBirth":dateBirth,
            "civilStatus":civilStatus,
            "gender":gender,
            "levelStudies":levelStudies,
            "position":position,
            "englishLevel":levelEnglish
        }
        if(fullname.length == 0 || country.length == 0 || email.length == 0 || dateBirth.length == 0 || levelEnglish.length == 0 || phone.length == 0 || gender.length == 0 || levelStudies.length == 0 || civilStatus.length == 0 || position.length == 0){//Si ambos inputs no estan completos
            //AQUI ENTRA PORQUE NO SE LLENAORON TODOS LOS CAMPOS
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill all fields")
            setType("error")
        }else{
            //AQUI SE LLENARON TODOS LOS CAMPOS POR LO QUE SE PUEDE CREAR PRECANDIDATO EL FORMULARIO
            
            setShowSpinnerFormPre(true);

            //console.log("fetch update",fetchUpdate)

            //console.log(datosForm) //DEBO DEFINIR AHORA UNA FUNCION PARA HACER FECTH PARA ACTUALIZAR, L PARECER YA PUDE TRAER LOS DATOS


            //Do fetch to update ESTE ESTA RELACIONADON CON EL EFFECT
            
            if(fetchUpdate){
                const {updated,msg} = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${checkedOptions[0]+2}`,datosForm)//Creamos un nuevo registro (precandidato)
                //console.log()
                if(updated){
                    //Hide formulario
                    setFormPrecandidate(false);

                    //Show modal
                    setModal(true)
                    setTitle("Updated Successfully")
                    setMessage(msg)
                    setType("success")
                    setShowSpinnerFormPre(false)
                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage(msg)
                    setType('error')
                    setShowSpinnerFormPre(false)
                }
            }else{
                const {added,msg} = await fetchUrlPost("https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/",datosForm)//Creamos un nuevo registro (precandidato)
        
                if(added){

                    //Hide formulario
                    setFormPrecandidate(false);

                    //Show modal
                    setModal(true)
                    setTitle("Added Successfully")
                    setMessage(msg)
                    setType("success")
                    setShowSpinnerFormPre(false)
                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage(msg)
                    setType('error')
                    setShowSpinnerFormPre(false)
                }
            }

            //Reset inputs in form
            e.target.reset()
        }
    }
    //FIN. APARTADO PARA VALIDAR QUE EL FORMULARIO ENVIA TODOS LOS DATOS REQUERIDOS








    //ES PARA QUITAR EL MODAL PASADO CIERTO TIEMPO (SEGUNDOS)
    //Una vez aparezca el moda, eliminarlo pasado los x segundos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setModal(false)
        },5000)
        return () => clearTimeout(timer)
    },[modal])








    return (
        <section className="section-precandidates">
            {
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
                showFormPrecandidate ? //Es para mostrar el formulario para crear precandidato
                <>
                    <div className="container-signup-precandidate" onClick={e => setFalseShowFormPrecandidate(e)}>
                        <div className="form-precandidate animate__animated animate__bounceInRight">
                            <h1>{precandidateSelected !== null ? 'Edit this candidate' : 'Create new precandidate'}</h1>
                            {
                                precandidateSelected === null ?    
                                    <Form flexDirection="row" widthFieldset="30%" widthForm="100%" action="#" method="#" fieldsets={fieldsetsFormSignupPrecandidate} txtButtonSubmit="Create" fnChange={handleChangeNewPrecandidate} fnSubmit={handleSubmitNewPrecandidate} reform={formRefNewPrecandidate} setGender={setGender} setLevelEnglish={setLevelEnglish} showSpinner={showSpinnerFormPre} setParamDefault={false}/>
                                :
                                    <Form flexDirection="row" widthFieldset="30%" widthForm="100%" action="#" method="#" fieldsets={fieldsetsEditPrecandidate} txtButtonSubmit="Update" fnChange={handleChangeNewPrecandidate} fnSubmit={handleSubmitNewPrecandidate} reform={formRefNewPrecandidate} setGender={setGender} setLevelEnglish={setLevelEnglish} showSpinner={showSpinnerFormPre} precandidateSelected={precandidateSelected} setParamDefault={true}/>
                            }
                        </div>
                    </div>
                </>
                : 
                <></>
            }
            <div className="btn-new-candidate">
                <div className="search-container animate__animated animate__bounceInDown">
                    <Search setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                </div>
                <div className="btn-n-c">
                    {
                        checkedOptions.length <= 0 ? <Button fn={setTrueShowFormPrecandidate} txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6"/> : <></>
                    }
                </div>
            </div>
            <div className="container-candidates">
                    <div className="params-filter-precandidate">
                        <SelectDefault width="110px" color="#f1f1f1" title="English Level" options={levelEnglishOptions} setParam={setParamEnglishLevel} />
                        <SelectDefault width="250px" color="#f1f1f1" title="Studies Level" options={levelStudiesOptions} setParam={setParamStudiesLevel} />
                    </div>
                {
                    showSpinner 
                    ? 
                        <div className="spinner-table-precandidates"><Load/></div>
                    : 
                        <>
                            <Table columns={columns} rows={rows} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setColumnsTLU={setColumnsTLU} setRowsTLU={setRowsTLU}/>
                        </>
                }
            </div>
            
            {
                showActions 
                ? <ActionBar actions={actionsBarPrecandidates} optionEdit={optionEdit} precandidateSelected={precandidateSelected} fn={setTrueShowFormEditPrecandidate}/>
                : <></> 

            }
        </section>
    )
}

export default Precandidate;