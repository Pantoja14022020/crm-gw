import Table from "./Table"
import CompanyItem from "./companyItem"

function SubsectionBoard({title,colorItems,customers}){

    return(
        <div className="subsection-board">
            <h1>{title}</h1>
            <div className="items-container-subsection-board">
                {
                    customers.map(({nameCompany,ownerName,imgProfile},id) => (
                        <CompanyItem key={id} colorItems={colorItems} nameCompany={nameCompany} ownerName={ownerName} imgProfile={imgProfile}/>
                    ))
                }
            </div>
        </div>
    )
}

export default SubsectionBoard