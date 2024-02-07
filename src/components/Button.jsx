import { useState } from "react";

function Button({txt,fn,type=""}){

    return(
        <button id="button" onClick={fn} type={type}>
            {txt}
        </button>
    )
}

export default Button;