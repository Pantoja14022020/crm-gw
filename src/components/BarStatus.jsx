import { GrFormNext } from "react-icons/gr";

function BarStatus({sections, sectionSelected, setSectionSelected, setParamEnglishLevel, setParamStudiesLevel}){
    return(
        <nav className={`barStatus`}>
            <ul>
                {
                    sections.map(({id,title,paint,name})=> (
                        <li onClick={e => setSectionSelected(name)} key={id} className={sectionSelected === name ? 'painted' : ''}>
                            <p>{title}</p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default BarStatus;