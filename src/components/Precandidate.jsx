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

function Precandidate({columns,rows,setColumnsTLU,setRowsTLU,setSearchTerm,searchTerm,showSpinner,setShowSpinner}){

    
   
    rows.length > 0 ? setShowSpinner(false) : setShowSpinner(true);

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
            type: "number",
            htmlfor: "phone",
            txt: "Phone"
        },
        {
            id: 3,
            name: "country",
            type: "select",
            htmlfor: "country",
            txt: "Country"
        },
        {
            id: 4,
            name: "date_birth",
            type: "date",
            htmlfor: "date_birth",
            txt: "Date Birth"
        },
        {
            id: 5,
            name: "civil_status",
            type: "select",
            htmlfor: "civil_status",
            txt: "Civil Status"
        },
        {
            id: 6,
            name: "gender",
            type: "select",
            htmlfor: "gender",
            txt: "Gender"
        },
        {
            id: 7,
            name: "level_studies",
            type: "select",
            htmlfor: "level_studies",
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
            name: "english_level",
            type: "select",
            htmlfor: "english_level",
            txt: "English Level"
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
    const setTrueShowFormPrecandidate = () => {
        setFormPrecandidate(true);
    }
    const setFalseShowFormPrecandidate = e => {
        if(e.target.classList.contains('container-signup-precandidate')){
            setFormPrecandidate(false);
        }
    }




    useEffect(()=>{//Cuando se modifique el arreglo de opciones chequeadas, decidir si mostrar o no el action bar
        checkedOptions.length > 0 ?
            setShowActions(true)
        : 
            setShowActions(false)
    },[checkedOptions])

    return (
        <section className="section-precandidates">
            {
                showFormPrecandidate ? //Es para mostrar el formulario para crear precandidato
                <>
                    <div className="container-signup-precandidate" onClick={e => setFalseShowFormPrecandidate(e)}>
                        <div className="form-precandidate animate__animated animate__bounceInRight">
                            <Form width="100%" action="#" method="#" fieldsets={fieldsetsFormSignupPrecandidate} txtButtonSubmit="Done"  reform={formRef}/>
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
                    <Button fn={setTrueShowFormPrecandidate} txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6"/>
                </div>
            </div>
            <div className="container-candidates">
                {
                    showSpinner 
                    ? <div className="spinner-table-precandidates"><Load/></div>
                    : <Table columns={columns} rows={rows} checkedOptions={checkedOptions}  setCheckedOptions={setCheckedOptions} setColumnsTLU={setColumnsTLU} setRowsTLU={setRowsTLU}/>
                }
            </div>
            
            {
                showActions 
                ? <ActionBar actions={actionsBarPrecandidates}/>
                : <></> 

            }
        </section>
    )
}

export default Precandidate;