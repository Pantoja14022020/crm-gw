import { useState } from "react";
import Icon from "./Icon";
import Load from "./Load";
import Td from "./Td";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";




function Table({showSpinnerForTd,height,idElementEdited,columns,rows,setCheckedOptions,checkedOptions,setRowsTLU,setPrecandidateSelected, setValoresNewPrecandidate, setFetchUpdate, sectionSelectedTLU,confirmationStageToStageCandidates,confirmationStageToEB3Workers}){



    //FUNCION PARA QUITAR O AGREGAR LOS IDS DE LOS INPUTS CHEQUEADOS
    const handleCheckboxChange = (e,id) => {//Funcion para guardar el id del elemento cuando esta chequeado
        if(e.target.checked){//Si esta chequeado, entonces...
            e.target.parentElement.parentElement.classList.toggle('rowSelected')
            if(!checkedOptions.includes(id)){//y ademas ese id no esta en el arreglo, entonces lo save
                setCheckedOptions([...checkedOptions,id])
            }
        }
        if(!e.target.checked){//Para sacar el id del elemento que se dejo de chequear
            e.target.parentElement.parentElement.classList.toggle('rowSelected')
            if(checkedOptions.length == 1){
                setFetchUpdate(false)
            }
            if(checkedOptions.includes(id)){
                checkedOptions = checkedOptions.filter(option => option !== id)
                setCheckedOptions(checkedOptions)

                //Restaurar valores tambien a aqui
                setPrecandidateSelected(null)
                
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
            }
        }
    }
    
    
    //STATE PARA LA FUNCION 'VER MAS' de una cadena
    const [more, setMore] = useState(false);

    //rows.reverse();

    //console.log(rows)   es para ver como son los id de cada registro y poder ver que id modificar

    return(
        <>
            {
                <div className={`table-container ${height}`}>
                    <table>
                        <thead>
                            <tr>   
                                {
                                    columns.length > 0 ? <th key="0"><Icon name="arrow" size="1.2rem" center={true}/></th> : <></>
                                }  
                                                              
                                {
                                    columns.map(({id,txt})=>( 
                                        <th key={id}>{txt}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                                {   sectionSelectedTLU == 'gi' ?
                                        rows.map(({_id,select,fullname,email,phone,country,dateBirth,civilStatus,gender,levelStudies,position,englishLevel})=>(
                                            <tr key={_id} style={{color: `${idElementEdited.includes(_id) ? '#000' : ''}`, fontWeight: `${idElementEdited.includes(_id) ? '600' : ''}`}}>
                                                <td><input type="checkbox" id={_id} className="checkbox" onChange={e => handleCheckboxChange(e,_id)}/></td>
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={fullname}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={email} optionMore={true}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={phone} optionMore={true}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={dateBirth} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={civilStatus} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={gender} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={country} optionMore={true}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={levelStudies} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={englishLevel} optionMore={true} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={position} optionMore={true} />}
                                            </tr>
                                        ))
                                    : <></>
                                }





                                {   sectionSelectedTLU == 'pr' ? //Defino que filas se muestran para la tabla process recruitment
                                    rows.map(({_id,select,fullname,email,phone,tipoTrabajo,personalityTest,testGorila,contratoReclutamiento,applicationCv})=>(
                                        <tr key={_id} style={{color: `${idElementEdited.includes(_id) ? '#000' : ''}`, fontWeight: `${idElementEdited.includes(_id) ? '600' : ''}`}}>
                                            <td><input type="checkbox" id={_id} className="checkbox" onChange={e => handleCheckboxChange(e,_id)}/></td>
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={fullname}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={email} optionMore={true}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={phone} optionMore={true}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={tipoTrabajo.length > 0 ? tipoTrabajo : 'Empty'} highlightTT={tipoTrabajo.length > 0 ? true : false}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={personalityTest.length > 0 ? personalityTest : 'Empty'} optionMore={personalityTest.length > 0 ? true : false}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={testGorila.length > 0 || contratoReclutamiento.length > 0 ? (tipoTrabajo == 'Oficio' ? `contrato de reclutamiento: ${contratoReclutamiento}` : `test gorila: ${testGorila}`) : 'Empty'} highlightTG={testGorila.length > 0 || contratoReclutamiento.length > 0? true : false}/>}
                                            {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={applicationCv.length > 0 ? applicationCv : 'Empty'} highlightAC={applicationCv.length > 0 ? true : false}/>}
                                            <td id={_id}>{tipoTrabajo.length > 0 && (testGorila.length > 0 || contratoReclutamiento.length > 0) && applicationCv.length > 0 ? <button id={_id} onClick={e => confirmationStageToStageCandidates(_id)} className="check-candidate"><FaCheck id={_id} color="#007a3d" size="0.9rem" /></button> : <button id={_id} className="check-candidate"><IoClose color="#ce2323" size="1rem"/></button> }</td>
                                        </tr>
                                    ))
                                    : <></>
                                }






                                {   sectionSelectedTLU == 'sp' ? //Defino que filas se muestran para la tabla process recruitment
                                        rows.map(({_id,select,fullname,email,phone,tipoTrabajo,employer,referred,methodContact,interviewed,status})=>(
                                            <tr key={_id} style={{color: `${idElementEdited.includes(_id) ? '#000' : ''}`, fontWeight: `${idElementEdited.includes(_id) ? '600' : ''}`}}>
                                                <td><input type="checkbox" id={_id} className="checkbox" onChange={e => handleCheckboxChange(e,_id)}/></td>
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={fullname}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={email} optionMore={true}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> : <Td txt={phone} optionMore={true}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={tipoTrabajo.length > 0 ? tipoTrabajo : 'Empty'} highlightTT={tipoTrabajo.length > 0 ? true : false}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={employer.length > 0 ? employer : 'Empty'}/>}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={referred.length > 0 ? referred : 'Empty'} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={methodContact.length > 0 ? methodContact : 'Empty'} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={interviewed.length > 0 ? interviewed : 'Empty'} />}
                                                {showSpinnerForTd && (checkedOptions[0] == _id) ? <td style={{color:"#c4c4c4"}}><Load/></td> :<Td txt={status.length > 0 ? status : 'Empty'} highlightS={status.length > 0 ? true : false} />}
                                                <td id={_id} style={{color:"#ccc"}}>{    employer != '' && methodContact != '' && interviewed != '' && status == 'Contratado' && tipoTrabajo == 'Oficio' ? <button id={_id} onClick={e => confirmationStageToEB3Workers(_id)} className="send-btn-eb3">Click Here</button>  : ( employer != '' && methodContact != '' && interviewed != '' && status == 'Contratado' && tipoTrabajo == 'Profesión' ? 'Not Apply' : ( employer != '' && methodContact != '' && interviewed != '' && status != 'Contratado' && tipoTrabajo == 'Oficio' ? 'Still Not' : ( employer != '' && methodContact != '' && interviewed != '' && status != 'Contratado' && tipoTrabajo == 'Profesión' ? 'Not Apply' : 'Fill Form' ) )) }</td>
                                            </tr>
                                        ))
                                    : <></>
                                }




                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Table;