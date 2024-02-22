import Icon from "./Icon";



function Table({columns,rows,setCheckedOptions,checkedOptions}){


    //FUNCION PARA QUITAR O AGREGAR LOS IDS DE LOS INPUTS CHEQUEADOS
    const handleCheckboxChange = (e,id) => {//Funcion para guardar el id del elemento cuando esta chequeado
        if(e.target.checked){//Si esta chequeado, entonces...
            if(!checkedOptions.includes(id)){//y ademas ese id no esta en el arreglo, entonces lo save
                setCheckedOptions([...checkedOptions,id])
            }
        }
        if(!e.target.checked){//Para sacar el id del elemento que se dejo de chequear
            if(checkedOptions.includes(id)){
                checkedOptions = checkedOptions.filter(option => option !== id)
                setCheckedOptions(checkedOptions)
            }
        }
    }
    

    return(
        <>
            <div className="table-container animate__animated animate__slideInUp">
                <table>
                    <thead>
                        <tr>
                            <th><Icon name="arrow" size="1.2rem" center={true}/></th>
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
                                        <td>{fullname}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>{country}</td> 
                                        <td>{dateBirth}</td>
                                        <td>{civilStatus}</td>
                                        <td>{gender}</td>
                                        <td>{levelStudies}</td>
                                        <td>{position}</td>
                                        <td>{englishLevel}</td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;