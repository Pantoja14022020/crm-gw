import { useState } from "react";
import Icon from "./Icon";
import Load from "./Load";
import Td from "./Td";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";



function Table({height,idElementEdited,columns,rows,setCheckedOptions,checkedOptions,setRowsTLU,setPrecandidateSelected, setValoresNewPrecandidate, setFetchUpdate, sectionSelectedTLU,confirmationStageToStageCandidates}){



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
                                    rows.map(({id,select,fullname,email,phone,country,dateBirth,civilStatus,gender,levelStudies,position,englishLevel})=>(
                                        <tr key={id} style={{color: `${idElementEdited.includes(id) ? '#000' : ''}`, fontWeight: `${idElementEdited.includes(id) ? '600' : ''}`}}>
                                            <td><input type="checkbox" id={id} className="checkbox" onChange={e => handleCheckboxChange(e,id)}/></td>
                                            {/**<td>{fullname.substring(0,10)}...</td>
                                            <td>{email.substring(0,7)}...</td>
                                            <td>{phone}</td>
                                            <td>{country.substring(0,8)}...</td> 
                                            <td>{dateBirth.substring(0,5)}...</td>
                                            <td>{civilStatus}</td>
                                            <td>{gender}</td>
                                            <td>{levelStudies.substring(0,10)}...</td>
                                            <td>{position.substring(0,10)}...</td>
                                            <td>{englishLevel}</td>**/}
                                            <Td txt={fullname}/>
                                            <Td txt={email} optionMore={true}/>
                                            <Td txt={phone} optionMore={true}/>
                                            <Td txt={dateBirth} />
                                            <Td txt={civilStatus} />
                                            <Td txt={gender} />
                                            <Td txt={country} optionMore={true}/>
                                            <Td txt={levelStudies} />
                                            <Td txt={englishLevel} optionMore={true} />
                                            <Td txt={position} optionMore={true} />
                                        </tr>
                                    ))
                                    : <></>
                                }





                                {   sectionSelectedTLU == 'pr' ? //Defino que filas se muestran para la tabla process recruitment
                                    rows.map(({id,select,fullname,email,phone,tipoTrabajo,personalityTest,testGorila,contratoReclutamiento,applicationCv})=>(
                                        <tr key={id} style={{color: `${idElementEdited.includes(id) ? '#000' : ''}`, fontWeight: `${idElementEdited.includes(id) ? '600' : ''}`}}>
                                            <td><input type="checkbox" id={id} className="checkbox" onChange={e => handleCheckboxChange(e,id)}/></td>
                                            {/**<td>{fullname.substring(0,10)}...</td>
                                            <td>{email.substring(0,7)}...</td>
                                            <td>{phone}</td>
                                            <td>{country.substring(0,8)}...</td> 
                                            <td>{dateBirth.substring(0,5)}...</td>
                                            <td>{civilStatus}</td>
                                            <td>{gender}</td>
                                            <td>{levelStudies.substring(0,10)}...</td>
                                            <td>{position.substring(0,10)}...</td>
                                            <td>{englishLevel}</td>**/}
                                            <Td txt={fullname}/>
                                            <Td txt={email} optionMore={true}/>
                                            <Td txt={phone} optionMore={true}/>
                                            <Td txt={tipoTrabajo.length > 0 ? tipoTrabajo : 'Empty'} highlightTT={tipoTrabajo.length > 0 ? true : false}/>
                                            <Td txt={personalityTest.length > 0 ? personalityTest : 'Empty'} optionMore={personalityTest.length > 0 ? true : false}/>
                                            <Td txt={testGorila.length > 0 || contratoReclutamiento.length > 0 ? (tipoTrabajo == 'Oficio' ? `contrato de reclutamiento: ${contratoReclutamiento}` : `test gorila: ${testGorila}`) : 'Empty'} highlightTG={testGorila.length > 0 || contratoReclutamiento.length > 0? true : false}/>
                                            <Td txt={applicationCv.length > 0 ? applicationCv : 'Empty'} highlightAC={applicationCv.length > 0 ? true : false}/>
                                            <td id={id}>{tipoTrabajo.length > 0 && (testGorila.length > 0 || contratoReclutamiento.length > 0) && applicationCv.length > 0 ? <button id={id} onClick={e => confirmationStageToStageCandidates(id)} className="check-candidate"><FaCheck id={id} color="#007a3d" size="0.9rem" /></button> : <button id={id} className="check-candidate"><IoClose color="#ce2323" size="1rem"/></button> }</td>
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