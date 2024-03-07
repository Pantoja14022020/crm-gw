import { useState } from "react";

function Td({txt, optionMore,highlightTT, highlightTG, highlightAC}){

    const [more,setMore] = useState(false);
    
    const handleClick = () => {
        setMore(!more)
    };

    return (
        <>
            {
                optionMore 
                ? <td onClick={handleClick} style={{backgroundColor: `${more ? '#ecf0ff' : ''}`, cursor: 'pointer'}}>{more ? txt : `${txt.substring(0,5)}...`} <p>{more ? 'Less' : 'See more'}</p> </td>
                : <td><b className={`${highlightTG ? 'testGorila' : (highlightAC ? 'applicationCv': (highlightTT ? 'tipoTrabajo' : ''))}`} >{txt}</b></td>
            }
        </>
    )
}

export default Td;