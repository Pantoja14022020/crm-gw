import Icon from "./Icon";

function Table({columns,rows}){
    return(
        <>
            <div className="table-container">
                <table>
                    <thead>
                        <th><Icon name="arrow" size="1.2rem"/></th>
                        {
                            columns.map(({id,txt})=>(
                                <th id={id}>{txt}</th>
                            ))
                        }
                    </thead>
                    <tbody>
                            {
                                rows.map(({id,fullname,email,phone,country,dateBirth,civilStatus,gender,levelStudies,position,englishLevel})=>(
                                    <tr key={id}>
                                        <td>{id}</td>
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