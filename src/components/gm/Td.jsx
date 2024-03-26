import { useState } from "react";

function Td({fontSize,padding,textAlign,txt,split=false,numberLetters}){
 
    const [more,setMore] = useState(false)

    return(
        <>
            {
                split ? //En el props se paso que si se quiere quitar fragemento del texto para mostra el boton de 'mas'
                    <>
                        {
                            txt.length > 0 && txt.length != numberLetters 
                            ? <td style={{fontSize,padding,textAlign}}>{ more ? <>{txt}<p style={{display: "inline-block", marginLeft: '0.5rem'}} onClick={ e => setMore(false)}>Less</p></> : <>{txt.substring(0,numberLetters)}<p style={{display: "inline-block", marginLeft: '0.5rem'}} onClick={ e => setMore(true)}>More</p></> }</td>
                            : <td style={{fontSize,padding,textAlign}}>{txt}</td>
                        }
                    </>
                :   <td style={{fontSize,padding,textAlign}}>{txt}</td>
            }
        </>
    )
}
export default Td;