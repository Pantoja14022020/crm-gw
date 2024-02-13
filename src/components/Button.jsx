import Load from './Load'
import { FaPlus } from "react-icons/fa6";

function Button({txt,fn,type="",showSpinner,size,marginTop, show, iconAdd, colorIcon}){

    return(
        <button id="button" onClick={fn} type={type} style={{width: size,marginTop: marginTop}}>
            
            {
                iconAdd ? <FaPlus color={colorIcon} style={{marginRight:'1rem'}}/> : <></>
            }

            {
                showSpinner ? 
                  <Load/>
                : txt
            }
            
        </button>
    )
}

export default Button;