import Icon from "./Icon";

function ActionBar({actions,optionEdit,showFormEditPre,sectionSelectedTLU,confirmationStageToGI}){

    return(
        <div className="actions-bar animate__animated animate__slideInUp">
            {
                actions.map(({id,icon,nameClass,fn}) => (
                    <button onClick={e => fn()} key={id} className={nameClass}>{icon}</button>
                ))
            }
            {
                optionEdit ? 
                    <button onClick={showFormEditPre} className="edit-pre"><Icon name="edit" size="1rem" color='#fff'/></button>
                : <></>
            }
            {
                sectionSelectedTLU == 'pr' ?
                    <button onClick={confirmationStageToGI} className="edit-pre"><Icon type="icon" name="back" color="#fff"/></button>
                : <></>
            }
        </div>
    )
}

export default ActionBar;