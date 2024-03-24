import { useEffect, useState } from "react";
import SubsectionBoard from "./SubsectionBoard";

function Board({customers}){

    const [allCustomers, setAllCustomers] = useState(customers)

    return(
        <section className="board-gm">
            <SubsectionBoard title="Prospecto" colorItems="rgb(255, 244, 244)" customers={allCustomers.filter(customer => customer.prospecto == true)}/>
            <SubsectionBoard title="Calificación" colorItems="rgb(246, 247, 255)" customers={allCustomers.filter(customer => customer.calificacion == true)}/>
            <SubsectionBoard title="Compromiso" colorItems="rgb(255, 251, 233)" customers={allCustomers.filter(customer => customer.compromiso == true)}/>
            <SubsectionBoard title="Negociación" colorItems="rgb(246, 235, 255)" customers={allCustomers.filter(customer => customer.negociacion == true)}/>
            <SubsectionBoard title="Cierre" colorItems="rgb(255, 253, 227)" customers={allCustomers.filter(customer => customer.cierre == true)}/>
            <SubsectionBoard title="Postventa" colorItems="rgb(240, 255, 243)" customers={allCustomers.filter(customer => customer.postventa == true)}/>
        </section>
    )
}

export default Board;