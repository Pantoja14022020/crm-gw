import Load from './Load'

function Button({txt,fn,type="",showSpinner,size,marginTop}){

    return(
        <button id="button" onClick={fn} type={type} style={{width: size,marginTop: marginTop}}>
            
            {
                showSpinner ? 
                  <Load/>
                : txt
            }
            
        </button>
    )
}

export default Button;