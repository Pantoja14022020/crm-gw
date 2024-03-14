import { useState } from "react";
import CardWorker from "./CardWorker";

function ClientDocuments({gmp,rows,getPrecandidates,modal,setModal,message,setMessage,title,setTitle,type,setType}){

    return(
        <>
           <div className="client-documents-container">
                <div className="cards-clients-documents">

                    {
                        rows.map(({_id,colorProfile,fullname,phone,email,position,englishLevel,levelStudies,birthCertificate,passport,proofAddress,marriageCertificate,haveFamily,documentsFamily,callExplaining,contractAndPaymentPlan,documentsFile,questionnaire,completeQuestionnaire,docsUpload,initialPayment,sentToKeny}) => (
                            <CardWorker colorProfile={colorProfile} gmp={gmp} type={type} setType={setType} title={title} setTitle={setTitle} message={message} setMessage={setMessage} modal={modal} setModal={setModal} getPrecandidates={getPrecandidates} key={_id} _id={_id} fullname={fullname} phone={phone} email={email} position={position} englishLevel={englishLevel} levelStudies={levelStudies} birthCertificate={birthCertificate} passport={passport} proofAddress={proofAddress} haveFamily={haveFamily} marriageCertificate={marriageCertificate} documentsFamily={documentsFamily} callExplaining={callExplaining} contractAndPaymentPlan={contractAndPaymentPlan} documentsFile={documentsFile} questionnaire={questionnaire} docsUpload={docsUpload} initialPayment={initialPayment} sentToKeny={sentToKeny} completeQuestionnaire={completeQuestionnaire}/>
                        ))
                    }

                </div>
           </div>
        </>
    )
}

export default ClientDocuments;