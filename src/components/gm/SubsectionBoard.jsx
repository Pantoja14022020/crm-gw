import { useEffect, useState } from "react"
import { Spinner } from "@material-tailwind/react";
import Table from "./Table"
import CompanyItem from "./CompanyItem"
import Search from "./Search";

function SubsectionBoard({icon,saveItemsDropped,handleOnDrop,handleDragOver,handleOnDrag,name,title,colorItems,customers,setCustomers,showSpinner}){
    
    const [btnSave,setBtnSave] = useState(false)//Estado que determina si se muestra o no el bton para guardar
    const [newsItems, setNewItems] = useState([])//Almacena el id de los elementos arrastrados y soltados en este componente
    const [showSpinnerBtnSave,setShowSpinnerBtnSave] = useState(false)//Mostrar spinner al dar click en guardar

    //Estado que almacena los strings del buscador o las palabras que se escriban
    const [searchTerm,setSearchTerm] = useState('')

    //Copia o respaldo del arreglo de customers
    const [itemsCustomers,setItemsCustomers] = useState([])

    //Una vez tenga algo customers, guardarlo en la copia o respaldo 'itemsCustomer' 
    useEffect(()=>{
        setItemsCustomers(customers)
    },[customers])

    //Efecto para filtrar conforme se vaya escribiendo
    useEffect(()=>{
        setItemsCustomers(
            customers.filter( customer => {//HERE
                return customer.ownerName.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, '')) || customer.nameCompany.toLowerCase().replace(/\s/g, '').includes(searchTerm.toLowerCase().replace(/\s/g, ''))
            })
        )
    },[searchTerm])
    

    return(
        <div onDrop={e => handleOnDrop(e,name,setBtnSave,newsItems,setNewItems)} onDragOver={handleDragOver} className="subsection-board">
            <div className="header-subsection-board"><h1>{title}</h1></div>
            <Search padding="0.25rem" borderRadius="0.25rem" fontSize="0.6rem" widthInput="85%" setSearchTerm={setSearchTerm}/>
                {   //Items de la seccion; mostrar spinner mientras cargan
                    showSpinner ? <Spinner className="center-spinner"/>
                    : 
                    <div className="items-container-subsection-board">
                        {
                            itemsCustomers.map((customer,id) => ( //HERE
                                <CompanyItem handleOnDrag={handleOnDrag} customer={customer} key={id} id={id} colorItems={colorItems} />
                            ))
                        }
                    </div>
                }
            <div className="btn-actions-subsection-board">
                {
                    btnSave ? <button onClick={e => saveItemsDropped(name,newsItems, setNewItems,setShowSpinnerBtnSave,setBtnSave)} className="btn-save">
                       {showSpinnerBtnSave ? <Spinner width="20px" height="20px"/> : <></>} <p>Save</p></button> 
                    : <></>
                }
            </div>
        </div>
    )
}

export default SubsectionBoard