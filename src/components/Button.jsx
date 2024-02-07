import { useState } from "react";

function Button({txt,fn}){

    return(
        <button id="button" onClick={fn}>
            {txt}
        </button>
    )
}

export default Button;