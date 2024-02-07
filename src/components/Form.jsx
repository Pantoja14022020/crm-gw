import ButtonForm from "./ButtonForm"

function Form({action,method,fieldsets,txtButtonSubmit}){
    return(
        <form action={action} method={method}>
            {
                fieldsets.map(({id,name,type,htmlfor,txt})=>(
                    <fieldset key={id}>
                        <label htmlFor={htmlfor}>{txt}</label>
                        <input type={type} name={name} id={id}/>
                    </fieldset>
                ))
            }
            <fieldset>
                <ButtonForm txt={txtButtonSubmit}/>
            </fieldset>
        </form>
    )
}

export default Form