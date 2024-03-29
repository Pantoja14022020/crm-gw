import { useEffect, useState } from "react";
import Button from "./Button"
import SelectDefault from "./SelectDefault"
import Radio from "./Radio";


function Form({valueEditContratoReclutamiento,flexDirection,widthFieldset,widthForm,action,method,fieldsets,txtButtonSubmit,fnSubmit,fnChange,showSpinner,reform, setGender, setLevelEnglish, setCivilStatus,setLevelStudies,precandidateSelected,setParamDefault,tipoTrabajo,setTipoTrabajo,applicationCv, setApplicationCv,valueEditTipoTrabajo,status,setStatus,/*methodContact,setMethodContact,*/interviewed,setInterviewed,valueEditStatus,valueEditMethodContact,valueEditInterviewed,valueEditApplicationCv, setContratoReclutamiento, contratoReclutamiento}){
   
    //console.log(precandidateSelected)
    
    //const {personalityTest,testGorila,contratoReclutamiento} = precandidateSelected;
    
    

    return(
        <form style={{width: `${widthForm !== '' ? widthForm : '300px'}`, alignItems: `${flexDirection === 'row' ? 'center' : ''}`, justifyContent: `${flexDirection === 'row' ? 'space-between' : ''}` , display: 'flex', flexDirection: `${flexDirection == 'row' ? 'row' : 'column'}`,  flexWrap: `${flexDirection == 'row' ? 'wrap' : ''}`}} action={action} method={method} onSubmit={fnSubmit} autoComplete="off" ref={reform}>
            {
                fieldsets.map(({id,name,type,htmlfor,txt,options,value})=>(
                    <fieldset key={id} style={{width: `${widthFieldset}`}}>
                        {
                            name == 'testGorila' ?
                            <>
                                <label htmlFor={id} style={{display: `${tipoTrabajo == 'Profesión' ? '' : 'none'}`}}>{txt}</label>
                                <input defaultValue={precandidateSelected.testGorila != null ? precandidateSelected.testGorila : ''}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off', display: `${tipoTrabajo == 'Profesión' ? '' : 'none'}` }}/>
                            </>
                            : <></>
                        }
                        {
                            /*name == 'contratoReclutamiento' ?
                            <>
                                <label htmlFor={id} style={{display: `${tipoTrabajo == 'Oficio' ? '' : 'none'}`}}>{txt}</label>
                                <input defaultValue={precandidateSelected.contratoReclutamiento != null ? precandidateSelected.contratoReclutamiento : ''}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off', display: `${tipoTrabajo == 'Oficio' ? '' : 'none'}` }}/>
                            </>
                            :<></>*/
                        }
                        {
                            name == 'personalityTest' ?
                            <>
                                <label htmlFor={id}>{txt}</label>
                                <input defaultValue={ precandidateSelected.personalityTest != null ? precandidateSelected.personalityTest : ''}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                            </>
                            :<></>
                        }
                        {
                            name == 'employer' ?
                            <>
                                <label htmlFor={id}>{txt}</label>
                                <input defaultValue={ precandidateSelected.employer != null ? precandidateSelected.employer : ''}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                            </>
                            :<></>
                        }
                        {
                            name == 'referred' ?
                            <>
                                <label htmlFor={id}>{txt}</label>
                                <input defaultValue={ precandidateSelected.referred != null ? precandidateSelected.referred : ''}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                            </>
                            :<></>
                        }
                        {
                            type != 'select' && type != 'radio' && name != 'testGorila' && name != 'contratoReclutamiento' && name != 'personalityTest' && name != 'employer' && name != 'referred'? 
                                <>
                                    <label htmlFor={id}>{txt}</label>
                                    <input defaultValue={value}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                                </>
                            : (name == 'gender' ? <><label htmlFor={id}>{txt}</label><SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setGender} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                : ( name === 'englishLevel' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setLevelEnglish} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                    : (name === 'civilStatus' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setCivilStatus} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                        : (name === 'levelStudies' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setLevelStudies} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                            : (name === 'tipoTrabajo' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setTipoTrabajo} setParamDefaultEdit={setParamDefault} valueDefault={valueEditTipoTrabajo} precandidateSelected={precandidateSelected}/></>
                                                : (name == 'status' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setStatus} setParamDefaultEdit={setParamDefault} valueDefault={valueEditStatus} precandidateSelected={precandidateSelected}/></>
                                                    : (name == 'methodContact' ? <>{/**<label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setMethodContact} setParamDefaultEdit={setParamDefault} valueDefault={valueEditMethodContact} precandidateSelected={precandidateSelected}/>*/}</>
                                                        :(name == 'interviewed' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={`---- Select ----`} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setInterviewed} setParamDefaultEdit={setParamDefault} valueDefault={valueEditInterviewed} precandidateSelected={precandidateSelected}/></>
                                                            : (name == 'applicationCv' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={`---- Select ----`} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setApplicationCv} setParamDefaultEdit={setParamDefault} valueDefault={valueEditApplicationCv} precandidateSelected={precandidateSelected}/></>
                                                                :( name == 'contratoReclutamiento' ? (tipoTrabajo == 'Oficio' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={`---- Select ----`} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setContratoReclutamiento} setParamDefaultEdit={setParamDefault} valueDefault={valueEditContratoReclutamiento} precandidateSelected={precandidateSelected}/></> : <></>)  
                                                                    : <></>))))))))))
                        }
                        {
                            type == 'radio' ? 
                                <><label>{txt}</label><Radio defaultChecked={precandidateSelected.applicationCv ? precandidateSelected.applicationCv : '' } radiosOptions={options} name={name} valueRadio={applicationCv} setValueRadio={setApplicationCv}/></>
                            :<></>
                        }
                    </fieldset>
                ))
            }


            <fieldset>
                <Button txt={txtButtonSubmit} type="submit" showSpinner={showSpinner} size="100%" marginTop="1rem" bgColor="#2020cc" color="#fff"/>
            </fieldset>
        </form>
    )
}

export default Form