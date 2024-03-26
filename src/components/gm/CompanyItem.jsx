function CompanyItem({handleOnDrag,customer,id,colorItems}){


    return(
        <div draggable onDragStart={e => handleOnDrag(e,customer)} key={id} className="company-item" style={{backgroundColor: `${colorItems}`}}>
            <div className="profile-company-item">
                <div className="img-pci" style={{backgroundColor:`${customer.imgProfile}`}}>{customer.nameCompany.substring(0,1).toUpperCase()}</div>
            </div>
            <div className="info-company-item">
                <h1>{customer.nameCompany}</h1>
                <p>{customer.ownerName}</p>
            </div>
        </div>
    )
}

export default CompanyItem