import { useEffect, useState } from "react";
import ItemFamiliar from "./ItemFamiliar";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Load from "./Load";
import { fetchUrlPut } from "../helpers/fetchs";

function CardWorker({gmp,type,setType,title,setTitle,message,setMessage,modal,setModal,_id,getPrecandidates,fullname,phone,email,position,englishLevel,levelStudies,birthCertificate,passport,proofAddress,haveFamily,documentsFamily,colorProfile,callExplaining,contractAndPaymentPlan,documentsFile,questionnaire,completeQuestionnaire,docsUpload,initialPayment,sentToKeny}){
    
    //ESTOS SON LOS USE STATE PARA LOS CHECKBOX DEL CLIENTDOCUMENTS.JSX
    const [birthCertificateCheck,setBirthCertificateCheck] = useState(false)
    const [passportCheck,setPassportCheck] = useState(false)
    const [proofAddressCheck, setProofAddressCheck] = useState(false)
    const [hasFamilyCheck,setHasFamilyCheck] = useState(false)
    const [quantityInteger, setQuantityInteger] = useState(0)
    const [showBtnOk,setShowBtnOk] = useState(true)
    const [errorCCD, setErrorCCD] = useState(false)
    const [msgErrorCCD,setMsgErrorCCD] = useState('')
    const [numFields,setNumFields] = useState(0);
    const [fakeArray, setFakeArray] = useState([])
    const [family,setFamily] = useState([])
    const [showSpinnerForCard, setShowSpinnerForCard] = useState(false)
    const [showSpinnerForBtnBack,setShowSpinnerForBtnBack] = useState(false)

    useEffect(()=>{
        if(!hasFamilyCheck){
            setQuantityInteger('')
            setShowBtnOk(false)
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
            setShowSpinnerForCard(true)
            const customerFinal = {
                "birthCertificate": birthCertificateCheck,
                "passport": passportCheck,
                "proofAddress": proofAddressCheck,
                "haveFamily": hasFamilyCheck,
                "documentsFamily": family
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            setShowSpinnerForCard(false)
            setModal(true)
            setTitle("Saved Succesfully")
            setMessage('Fields are saved')
            setType("success")
        } catch (error) {
            setShowSpinnerForCard(false)
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
            setShowSpinnerForBtnBack(true)
            const customerFinal = {
                "clientDocuments": false,
                "gmProcess": true
            }
            const promesas = await fetchUrlPut(`https://api-gw-cpa-pc-20aq.onrender.com/tl/excel/candidate/${_id}`,customerFinal)
            await getPrecandidates()
            setShowSpinnerForBtnBack(false)
            setModal(true)
            setTitle("Sent Succesfully")
            setMessage('It was sent to GM Process')
            setType("success")
        } catch (error) {
            setShowSpinnerForBtnBack(false)
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
            setShowSpinnerForCard(true)
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
            setShowSpinnerForCard(false)
            setModal(true)
            setTitle("Saved Succesfully")
            setMessage('Fields are saved')
            setType("success")
        } catch (error) {
            setShowSpinnerForCard(false)
            setModal(true)
            setTitle('Error In Server')
            setMessage('Its not was posible save')
            setType('error')
        }
    }
    const [showmeDataGMProcess,setShowmeDataGMProcess] = useState(false)



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
                        : gmp && (callExplaining == "" && contractAndPaymentPlan == "" && documentsFile == "" && questionnaire == "" && docsUpload == "" && initialPayment == "" && sentToKeny == "" ) ?
                        
                            <> 
                                <div className="form-cc">
                                    {   
                                        errorCCD ? <div className="error-ccd">{msgErrorCCD}</div> : <></>
                                    }
                                    <form action="#" className="form-gmprocess">
                                        <fieldset>
                                            <input name="callExplaining" type="checkbox" id={_id} onChange={e => setCallExplainingCheck(e.target.checked) }/>
                                            <label htmlFor="callExplaining">Call Explaining</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="contractAndPaymentPlan" type="checkbox" id={_id} onChange={e => setContractAndPaymentPlanCheck(e.target.checked) }/>
                                            <label htmlFor="contractAndPaymentPlan">Contract & Payment</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="documentsFile" type="checkbox" id={_id} onChange={e =>  setDocumentsFileCheck(e.target.checked) } />
                                            <label htmlFor="documentsFile">Documents File</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="questionnaire" className="input-gmprocess" type="text" id={_id} placeholder="Questionnaire sent date" onChange={e => setQuestionnaireDate(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <input name="completeQuestionnaire" className="input-gmprocess" type="text" id={_id} placeholder="Questionnaire complete date" onChange={e => setCompleteQuestionnaireDate(e.target.value)} />
                                        </fieldset>
                                        <fieldset>
                                            <input name="docsUpload" type="checkbox" id={_id} onChange={e =>  setDocsUploadCheck(e.target.checked) } />
                                            <label htmlFor="docsUpload">Docs Uploaded</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="initialPayment" type="checkbox" id={_id} onChange={e =>  setInitialPaymentCheck(e.target.checked) } />
                                            <label htmlFor="initialPayment">Initial payment</label>
                                        </fieldset>
                                        <fieldset>
                                            <input name="sentToKeny" type="checkbox" id={_id} onChange={e =>  setSentToKenyCheck(e.target.checked) } />
                                            <label htmlFor="sentToKeny">Sent to Keny</label>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="actions-cw">
                                    {   //HEREEEEEEEEEEEEEEEEEEEEEEEEE
                                        showSpinnerForBtnBack ? <Load/> : 
                                            <button className="btn-back-card" onClick={e => backToClientDocuments()} ><MdOutlineSettingsBackupRestore /></button>
                                    }
                                    {
                                        showSpinnerForBtnBack ? <Load/> :
                                            <button onClick={e => saveGMProcess()} className="btn-check-card"><FaSave /></button>
                                    }                                    
                                </div>
                            </>

                        :((gmp && (callExplaining != "" || contractAndPaymentPlan != "" || documentsFile != "" || questionnaire != "" || docsUpload != "" || initialPayment != "" || sentToKeny != "" ) ? 
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
                                    {   //HEREEEEEEEEEEEEEEEEEEEEEEEEE
                                        showSpinnerForBtnBack ? <Load/> : 
                                            <button className="btn-back-card" onClick={e => backToClientDocuments()} ><MdOutlineSettingsBackupRestore /></button>
                                    }
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
                                                    <fieldset>
                                                        <label htmlFor="quantityInteger">How many are they?</label>
                                                        <input name="quantityInteger" type="number" id={_id} min="1" max="10" onChange={e => setQuantityInteger(e.target.value)} />
                                                    </fieldset>
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
                                    {
                                        showSpinnerForBtnBack ? <Load/> : 
                                            <button className="btn-back-card" onClick={e => backToProcessSelectionAgain()} ><MdOutlineSettingsBackupRestore /></button>
                                    }
                                    {
                                        showSpinnerForBtnBack ? <Load/> :
                                            <button onClick={e => saveClientDocuments()} className="btn-check-card"><FaSave /></button>
                                    }                                    
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
                                        {
                                            showSpinnerForBtnBack ? <Load/> : 
                                                <button className="btn-back-card" onClick={e => backToProcessSelectionAgain()} ><MdOutlineSettingsBackupRestore /></button>
                                        }
                                        <button className="btn-send-gm" onClick={e => sendClientToGM()} ><BsFillSendCheckFill /></button>
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