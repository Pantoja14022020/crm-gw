import Button from "./Button"

function Form({action,method,fieldsets,txtButtonSubmit,fnSubmit,fnChange}){
    return(
        <form action={action} method={method} onSubmit={fnSubmit}>
            {
                fieldsets.map(({id,name,type,htmlfor,txt})=>(
                    <fieldset key={id}>
                        <label htmlFor={htmlfor}>{txt}</label>
                        <input type={type} name={name} id={id} onChange={fnChange}/>
                    </fieldset>
                ))
            }
            <fieldset>
                <Button txt={txtButtonSubmit} type="submit"/>
            </fieldset>
        </form>
    )
}

export default Form