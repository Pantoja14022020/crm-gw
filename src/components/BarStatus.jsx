function BarStatus({stages}){
    return(
        <nav className="barStatus">
            <ul>
                {
                    stages.map(({id,title,description,paint})=> (
                        <li key={id} className={paint ? 'painted' : ''}>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default BarStatus;