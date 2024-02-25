import { useState } from "react";

function Td({txt, optionMore}){

    const [more,setMore] = useState(false);
    
    const handleClick = () => {
        setMore(!more)
    };

    return (
        optionMore 
        ? <td style={{backgroundColor: `${more ? '#ecf0ff' : ''}`}}>{more ? txt : `${txt.substring(0,5)}...`} <p onClick={handleClick}>{more ? 'Less' : 'See more'}</p> </td>
        : <td>{txt}</td>
    )
}

export default Td;