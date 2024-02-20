import { GrFormNext } from "react-icons/gr";

function BarStatus({stages,effect}){
    return(
        <nav className={`barStatus ${effect}`}>
            <ul>
                {
                    stages.map(({id,title,description,paint,end,icon})=> (
                        <li key={id} className={paint ? 'painted' : ''}>
                            <p>{title}</p>
                            {
                                !end ? <div><GrFormNext size="1rem" /></div> : <></>
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default BarStatus;