import { useState } from "react";
import Icon from "./Icon";
import Load from "./Load";
import Td from "./Td";



function Table({columns,rows,setCheckedOptions,checkedOptions,setColumnsTLU,setRowsTLU}){



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
            if(checkedOptions.includes(id)){
                checkedOptions = checkedOptions.filter(option => option !== id)
                setCheckedOptions(checkedOptions)
            }
        }
    }
    
    
    //STATE PARA LA FUNCION 'VER MAS' de una cadena
    const [more, setMore] = useState(false);



    //console.log(rows)   es para ver como son los id de cada registro y poder ver que id modificar

    return(
        <>
            {
                <div className="table-container">
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
                                {
                                    rows.map(({id,select,fullname,email,phone,country,dateBirth,civilStatus,gender,levelStudies,position,englishLevel})=>(
                                        <tr key={id}>
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
                                            <Td txt={country} optionMore={true}/>
                                            <Td txt={dateBirth} />
                                            <Td txt={civilStatus} />
                                            <Td txt={gender} />
                                            <Td txt={levelStudies} />
                                            <Td txt={position} optionMore={true} />
                                            <Td txt={englishLevel} />
                                        </tr>
                                    ))
                                }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

export default Table;