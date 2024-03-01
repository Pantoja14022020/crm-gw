import Icon from './Icon'

function Option({options, showTitle, txtTitle}){
    return(
        <ul className='modal-options'>
            {
                showTitle ? <h1 style={{marginBottom: "0.5rem", letterSpacing: "0.05rem"}}>{  txtTitle}</h1> : <></>
            }
            {
                options.map(({id,txt,icon,fn,fechaAccion,status},idx)=> (
                    <li key={idx} onClick={fn}><Icon type="icon" name={icon} width="40px" height="40px" color="#266b30"/>{status ? <b className='label-notify'>New</b> : <></>}<p>{txt}</p><p>{fechaAccion}</p></li>
                ))
            }
        </ul>
    )
} 

export default Option;