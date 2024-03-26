import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Td from "./Td";

function Table({to,fontSize,padding,textAlign,columns,rows}){


    return(
        <table className="table-gm">
            <thead>
                <tr>
                    {
                        to == 'main-stages' ? 
                            columns.map((column,id) => (
                                <td key={id} style={{fontSize,padding,textAlign}}>{column}</td>
                            ))
                        : <></>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    to == 'main-stages' ? 
                        rows.map((customer,id) => (
                            <tr>
                                <Td split={true} numberLetters={10} fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.nameCompany} />
                                <Td fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.ownerName} />
                                <Td split={true} numberLetters={10}  fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.phone} />
                                <Td split={true} numberLetters={7} fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.email} />
                                <Td fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.lead} />
                                <Td fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.initialResearch} />
                                <Td fontSize={fontSize} padding={padding} textAlign={textAlign} txt={customer.newLead} />
                            </tr>
                        ))
                    : <></>
                }
            </tbody>
        </table>
    )
}

export default Table;