function CompanyItem({colorItems,nameCompany,ownerName,imgProfile}){
    return(
        <div className="company-item" style={{backgroundColor: `${colorItems}`}}>
            <div className="profile-company-item">
                <div className="img-pci" style={{backgroundColor:`${imgProfile}`}}>{nameCompany.substring(0,1).toUpperCase()}</div>
            </div>
            <div>
                <h1>{nameCompany}</h1>
                <p>{ownerName}</p>
            </div>
        </div>
    )
}

export default CompanyItem