export default function Option({icon,txt,idx}){
    return(
        <button id={idx} className="option-navbar">
            <i>{icon}</i>
            <p>{txt}</p>
        </button>
    )
}