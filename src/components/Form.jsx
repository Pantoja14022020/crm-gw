import Button from "./Button"
import SelectDefault from "./SelectDefault"


function Form({flexDirection,widthFieldset,widthForm,action,method,fieldsets,txtButtonSubmit,fnSubmit,fnChange,showSpinner,reform, setGender, setLevelEnglish}){
    

    
    return(
        <form style={{width: `${widthForm !== '' ? widthForm : '300px'}`, alignItems: `${flexDirection === 'row' ? 'center' : ''}`, justifyContent: `${flexDirection === 'row' ? 'space-between' : ''}` , display: 'flex', flexDirection: `${flexDirection == 'row' ? 'row' : 'column'}`,  flexWrap: `${flexDirection == 'row' ? 'wrap' : ''}`}} action={action} method={method} onSubmit={fnSubmit} autoComplete="off" ref={reform}>
            {
                fieldsets.map(({id,name,type,htmlfor,txt,options})=>(
                    <fieldset key={id} style={{width: `${widthFieldset}`}}>
                        {
                            type != 'select' ? 
                                <>
                                    <label htmlFor={htmlfor}>{txt}</label>
                                    <input type={type} name={name} id={id} onChange={fnChange} style={{ WebkitAutofill: 'none', autocomplete: 'off' }}/>
                                </>
                            : (name == 'gender' ? <SelectDefault options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setGender}/>
                                : ( name === 'englishLevel' ? <SelectDefault options={options} title={txt} fontSize="0.8rem" color="var(--input-color-secondary)" setParam={setLevelEnglish}/>
                                    : <></>))
                        }
                    </fieldset>
                ))
            }
            <fieldset>
                <Button txt={txtButtonSubmit} type="submit" showSpinner={showSpinner} size="100%" marginTop="1rem" />
            </fieldset>
        </form>
    )
}

export default Form