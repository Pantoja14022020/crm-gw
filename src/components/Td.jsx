import { useState } from "react";

function Td({txt, optionMore}){

    const [more,setMore] = useState(false);
    
    const handleClick = () => {
        setMore(!more)
    };

    return (
        optionMore 
        ? <td>{more ? txt : `${txt.substring(0,5)}...`} <p onClick={handleClick}>{more ? 'Least' : 'See more'}</p> </td>
        : <td>{txt}</td>
    )
}

export default Td;