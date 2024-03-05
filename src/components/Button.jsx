import Load from './Load'
import { FaPlus } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import Icon from './Icon';


function Button({fontSize,txt,fn,type="",showSpinner,size,marginTop, marginRight,show, iconAdd,colorIcon,color, bgColor, iconRefresh}){

    return(

        <button id="button" onClick={fn} type={type} style={{marginRight:marginRight,width: size,marginTop: marginTop,color: color, backgroundColor: bgColor, fontSize: `${iconRefresh ? '0.6rem' : (fontSize ? fontSize : '')}`}}>
            
            {
                iconAdd ? <FaPlus color={colorIcon} style={{marginRight:'1rem'}}/> : <></>
            }
            {
                iconRefresh ? <RxUpdate color={colorIcon} style={{marginRight:'1rem', fontSize: '1rem'}} /> : <></>
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