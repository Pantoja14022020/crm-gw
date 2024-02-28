import { useEffect, useState } from "react";
import Button from "./Button"
import SelectDefault from "./SelectDefault"


function Form({flexDirection,widthFieldset,widthForm,action,method,fieldsets,txtButtonSubmit,fnSubmit,fnChange,showSpinner,reform, setGender, setLevelEnglish, setCivilStatus,setLevelStudies,precandidateSelected,setParamDefault}){
   
    //console.log(precandidateSelected)
    
    return(
        <form style={{width: `${widthForm !== '' ? widthForm : '300px'}`, alignItems: `${flexDirection === 'row' ? 'center' : ''}`, justifyContent: `${flexDirection === 'row' ? 'space-between' : ''}` , display: 'flex', flexDirection: `${flexDirection == 'row' ? 'row' : 'column'}`,  flexWrap: `${flexDirection == 'row' ? 'wrap' : ''}`}} action={action} method={method} onSubmit={fnSubmit} autoComplete="off" ref={reform}>
            {
                fieldsets.map(({id,name,type,htmlfor,txt,options,value})=>(
                    <fieldset key={id} style={{width: `${widthFieldset}`}}>
                        {
                            type != 'select' ? 
                                <>
                                    <label htmlFor={id}>{txt}</label>
                                    <input defaultValue={value}  type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                                </>
                            : (name == 'gender' ? <><label htmlFor={id}>{txt}</label><SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setGender} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                : ( name === 'englishLevel' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setLevelEnglish} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                    : (name === 'civilStatus' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setCivilStatus} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                        : (name === 'levelStudies' ? <><label htmlFor={id}>{txt}</label> <SelectDefault width="100%" options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setLevelStudies} setParamDefaultEdit={setParamDefault} valueDefault={value} precandidateSelected={precandidateSelected}/></>
                                            : <></>))))
                        }
                    </fieldset>
                ))
            }
            <fieldset>
                <Button txt={txtButtonSubmit} type="submit" showSpinner={showSpinner} size="100%" marginTop="1rem" bgColor="#2020cc" />
            </fieldset>
        </form>
    )
}

export default Form