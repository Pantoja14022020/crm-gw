import Table from "./Table"
import { Spinner } from "@material-tailwind/react";

function Prospecto({customers,showSpinner}){

    const columns = [
        'Company Name',
        'Owner Name',
        'Phone',
        'Email',
        'Lead',
        'Initial Research',
        'New Lead'
    ]




    //INICIO. FUNCIONES PARA EL COMPONENTE TABLE.JSX
    
    //FIN. FUNCIONES PARA EL COMPONENTE TABLE.JSX



    return(
        <section className="prospecto-gm">
            <div className="container-table-prospecto-gm full-width-table">
                {
                    showSpinner 
                    ? <Spinner className="center-spinner"/>
                    : <Table to="main-stages" columns={columns} rows={customers} fontSize="0.6rem" padding="1rem" textAlign="left"/>
                }
            </div>
        </section>
    )
}

export default Prospecto