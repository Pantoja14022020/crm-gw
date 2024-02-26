import Icon from "./Icon";

function ActionBar({actions,optionEdit,fn}){


    return(
        <div className="actions-bar animate__animated animate__slideInUp">
            {
                actions.map(({id,icon,nameClass}) => (
                    <button key={id} className={nameClass}>{icon}</button>
                ))
            }
            {
                optionEdit ? 
                    <button onClick={fn} className="edit-pre"><Icon name="edit" size="1rem" color='#fff'/></button>
                : <></>
            }
        </div>
    )
}

export default ActionBar;