import { useState } from "react";
import { generarColorAlegre } from "../helpers/generators";
import CardWorker from "./CardWorker";

function ClientDocuments({rows,getPrecandidates,modal,setModal,message,setMessage,title,setTitle,type,setType}){

    return(
        <>
           <div className="client-documents-container">
                <div className="cards-clients-documents">

                    {
                        rows.map(({_id,fullname,phone,email,position,englishLevel,levelStudies,birthCertificate,passport,proofAddress,haveFamily,documentsFamily}) => (
                            <CardWorker type={type} setType={setType} title={title} setTitle={setTitle} message={message} setMessage={setMessage} modal={modal} setModal={setModal} getPrecandidates={getPrecandidates} key={_id} _id={_id} fullname={fullname} phone={phone} email={email} position={position} englishLevel={englishLevel} levelStudies={levelStudies} birthCertificate={birthCertificate} passport={passport} proofAddress={proofAddress} haveFamily={haveFamily} documentsFamily={documentsFamily} colorProfile={generarColorAlegre()}/>
                        ))
                    }

                </div>
           </div>
        </>
    )
}

export default ClientDocuments;