import { getTypeUser } from "../helpers/localstorage";
import { useEffect, useState, useRef } from "react";
import { LiaFilterSolid } from "react-icons/lia";
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
import { fetchUrlPost, fetchUrlPut} from "../helpers/fetchs";
import {getDateTemporary} from "../helpers/fechas"
import Confirmation from "./Confirmation";

function Precandidate({options,rows,setRowsTLU,setSearchTerm,searchTerm,showSpinner,setShowSpinner, setParamEnglishLevel, setParamStudiesLevel, getPrecandidates, notificationModal, setNotificationModal, showBtnRefresh, setShowBtnRefresh, idElementEdited, setIdElementEdited, sectionSelectedTLU, showConfirmAction, setShowConfirmAction,txtTitleConfirmationAction,setTxtTitleConfirmationAction,txtConfirmationAction,setTxtConfirmationAction, checkedOptions, setCheckedOptions}){

    const columnsGeneralInformation = [ //Columnas para la tabla informacion general
        {id:0,txt:'Nombre(s) y apellidos'},
        {id:1,txt:'Correo electrónico'},
        {id:2,txt:'Número telefónico'},
        {id:3,txt:'Fecha de nacimiento'},
        {id:4,txt:'Estado de civil'},
        {id:5,txt:'Género'},
        {id:6,txt:'Lugar de residencia: Ciudad, Estado y País'},
        {id:7,txt:'Grado de últimos estudios (Comprobable con certificado, titulo y/o cedula profesional)'},
        {id:8,txt:'Nivel de Inglés'},
        {id:9,txt:'Coloca el tipo de vacante a la que estas aplicando o deseas aplicar en un futuro'}
    ]


    const columnsProcessRecruitment = [//Columnas para la tabla 
        {id:0,txt:'Nombre(s) y apellidos'},
        {id:1,txt:'Correo electrónico'},
        {id:2,txt:'Número telefónico'},
        {id:3,txt:'Tipo de Trabajo'},
        {id:4,txt:'Personality Test'},
        {id:5,txt:'Test Gorilla'},
        {id:6,txt:'Contrato de reclutamiento'},
        {id:7,txt:'Application/CV'}
    ]

    //ESTO ES PARA LOS FILTROS O PARAMETROS DE BUSQUEDA, AQUI SE DEFINEN SUS OPCIONES
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
        if(rows.length != 0){
            setShowSpinner(false)
            //setShowSpinner(false)
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
            name: "dateBirth",
            type: "text",
            htmlfor: "dateBirth",
            txt: "Date Birth"
        },
        {
            id: 4,
            name: "civilStatus",
            type: "select",
            htmlfor: "civilStatus",
            txt: "Select your civil status",
            options: ['Casado (a)','Soltero (o)','Divorciado (a)','Unión Libre','Viudo (a)']
        },
        {
            id: 5,
            name: "gender",
            type: "select",
            htmlfor: "gender",
            txt: "Select gender",
            options: ['Masculino', 'Femenino','Otro']
        },
        {
            id: 6,
            name: "country",
            type: "text",
            htmlfor: "country",
            txt: "Country (Ciudad, Estado, Pais)",
        },
        {
            id: 7,
            name: "levelStudies",
            type: "select",
            htmlfor: "levelStudies",
            txt: "Select level of last studies",
            options: ['Posgrado','Licenciatura o Ingeniaría','Bachillerato','Secundaria','Primaria','Ninguno']
        },
        /*{
            id: 8,
            name: "professionalArea",
            type: "text",
            htmlfor: "professionalArea",
            txt: "Carrera profesional o campo de experiencia"
        },*/
        {
            id: 9,
            name: "englishLevel",
            type: "select",
            htmlfor: "englishLevel",
            txt: "Select english level",
            options: ['Ninguno','Básico','Intermedio','Avanzado']
        },
        {
            id: 10,
            name: "position",
            type: "text",
            htmlfor: "position",
            txt: "Position"
        }
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
    

    //FUNCIONES o estados PARA LOS BOTONES DEL ActionBar
    //Esta funcion aparece cuando se da click al chequear un precandidato
    function confirmationStageProcessRecruitment(){//Accion para el boton de pasar a la subseccion Process Recruitment
        setShowConfirmAction(true)
        setTxtTitleConfirmationAction('Subsection Process Recruitment')
        setTxtConfirmationAction('¿Do you want add it to this stage?')
    }
    


    const actionsBarPrecandidates = [//Defino las opciones que tendra el nav de actions
        {id:1,icon:<Icon name="ready" size="1rem"/>,nameClass: 'done-pre', fn:confirmationStageProcessRecruitment}
    ]




    
    //console.log(checkedOptions)
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
                
                setGender('')
                setLevelEnglish('')
                setCivilStatus('')
                setLevelStudies('')
                setCheckedOptions([])
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

    const setFalseShownModalConfirmation = e => {//Funcion para quitar el modal cuando se de click fuera de el
        if(e.target.classList.contains('container-confirmation-modal')){
            setShowConfirmAction(false)
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
            console.log(rows)
            const rowFounded = rows.find(row => row.id == checkedOptions[0]);
            //console.log(rowFounded)
            //console.log("El usser seleccionado es:",rowFounded)//----------------------
            setPrecandidateSelected(rowFounded)
            //console.log(precandidateSelected)
            setValoresNewPrecandidate(rowFounded)//-----------------------
            //console.log("El founded es:", rowFounded)
            setFetchUpdate(false)
            //console.log(fetchUpdate)
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
                    name: "dateBirth",
                    type: "text",
                    htmlfor: "dateBirth",
                    txt: "Date Birth",
                    value: rowFounded['dateBirth']
                },
                {
                    id: 4,
                    name: "civilStatus",
                    type: "select",
                    htmlfor: "civilStatus",
                    txt: "Civil Status",
                    options: ['Casado (a)','Soltero (o)','Divorciado (a)','Unión Libre','Viudo (a)'],
                    value: rowFounded['civilStatus']
                },
                {
                    id: 5,
                    name: "gender",
                    type: "select",
                    htmlfor: "gender",
                    txt: "Gender",
                    options: ['Masculino', 'Femenino','Otro'],
                    value: rowFounded['gender']
                },
                {
                    id: 6,
                    name: "country",
                    type: "text",
                    htmlfor: "country",
                    txt: "Country (Ciudad, Estado, Pais)",
                    value: rowFounded['country']
                },
                {
                    id: 7,
                    name: "levelStudies",
                    type: "select",
                    htmlfor: "levelStudies",
                    txt: "Level of Last Studies",
                    options: ['Posgrado','Licenciatura o Ingeniería','Bachillerato','Secundaria','Primaria','Ninguno'],
                    value: rowFounded['levelStudies']
                },
                /*{
                    id: 8,
                    name: "professionalArea", 
                    type: "text",
                    htmlfor: "professionalArea",
                    txt: "Carrera profesional o campo de experiencia",
                    value: rowFounded['professionalArea']
                },*/
                {
                    id: 9,
                    name: "englishLevel",
                    type: "select",
                    htmlfor: "englishLevel",
                    txt: "English Level",
                    options: ['Ninguno','Básico','Intermedio','Avanzado'],
                    value: rowFounded['englishLevel']
                },
                {
                    id: 10,
                    name: "position",
                    type: "text",
                    htmlfor: "position",
                    txt: "Position",
                    value: rowFounded['position']
                }
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
        email: '',
        phone: '',
        dateBirth: '',
        country: '',
        //professionalArea: '',
        position: ''
    });
    //Son los sets para los select del formulario y asignar la opcion seleccionada
    const [gender,setGender] = useState('');
    const  [levelEnglish, setLevelEnglish] =  useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [levelStudies, setLevelStudies] = useState('');
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
        const {fullname,country,email,dateBirth,phone,professionalArea,position} = valoresNewPrecandidate;
        //console.log("se envia estooo",datosForm)
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
            //console.log("fetchUpdate",fetchUpdate)
            //console.log(checkedOptions[0]+2)
            if(fetchUpdate){
                //console.log("updating...")
                //Hide formulario
                const checkBoxs = document.querySelectorAll('.checkbox')
                if(checkBoxs){
                    checkBoxs.forEach(checkbox => {
                        checkbox.checked = false;
                        checkbox.parentElement.parentElement.classList.remove('rowSelected')
                    });
                }
                setCheckedOptions([])
                setFormPrecandidate(false);


                const datosForm = {//Datos para actaulizar
                    //"dateTemporal": getDateTemporary(),
                    "fullname":fullname,//
                    "email":email,//
                    "phone":phone,//
                    "dateBirth":dateBirth,//
                    "civilStatus":civilStatus,//
                    "gender":gender,//
                    "country":country,//
                    "levelStudies":levelStudies,//
                    "professionalArea": "",//
                    "englishLevel":levelEnglish,//
                    "position":position,//
                    "dependencies": "",
                    "emailRepeat": "",
                    "generalInformation": true,
                    "recruitmenProcess": false,
                    "tipoTrabajo": "",
                    "personalityTest": "",
                    "testGorila": "",
                    "contratoReclutamiento": "",
                    "applicationCv": "",
                    "selectionProcess": false,
                    "employer": "",
                    "referred": "",
                    "methodContact": "",
                    "interviewed": "",
                    "status": "",
                    "clientDocuments": false,
                    "birthCertificate": "",
                    "passport": "",
                    "proofAddress": "",
                    "haveFamily": "",
                    "documentsFamily": [],
                    "gmProcess": false,
                    "callExplaining": "",
                    "contractAndPaymentPlan": "",
                    "documentsFile": "",
                    "questionnaire": "",
                    "docsUpload": "",
                    "initialPayment": "",
                    "sentToKeny": ""
                }

                //console.log(checkedOptions[0])
                //const elementIdEdited = checkedOptions[0]
                const {updated} = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${checkedOptions[0]}`,datosForm)//Creamos un nuevo registro (precandidato)
                
                setPrecandidateSelected(null)
                //Hay que actualizar la pagina o la tabla
                getPrecandidates()

                if(updated){

                    setIdElementEdited([...idElementEdited,checkedOptions[0]])//Establezco el id del elemento editado
                    
                    //Show modal
                    setModal(true)
                    setTitle("Updated Successfully")
                    setMessage('Precandidate was updated')
                    setType("success")
                    setShowSpinnerFormPre(false)

                    setFetchUpdate(false)

                    //Mejor hay que mostrar un boton para actualizar 
                    /*if(!showBtnRefresh){
                        setShowBtnRefresh(true)
                    }*/

                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage('Its not posible to update')
                    setType('error')
                    setShowSpinnerFormPre(false)

                    setFetchUpdate(false)
                }
            }else{
                //console.log("creating...")
                //Hide formulario
                setFormPrecandidate(false);


                const datosForm = {
                    "dateTemporal": getDateTemporary(),
                    "creadoDirectamenteEnCRM": true,
                    "fullname":fullname,//
                    "email":email,//
                    "phone":phone,//
                    "dateBirth":dateBirth,//
                    "civilStatus":civilStatus,//
                    "gender":gender,//
                    "country":country,//
                    "levelStudies":levelStudies,//
                    "professionalArea": "",//
                    "englishLevel":levelEnglish,//
                    "position":position,//
                    "dependencies": "",
                    "emailRepeat": "",
                    "generalInformation": true,
                    "recruitmenProcess": false,
                    "tipoTrabajo": "",
                    "personalityTest": "",
                    "testGorila": "",
                    "contratoReclutamiento": "",
                    "applicationCv": "",
                    "selectionProcess": false,
                    "employer": "",
                    "referred": "",
                    "methodContact": "",
                    "interviewed": "",
                    "status": "",
                    "clientDocuments": false,
                    "birthCertificate": "",
                    "passport": "",
                    "proofAddress": "",
                    "haveFamily": "",
                    "documentsFamily": [],
                    "gmProcess": false,
                    "callExplaining": "",
                    "contractAndPaymentPlan": "",
                    "documentsFile": "",
                    "questionnaire": "",
                    "docsUpload": "",
                    "initialPayment": "",
                    "sentToKeny": ""
                }

                const {added,nuevoPrecandidato} = await fetchUrlPost("https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/",datosForm)//Creamos un nuevo registro (precandidato)

                //Hay que actualizar la pagina o la tabla
                getPrecandidates()

                if(added){

                    const {id} = nuevoPrecandidato;
                    setIdElementEdited([...idElementEdited,id])

                    //Show modal
                    setModal(true)
                    setTitle("Added Successfully")
                    setMessage('It was added to database')
                    setType("success")
                    setShowSpinnerFormPre(false)

                    //Mejor hay que mostrar un boton para actualizar 
                    /*if(!showBtnRefresh){
                        setShowBtnRefresh(true)
                    }*/
                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage('Its not was posible to add')
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






    //FUNCION PARA EL EVENTO CUANDO SE DE CLICK EN EL BOTON 'REFRESH'
    async function refreshTable(){
        setShowSpinner(true)
        await getPrecandidates()
        setShowSpinner(false)
        setShowBtnRefresh(false)
    }











    //ESTAS FUNCIONES ES PARA EL COMPONENTE Confirmation.jsx
    function quitModalConfirmation(){
        setShowConfirmAction(false)
    }

    const [showSpinnerChangeStagePR,setShowSpinnerChangeStagePR] = useState(false)
    async function sendToSubsectionProcessRecruitment(){//Que hacer cuando se confirma la accion
        try {

            setShowSpinnerChangeStagePR(true)

            const body = {
                "generalInformation": false,
                "recruitmenProcess": true,
            }

            //console.log(checkedOptions)
            const promesas = checkedOptions.map(id => fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${id}`,body))
            const resultados = await Promise.all(promesas)
            getPrecandidates()

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
            setTitle("Send to next stage")
            setMessage('Your precandidates was send to process recruitment')
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
            setMessage('Its not was posible send to next subsection')
            setType('error')
            setShowSpinnerChangeStagePR(false)

        }
    }





    return (
        <section className="section-precandidates">
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
                showFormPrecandidate ? //Es para mostrar el formulario para crear precandidato
                <>
                    <div className="container-signup-precandidate" onClick={e => setFalseShowFormPrecandidate(e)}>
                        <div className="form-precandidate animate__animated animate__bounceInRight">
                            <h1>{precandidateSelected !== null ? 'Edit this candidate' : 'Create new precandidate'}</h1>
                            {
                                precandidateSelected === null ?    
                                    <Form flexDirection="row" widthFieldset="48%" widthForm="100%" action="#" method="#" fieldsets={fieldsetsFormSignupPrecandidate} txtButtonSubmit="Create" fnChange={handleChangeNewPrecandidate} fnSubmit={handleSubmitNewPrecandidate} reform={formRefNewPrecandidate} setGender={setGender} setLevelEnglish={setLevelEnglish} setCivilStatus={setCivilStatus} setLevelStudies={setLevelStudies} showSpinner={showSpinnerFormPre} setParamDefault={false}/>
                                :
                                    <Form flexDirection="row" widthFieldset="48%" widthForm="100%" action="#" method="#" fieldsets={fieldsetsEditPrecandidate} txtButtonSubmit="Update" fnChange={handleChangeNewPrecandidate} fnSubmit={handleSubmitNewPrecandidate} reform={formRefNewPrecandidate} setGender={setGender} setLevelEnglish={setLevelEnglish} setCivilStatus={setCivilStatus} setLevelStudies={setLevelStudies} showSpinner={showSpinnerFormPre} precandidateSelected={precandidateSelected} setParamDefault={true}/>
                            }
                        </div>
                    </div>
                </>
                : 
                <></>
            }
            { //Es el modal que muestra para confirmar si se quiere pasar los precandidatos a la subseccion 'process recruitment'
                showConfirmAction ?
                    <div className="container-confirmation-modal" onClick={e => setFalseShownModalConfirmation(e)}>
                        <Confirmation showSpinner={showSpinnerChangeStagePR} cancel={quitModalConfirmation} ok={sendToSubsectionProcessRecruitment}/>
                    </div> 
                : <></>
            }






        


            {
                sectionSelectedTLU  === 'gi' ?
                <>
                    <div className="btn-new-candidate">
                        <div className="search-container">
                            {   //Aqui decido que componente search mostrar, si el de la subseccion informacion general o process recruitment
                                <Search txt="Search precandidate in general information subsection" setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                            }
                        </div>
                        <div className="btn-n-c">
                            {
                                checkedOptions.length <= 0 ? <Button color="#fff" fn={setTrueShowFormPrecandidate} txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6" bgColor="#2020cc"/> : <></>
                            }
                        </div>
                    </div>
                    <div className="container-candidates">
                            <div className="params-filter-precandidate">
                                <LiaFilterSolid />
                                <SelectDefault width="150px" color="#fff" title="English Level" options={levelEnglishOptions} setParam={setParamEnglishLevel} />
                                <SelectDefault width="250px" color="#fff" title="Studies Level" options={levelStudiesOptions} setParam={setParamStudiesLevel} />
                                {
                                    showBtnRefresh 
                                    ? <Button txt="News precandidates in SpreadSheets, refresh table" color="#2020cc" colorIcon="#000" size="fit-content" iconRefresh={true} fn={refreshTable}/>
                                    : <></>
                                }
                            </div>
                        {
                            showSpinner 
                            ? 
                                <div className="spinner-table-precandidates"><Load/></div>
                            : 
                                <>
                                    <Table height="gi" idElementEdited={idElementEdited} columns={columnsGeneralInformation} rows={rows.filter(row => row.generalInformation == true)} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setRowsTLU={setRowsTLU} setPrecandidateSelected={setPrecandidateSelected} setValoresNewPrecandidate={setValoresNewPrecandidate} setFetchUpdate={setFetchUpdate} sectionSelectedTLU={sectionSelectedTLU}/>
                                </>
                        }
                    </div>
                </>
                : (sectionSelectedTLU  === 'pr' ?
                <>
                    <div className="btn-new-candidate">
                        <div className="search-container">
                            {   //Aqui decido que componente search mostrar, si el de la subseccion informacion general o process recruitment
                                <Search txt="Search precandidate in process recruitment subsection" setFilteredCandidates={setRowsTLU} filteredCandidates={rows} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
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
                                    <Table height="pr" idElementEdited={idElementEdited} columns={columnsProcessRecruitment} rows={rows.filter(row => row.recruitmenProcess == true)} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setRowsTLU={setRowsTLU} setPrecandidateSelected={setPrecandidateSelected} setValoresNewPrecandidate={setValoresNewPrecandidate} setFetchUpdate={setFetchUpdate} sectionSelectedTLU={sectionSelectedTLU}/>
                                </>
                        }
                    </div>
                </>
                :<></>)
            }














            
            {
                showActions 
                ? <ActionBar  actions={actionsBarPrecandidates} optionEdit={optionEdit} precandidateSelected={precandidateSelected} fn={setTrueShowFormEditPrecandidate}/>
                : <></> 

            }
        </section>
    )
}

export default Precandidate;