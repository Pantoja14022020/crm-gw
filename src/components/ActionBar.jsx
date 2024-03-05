import Icon from "./Icon";

function ActionBar({optionEdit,showFormEditPre,sectionSelectedTLU,confirmationStageToGI,confirmationStageProcessRecruitment}){

    return(
        <div className="actions-bar animate__animated animate__slideInUp">
            {
                sectionSelectedTLU == 'gi' ? 
                    <button onClick={confirmationStageProcessRecruitment} className="done-pre"><Icon name="ready" size="1rem" color="#fff"/></button>
                :<></>
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