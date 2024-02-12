import Button from "./Button"


function Form({action,method,fieldsets,txtButtonSubmit,fnSubmit,fnChange,showSpinner}){
    return(
        <form action={action} method={method} onSubmit={fnSubmit} autoComplete="off">
            {
                fieldsets.map(({id,name,type,htmlfor,txt})=>(
                    <fieldset key={id}>
                        <label htmlFor={htmlfor}>{txt}</label>
                        <input type={type} name={name} id={id} onChange={fnChange}/>
                    </fieldset>
                ))
            }
            <fieldset>
                <Button txt={txtButtonSubmit} type="submit" showSpinner={showSpinner} size="100%" marginTop="1rem"/>
            </fieldset>
        </form>
    )
}

export default Form