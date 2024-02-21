
function ActionBar({actions}){
    return(
        <div className="actions-bar animate__animated animate__slideInUp">
            {
                actions.map(({id,icon,nameClass}) => (
                    <button key={id} className={nameClass}>{icon}</button>
                ))
            }
        </div>
    )
}

export default ActionBar;