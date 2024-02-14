export default function Option({icon,txt,fn,idx}){
    return(
        <button id={idx} className="option-navbar" onClick={fn}>
            <i>{icon}</i>
            <p>{txt}</p>
        </button>
    )
}