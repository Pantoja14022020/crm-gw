import { GrFormNext } from "react-icons/gr";

function BarStatus({sections, sectionSelectedTLU, setSectionSelectedTLU}){
    return(
        <nav className={`barStatus`}>
            <ul>
                {
                    sections.map(({id,title,paint,name})=> (
                        <li onClick={e => setSectionSelectedTLU(name)} key={id} className={sectionSelectedTLU === name ? 'painted' : ''}>
                            <p>{title}</p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default BarStatus;