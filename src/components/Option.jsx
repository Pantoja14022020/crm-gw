import Icon from './Icon'

function Option({options}){
    return(
        <ul className='modal-options'>
            {
                options.map(({id,txt,icon,fn})=> (
                    <li key={id} onClick={fn}><Icon type="icon" name={icon} width="40px" height="40px"/><p>{txt}</p></li>
                ))
            }
        </ul>
    )
} 

export default Option;