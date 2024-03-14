import { useEffect, useState } from "react";
import ItemFamiliar from "./ItemFamiliar";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Load from "./Load";
import { fetchUrlPost, fetchUrlPut } from "../helpers/fetchs";

function CardWorker({gmp,type,setType,title,setTitle,message,setMessage,modal,setModal,_id,getPrecandidates,fullname,phone,email,position,englishLevel,levelStudies,birthCertificate,passport,proofAddress,marriageCertificate,haveFamily,documentsFamily,colorProfile,callExplaining,contractAndPaymentPlan,documentsFile,questionnaire,completeQuestionnaire,docsUpload,initialPayment,sentToKeny}){
    
    //ESTOS SON LOS USE STATE PARA LOS CHECKBOX DEL CLIENTDOCUMENTS.JSX
    const [birthCertificateCheck,setBirthCertificateCheck] = useState(false)
    const [passportCheck,setPassportCheck] = useState(false)
    const [proofAddressCheck, setProofAddressCheck] = useState(false)
    const [hasFamilyCheck,setHasFamilyCheck] = useState(false)
    const [marriageCertificateCheck, setMarriageCertificateCheck] = useState(false)
    const [quantityInteger, setQuantityInteger] = useState(0)
    const [showBtnOk,setShowBtnOk] = useState(true)
    const [errorCCD, setErrorCCD] = useState(false)
    const [msgErrorCCD,setMsgErrorCCD] = useState('')
    const [numFields,setNumFields] = useState(0);
    const [fakeArray, setFakeArray] = useState([])
    const [family,setFamily] = useState([])
    const [showSpinnerForCard, setShowSpinnerForCard] = useState(false)
    const [showSpinnerForBtnBack,setShowSpinnerForBtnBack] = useState(false)
    const [showSpinnerForExcel, setShowSpinnerForExcel] = useState(false)
    const [showSpinnerForSave,setShowSpinnerForSave] = useState(false)
    const [showSpinnerForSendGM, setShowSpinnerForSendGM] = useState(false)

    useEffect(()=>{
        if(!hasFamilyCheck){
            setQuantityInteger('')
            setShowBtnOk(false)
            setMarriageCertificateCheck(false)
            setFamily([])
        }
    },[hasFamilyCheck])

    useEffect(()=>{
        if(quantityInteger.length > 0) {
            setShowBtnOk(true)         
        }else{
            setShowBtnOk(false)
            setFakeArray([])
            setFamily([])
        }
    },[quantityInteger])

    useEffect(()=>{
        if(errorCCD){
            setTimeout(()=>{
                setErrorCCD(false)
            },2000)
        }
    },[errorCCD])

    useEffect(()=>{
        setFakeArray(prevArray => {
            const newArray = [];
            for (let i = 0; i < numFields; i++) {
                console.log(i);
                newArray.push(i);
            }
            return newArray;
        });
    },[numFields])
    
    function validateFormCCD(){
        const num = parseInt(quantityInteger);
        if(num > 10 || num < 1 || isNaN(num)) {
            setErrorCCD(true)
            setMsgErrorCCD('Incorrect Number')
        }else{
            setNumFields(parseInt(num))
        }
    }

    //PARA GUARDAR LOS DTAOS EN LA BASE DE DATOS
    async function saveClientDocuments(){
        
        try {

            if(!(quantityInteger)){
                setHasFamilyCheck(false)
                setBirthCertificateCheck(false)
            }

            //setShowSpinnerForCard(true)
            setShowSpinnerForSave(true)
            const customerFinal = {
                "birthCertificate": birthCertificateCheck,
                "passport": passportCheck,
                "proofAddress": proofAddressCheck,
                "marriageCertificate": marriageCertificateCheck,
                "haveFamily": hasFamilyCheck,
                "documentsFamily": family
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            //setShowSpinnerForCard(false)
            setShowSpinnerForSave(false)
            setModal(true)
            setTitle("Saved Succesfully")
            setMessage('Fields are saved')
            setType("success")
        } catch (error) {
            //setShowSpinnerForCard(false)
            setShowSpinnerForSave(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible save')
            setType('error')
        }
        
    }



    
    async function backToProcessSelectionAgain(){
        try {
            setShowSpinnerForBtnBack(true)
            const customerFinal = {
                "birthCertificate": "",
                "passport": "",
                "proofAddress": "",
                "marriageCertificate": "",
                "haveFamily": "",
                "documentsFamily": [],
                "clientDocuments": false,
                "selectionProcess": true
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            setShowSpinnerForBtnBack(false)
            setModal(true)
            setTitle("Returned Succesfully")
            setMessage('It was returned to selection process')
            setType("success")
        } catch (error) {
            setShowSpinnerForBtnBack(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible return to selection process')
            setType('error')
        }
    }


    async function sendClientToGM(){
        try {
            //setShowSpinnerForBtnBack(true)
            setShowSpinnerForSendGM(true)
            const customerFinal = {
                "clientDocuments": false,
                "gmProcess": true
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            //setShowSpinnerForBtnBack(false)
            setShowSpinnerForSendGM(false)
            setModal(true)
            setTitle("Sent Succesfully")
            setMessage('It was sent to GM Process')
            setType("success")
        } catch (error) {
            //setShowSpinnerForBtnBack(false)
            setShowSpinnerForSendGM(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible send to GM Process')
            setType('error')
        }
    }



    /**SON PARA LOS CHECKBOX DE LA SECCION GM PROCESS */
    const [callExplainingCheck,setCallExplainingCheck] = useState(false)
    const [contractAndPaymentPlanCheck,setContractAndPaymentPlanCheck] = useState(false)
    const [documentsFileCheck,setDocumentsFileCheck] = useState(false)
    const [questionnaireDate,setQuestionnaireDate] = useState('')
    const [completeQuestionnaireDate,setCompleteQuestionnaireDate] = useState('')
    const [docsUploadCheck,setDocsUploadCheck] = useState(false)
    const [initialPaymentCheck,setInitialPaymentCheck] = useState(false)
    const [sentToKenyCheck,setSentToKenyCheck] = useState(false)

    const [showBtnSendExcel, setShowBtnSendExcel] = useState(true)


    useEffect(()=>{
        if(callExplaining != "" || contractAndPaymentPlan != "" || documentsFamily != "" || questionnaire != "" || completeQuestionnaire != "" || docsUpload != "" || initialPayment != "" || sentToKeny != "" ){
            setShowmeDataGMProcess(true)
        }else{
            setShowmeFieldsGMProcess(true)
        }
        setCallExplainingCheck(callExplaining == "true" ? true : false)
        setContractAndPaymentPlanCheck(contractAndPaymentPlan == "true" ? true : false)
        setDocumentsFileCheck(documentsFile == "true" ? true : false)
        setQuestionnaireDate(questionnaire.length > 0 ? questionnaire : '')
        setCompleteQuestionnaireDate(completeQuestionnaire.length > 0 ? completeQuestionnaire : '')
        setDocsUploadCheck(docsUpload == "true" ? true : false)
        setInitialPaymentCheck(initialPayment=="true" ? true : false)
        setSentToKenyCheck(sentToKeny=="true" ? true : false)
    },[])

    async function sendToKeny(){
        try {
            setShowSpinnerForExcel(true)
            const {excel} = await fetchUrlPost(`https://api-gw-cpa-pc-20aq.onrender.com/generate-excel/candidate-trade/${_id}`)
            if(excel){
                setShowBtnSendExcel(false)
                setShowSpinnerForExcel(false)
                setModal(true)
                setTitle("Excel File Sent Succesfully")
                setMessage('Excel file sent')
                setType("success")
            }else{
                setShowSpinnerForExcel(false)
                setModal(true)
                setTitle("Could not send excel")
                setMessage('It was not possible send email by email')
                setType("error")
            }
        } catch (error) {
            setShowSpinnerForExcel(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible send email to keny')
            setType('error')
        }
    }


    async function backToClientDocuments(){
        try {
            setShowSpinnerForBtnBack(true)
            const customerFinal = {
                "callExplaining": "",
                "contractAndPaymentPlan": "",
                "documentsFile":"",
                "questionnaire": "",
                "completeQuestionnaire": "",
                "docsUpload": "",
                "initialPayment": "",
                "sentToKeny": "",
                "clientDocuments": true,
                "gmProcess": false
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            setShowSpinnerForBtnBack(false)
            setModal(true)
            setTitle("Returned Succesfully")
            setMessage('It was returned to client documents')
            setType("success")
        } catch (error) {
            setShowSpinnerForBtnBack(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible return to client documents')
            setType('error')
        }
    }


    async function saveGMProcess(){
        try {
            //setShowSpinnerForCard(true)
            setShowSpinnerForSave(true)
            const customerFinal = {
                "callExplaining": callExplainingCheck,
                "contractAndPaymentPlan": contractAndPaymentPlanCheck,
                "documentsFile":documentsFileCheck,
                "completeQuestionnaire": completeQuestionnaireDate,
                "questionnaire": questionnaireDate,
                "docsUpload": docsUploadCheck,
                "initialPayment": initialPaymentCheck,
                "sentToKeny": sentToKenyCheck,
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            //console.log(customerFinal)
            setShowmeFieldsGMProcess(false)
            setShowmeDataGMProcess(true)
            //setShowSpinnerForCard(false)
            setShowSpinnerForSave(false)
            setModal(true)
            setTitle("Saved Succesfully")
            setMessage('Fields are saved')
            setType("success")
        } catch (error) {
            setShowSpinnerForSave(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible save')
            setType('error')
        }
    }
    const [showmeDataGMProcess,setShowmeDataGMProcess] = useState(false)
    const [showmeFieldsGMProcess,setShowmeFieldsGMProcess] = useState(false)

    function showmeDataFields(){
        setShowmeDataGMProcess(false)
        setShowmeFieldsGMProcess(true)
    }


    const [showmeDataCD,setShowmeDataCD] = useState(false)
    const [showmeFieldsCD, setShowmeFieldsCD] = useState(true)
    function showmeDataFieldsCD(){
        setShowmeDataCD(false)
        setShowmeFieldsCD(true)
    }





    return (
        <>
            <div key={_id} className="card-client" /**style={{borderLeft: `3px solid ${generarColorAlegre()}`}}*/>
                <div className="header-cc">
                    <div className="profile-color" style={{background: `${colorProfile}` }}>{fullname[0].toUpperCase()}</div>
                    <div className="titles-header-cc">
                        <h1>{fullname}</h1>
                        <p> 📧  {email}</p>
                        <p> 📱  {phone}</p>
                    </div>
                    {/*
                        birthCertificate == '' && passport == '' && proofAddress == '' ?
                            <span className="label-card-cc-n">Not Filled In</span>
                        :   <span className="label-card-cc-f">Filled In</span>
                    */}
                </div>
                <div className="details-more-cc">
                    <div className="dmcc-position">
                        <div>position</div>
                        <div>{position.substring(0,14)}...</div>
                    </div>
                    <div className="dmcc-level-en">
                        <div>english</div>
                        <div>{englishLevel}</div>
                    </div>
                    <div className="dmcc-level-es">
                        <div>studies</div>
                        <div><p>{levelStudies.substring(0,25)}...</p></div>
                    </div>
                </div>






                    

                    {/*SECTION GM PROCESS, SON LOS CHECKBOXES  HERREEEEEEEEEEEE*/
                        showSpinnerForCard ? <Load/> 
                        : gmp && showmeFieldsGMProcess ?
                        
                            <> 
                                <div className="form-cc">
                                    {   
                                        errorCCD ? <div className="error-ccd">{msgErrorCCD}</div> : <></>
                                    }
                                    <form action="#" className="form-gmprocess">
                                        <fieldset>
                                            <input name="callExplaining" type="checkbox" id={_id} defaultChecked={callExplainingCheck ? true : false} onChange={e => setCallExplainingCheck(e.target.checked) }/>
                                            <label htmlFor="callExplaining">Call Explaining</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="contractAndPaymentPlan" type="checkbox" defaultChecked={contractAndPaymentPlanCheck? true : false} id={_id} onChange={e => setContractAndPaymentPlanCheck(e.target.checked) }/>
                                            <label htmlFor="contractAndPaymentPlan">Contract & Payment</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="documentsFile" type="checkbox" id={_id} defaultChecked={documentsFileCheck ? true : false} onChange={e =>  setDocumentsFileCheck(e.target.checked) } />
                                            <label htmlFor="documentsFile">Documents File</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="questionnaire" className="input-gmprocess" defaultValue={questionnaireDate.length > 0 ? questionnaireDate : ''} type="text" id={_id} placeholder="Questionnaire sent date" onChange={e => setQuestionnaireDate(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <input name="completeQuestionnaire" className="input-gmprocess" defaultValue={completeQuestionnaireDate.length > 0 ? completeQuestionnaireDate : ''} type="text" id={_id} placeholder="Questionnaire complete date" onChange={e => setCompleteQuestionnaireDate(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <input name="docsUpload" type="checkbox" defaultChecked={docsUploadCheck ? true : false} id={_id} onChange={e =>  setDocsUploadCheck(e.target.checked) } />
                                            <label htmlFor="docsUpload">Docs Uploaded</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="initialPayment" type="checkbox" defaultChecked={initialPaymentCheck ? true : false} id={_id} onChange={e =>  setInitialPaymentCheck(e.target.checked) } />
                                            <label htmlFor="initialPayment">Initial payment</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="sentToKeny" type="checkbox" defaultChecked={sentToKenyCheck ? true : false} id={_id} onChange={e =>  setSentToKenyCheck(e.target.checked) } />
                                            <label htmlFor="sentToKeny">Sent to Keny</label>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="actions-cw">
                                    
                                    <button className="btn-back-card" onClick={e => backToClientDocuments()} >{showSpinnerForBtnBack ? <Load/> : <MdOutlineSettingsBackupRestore />}</button>
                                    
                                    
                                    <button onClick={e => saveGMProcess()} className="btn-check-card">{showSpinnerForSave ? <Load/> : <FaSave />}</button>
                                                                    
                                </div>
                            </>

                        :((gmp && showmeDataGMProcess ? 
                            <>
                            
                                <div className="info-documents-card">
                                        <section className="data-me">
                                            <p>My documents</p>
                                            <div className="me-checks">
                                                <div className="me-check">{birthCertificate=="true" ? <FaCheck/> : <IoClose/>}<p>Birth Certificate</p></div>
                                                <div className="me-check">{passport == "true" ? <FaCheck/> : <IoClose/> }<p>Passport</p></div>
                                                <div className="me-check">{proofAddress=="true" ? <FaCheck/> : <IoClose/> }<p>Proof Address</p></div>
                                                <div className="me-check highlight-family">{haveFamily=="true" ? 'With Family' : 'Withouth Family'}</div>
                                            </div>
                                        </section>
                                        {
                                            documentsFamily.length > 0 ?
                                                <section className="data-them">
                                                    <p>Family's documents</p>
                                                    {
                                                        documentsFamily.map((family,idx)=>(
                                                            <div className="familiar">
                                                                <div className="them-check">{family.relationship}</div>
                                                                <div className="them-check">{family.birthCertificate=="true" ? <FaCheck/> : <IoClose/>}<p>Birth Certificate</p></div>
                                                                <div className="them-check">{family.passport == "true" ? <FaCheck/> : <IoClose/> }<p>Passport</p></div>
                                                                <div className="them-check">{family.proofAddress=="true" ? <FaCheck/> : <IoClose/>}<p>Proof Address</p></div>
                                                            </div>
                                                        ))
                                                    }
                                                </section>
                                            : <></>
                                        }
                                        <section className="data-me">
                                            <p>GM Process</p>
                                            <div className="me-checks">
                                                <div className="me-check">{callExplaining=="true" ? <FaCheck/> : <IoClose/>}<p>Call Explaining</p></div>
                                                <div className="me-check">{contractAndPaymentPlan == "true" ? <FaCheck/> : <IoClose/> }<p>Contract & Payment Plan</p></div>
                                                <div className="me-check">{documentsFile=="true" ? <FaCheck/> : <IoClose/> }<p>Documents File</p></div>
                                                <div className="me-check"> <b style={{letterSpacing: "0.05rem",fontWeight: "900", marginRight: "0.5rem"}}>Questionnaire:</b> {questionnaire.length > 0 ? questionnaire : 'No data'}</div>
                                                <div className="me-check"><b style={{letterSpacing: "0.05rem",fontWeight: "900", marginRight: "0.5rem"}}>Complete Questionnaire:</b> {completeQuestionnaire.length > 0 ? completeQuestionnaire : 'No data'}</div>
                                                <div className="me-check">{docsUpload=="true" ? <FaCheck/> : <IoClose/> }<p>Docs upload</p></div>
                                                <div className="me-check">{initialPayment=="true" ? <FaCheck/> : <IoClose/> }<p>Initial payment</p></div>
                                                <div className="me-check">{sentToKeny=="true" ? <FaCheck/> : <IoClose/> }<p>Sent to Keny</p></div>
                                            </div>
                                        </section>
                                </div>
                                <div className="actions-cw">
                                    
                                    <button className="btn-back-card" onClick={e => backToClientDocuments()} >{showSpinnerForBtnBack ? <Load/> : <MdOutlineSettingsBackupRestore />}</button>
                                    {
                                        showBtnSendExcel && sentToKeny != "true" ? <button className="send-excel-to-keny" onClick={e => sendToKeny() }>{showSpinnerForExcel ? <Load/> : <RiFileExcel2Fill /> }</button> :<></>
                                    }
                                    <button className="editar-gm-process" onClick={e => showmeDataFields()}>Editar</button>
                                </div>
                            
                            </>                    
                        :<></>))
                    }
                


































                {
                    showSpinnerForCard ? <Load/>
                    : ( (birthCertificate=="" && passport=="" && proofAddress=="" && haveFamily=="" && documentsFamily.length == 0) ?

                    <>





                        {
                            gmp ? 
                                <> 
                                </>
                            :
                            <>
                                <div className="form-cc">
                                        {
                                            errorCCD ? <div className="error-ccd">{msgErrorCCD}</div> : <></>
                                        }
                                        <form action="#">
                                            <fieldset>
                                                <input name="birthCertificate" type="checkbox" id={_id} onChange={e => setBirthCertificateCheck(e.target.checked) }/>
                                                <label htmlFor="birthCertificate">Birth Certificate</label>
                                            </fieldset>
                                            <fieldset>
                                                <input name="passport" type="checkbox" id={_id} onChange={e => setPassportCheck(e.target.checked) }/>
                                                <label htmlFor="passport">Passport</label>
                                            </fieldset>
                                            <fieldset>
                                                <input name="proofAddress" type="checkbox" id={_id} onChange={e =>  setProofAddressCheck(e.target.checked) } />
                                                <label htmlFor="proofAddress">Proof Address</label>
                                            </fieldset>
                                        </form>
                                        <div className="family-data">
                                            <fieldset>
                                                <input name="haveFamily" type="checkbox" id={_id} onChange={e => setHasFamilyCheck(e.target.checked) } />
                                                <label htmlFor="haveFamily">Have family?</label>
                                            </fieldset>
                                            {
                                                hasFamilyCheck ? 
                                                    <>
                                                        <fieldset>
                                                            <input name="marriageCertificate" type="checkbox" id={_id} onChange={e => setMarriageCertificateCheck(e.target.checked)} />
                                                            <label htmlFor="marriageCertificate">Marriage Certificate</label>
                                                        </fieldset>
                                                        <fieldset>
                                                            <label htmlFor="quantityInteger">How many are they?</label>
                                                            <input name="quantityInteger" type="number" id={_id} min="1" max="10" onChange={e => setQuantityInteger(e.target.value)} />
                                                        </fieldset>
                                                    </>
                                                :<></>
                                            }
                                            {
                                                showBtnOk ? <button onClick={e => validateFormCCD()} className="confirm-num-family">ok</button> : <></>
                                            }
                                        </div>
                                        <div className="data-checkbox-family">
                                            {
                                                fakeArray.length > 0 ? 
                                                    fakeArray.map((num,id) => (
                                                        <ItemFamiliar key={id} setErrorCCD={setErrorCCD} setMsgErrorCCD={setMsgErrorCCD} setFamily={setFamily} family={family}/>
                                                    )) 
                                                : <></>
                                            }
                                        </div>
                                </div>
                                <div className="actions-cw">
                                    
                                    <button className="btn-back-card" onClick={e => backToProcessSelectionAgain()} >{showSpinnerForBtnBack ? <Load/> : <MdOutlineSettingsBackupRestore />}</button>
                                    <button onClick={e => saveClientDocuments()} className="btn-check-card">{showSpinnerForSave ? <Load color="#e1e1e1"/> : <FaSave />}</button>
                                                                      
                                </div>
                            </>
                        }





                    </>
                    
                    : (birthCertificate != "" || passport != "" || proofAddress != "" || haveFamily != "" || documentsFamily.length != 0 ? 
                        <>
                            {
                               gmp ? 
                               <>
                                    
                               </>
                               :
                               <>
                                    <div className="info-documents-card">
                                        <section className="data-me">
                                            <p>Me</p>
                                            <div className="me-checks">
                                                <div className="me-check">{birthCertificate=="true" ? <FaCheck/> : <IoClose/>}<p>Birth Certificate</p></div>
                                                <div className="me-check">{passport == "true" ? <FaCheck/> : <IoClose/> }<p>Passport</p></div>
                                                <div className="me-check">{proofAddress=="true" ? <FaCheck/> : <IoClose/> }<p>Proof Address</p></div>
                                                <div className="me-check highlight-family">{haveFamily=="true" ? 'With Family' : 'Withouth Family'}</div>
                                                <div className="me-check">{marriageCertificate == "true" ? <FaCheck/> : <IoClose/> }<p>marriageCertificate</p></div>
                                            </div>
                                        </section>
                                        {
                                            documentsFamily.length > 0 ?
                                                <section className="data-them">
                                                    <p>Family</p>
                                                    {
                                                        documentsFamily.map((family,idx)=>(
                                                            <div className="familiar">
                                                                <div className="them-check">{family.relationship}</div>
                                                                <div className="them-check">{family.birthCertificate=="true" ? <FaCheck/> : <IoClose/>}<p>Birth Certificate</p></div>
                                                                <div className="them-check">{family.passport == "true" ? <FaCheck/> : <IoClose/> }<p>Passport</p></div>
                                                                <div className="them-check">{family.proofAddress=="true" ? <FaCheck/> : <IoClose/>}<p>Proof Address</p></div>
                                                            </div>
                                                        ))
                                                    }
                                                </section>
                                            : <></>
                                        }
                                    </div>
                                    <div className="actions-cw">
                                         
                                        <button className="btn-back-card" onClick={e => backToProcessSelectionAgain()} >{showSpinnerForBtnBack ? <Load/> : <MdOutlineSettingsBackupRestore /> }</button>
                                        
                                        <button className="btn-send-gm" onClick={e => sendClientToGM()} >{showSpinnerForSendGM ? <Load/> : <BsFillSendCheckFill />}</button>
                                    </div>
                               </> 
                            }
                        </>
                    :<></>))
                }
                






                





            </div>
        </>
    )
}

export default CardWorker