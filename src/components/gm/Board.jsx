import { useEffect, useState } from "react";
import axios from 'axios'
import SubsectionBoard from "./SubsectionBoard";

function Board({customers,setCustomers,showSpinner}){

    



    //Definiendo funciones para el compente CompanyItem.jsx
    function handleOnDrag(e,customer){//Cuando arrastro el elemento, obtengo los datos de el
        e.dataTransfer.setData("customer", JSON.stringify(customer))
    }
    function handleDragOver(e){
        e.preventDefault()
    }





    //Definiendo funciones para el componente SubsectionBoard.jsx
    function updateStatusCustomers(id,updateFields){//Es para actualizar los campos al moverlos a una determinada seccion
        setCustomers(customerPrev => {
            return customers.map(customer => {
                if(customer._id == id){
                    return {...customer,...updateFields}
                }
                return customer
            })
        })
    }
    function handleOnDrop(e,name,setBtnSave,newsItems,setNewItems){//Cuando arrastro y lo suelto, que hacer?
        const customer = e.dataTransfer.getData("customer")
        const {_id} = JSON.parse(customer)//Obtener id del elemento seleccionado
        if(name == 'prospecto'){updateStatusCustomers(_id,{prospecto: true, calificacion: false, compromiso: false, negociacion: false, cierre: false, postventa: false})}
        if(name == 'calificacion'){updateStatusCustomers(_id,{prospecto: false, calificacion: true, compromiso: false, negociacion: false, cierre: false, postventa: false})}
        if(name == 'compromiso'){updateStatusCustomers(_id,{prospecto: false, calificacion: false, compromiso: true, negociacion: false, cierre: false, postventa: false})}
        if(name == 'negociacion'){updateStatusCustomers(_id,{prospecto: false, calificacion: false, compromiso: false, negociacion: true, cierre: false, postventa: false})}
        if(name == 'cierre'){updateStatusCustomers(_id,{prospecto: false, calificacion: false, compromiso: false, negociacion: false, cierre: true, postventa: false})}
        if(name == 'postventa'){updateStatusCustomers(_id,{prospecto: false, calificacion: false, compromiso: false, negociacion: false, cierre: false, postventa: true})}
        //Mostrar el boton de guardar
        setBtnSave(true)
        //Almacenar en el arreglo de los items agregados por arrastre, el id del elemento seleccionado
        setNewItems([...newsItems,_id])
    }
    //Funcion cuando se click en el boton de guardar cambios o elementos arratrados y soltados en este componente
    async function saveItemsDropped(name,newsItems, setNewItems,setShowSpinnerBtnSave,setBtnSave){
        let fieldsToUpdate;
        if(name == 'prospecto'){fieldsToUpdate = {prospecto: true, calificacion: false, compromiso: false, negociacion: false, cierre: false, postventa: false} }
        if(name == 'calificacion'){fieldsToUpdate = {prospecto: false, calificacion: true, compromiso: false, negociacion: false, cierre: false, postventa: false} }
        if(name == 'compromiso'){fieldsToUpdate = {prospecto: false, calificacion: false, compromiso: true, negociacion: false, cierre: false, postventa: false} }
        if(name == 'negociacion'){fieldsToUpdate = {prospecto: false, calificacion: false, compromiso: false, negociacion: true, cierre: false, postventa: false} }
        if(name == 'cierre'){fieldsToUpdate = {prospecto: false, calificacion: false, compromiso: false, negociacion: false, cierre: true, postventa: false} }
        if(name == 'postventa'){fieldsToUpdate = {prospecto: false, calificacion: false, compromiso: false, negociacion: false, cierre: false, postventa: true} }
        const data = {
            ids: newsItems,
            fieldsToUpdate
        }
        setShowSpinnerBtnSave(true)
        const response = await axios.post('https://api-gw-cpa-pc-20aq.onrender.com/gm/customer/many',data)
        setNewItems([])//Vaciar o reiniciar el contenedor de ids de elementos dropped
        setShowSpinnerBtnSave(false)//Ocultar el spinner
        setBtnSave(false)//Ocultar boton de guardar
    }






    return(
        <section className="board-gm">
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={0} id={0} name='prospecto' title="Prospect" colorItems="rgb(255, 244, 244)" customers={customers.filter(customer => customer.prospecto == true).length > 0 ? customers.filter(customer => customer.prospecto == true) : [] } setCustomers={setCustomers}/>
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={1} id={1} name='calificacion' title="Qualification" colorItems="rgb(246, 247, 255)" customers={customers.filter(customer => customer.calificacion == true).length > 0 ? customers.filter(customer => customer.calificacion == true) : [] } setCustomers={setCustomers}/>
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={2} id={2} name='compromiso' title="Engagement" colorItems="rgb(255, 251, 233)" customers={customers.filter(customer => customer.compromiso == true).length > 0 ? customers.filter(customer => customer.compromiso == true) : [] } setCustomers={setCustomers}/>
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={3} id={3} name='negociacion' title="Negotiation" colorItems="rgb(246, 235, 255)" customers={customers.filter(customer => customer.negociacion == true).length > 0 ? customers.filter(customer => customer.negociacion == true) : [] } setCustomers={setCustomers}/>
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={4} id={4} name='cierre' title="Closing" colorItems="rgb(255, 253, 227)" customers={customers.filter(customer => customer.cierre == true).length > 0 ? customers.filter(customer => customer.cierre == true) : [] } setCustomers={setCustomers}/>
            <SubsectionBoard showSpinner={showSpinner} saveItemsDropped={saveItemsDropped} handleOnDrop={handleOnDrop} handleDragOver={handleDragOver} handleOnDrag={handleOnDrag} key={5} id={5} name='postventa' title="Post Sale" colorItems="rgb(240, 255, 243)" customers={customers.filter(customer => customer.postventa == true).length > 0 ? customers.filter(customer => customer.postventa == true) : [] } setCustomers={setCustomers}/>
        </section>
    )

}

export default Board;