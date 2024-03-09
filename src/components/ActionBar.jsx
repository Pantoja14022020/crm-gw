import Icon from "./Icon";

function ActionBar({optionEdit,showFormEditPre,sectionSelectedTLU,confirmationStageToGI,confirmationStageProcessRecruitment,showFormProcessSelection,confirmationSubsectionPR,setTrueShowCardInfoCandidate}){

    return(
        <div className="actions-bar animate__animated animate__slideInUp">
            {
                sectionSelectedTLU == 'gi' ? 
                    <button onClick={confirmationStageProcessRecruitment} className="done-pre"><Icon name="ready" size="1rem" color="#fff"/></button>
                :<></>
            }
            {
                optionEdit && sectionSelectedTLU == 'gi' ? //Boton de editar precandidato para la subseccion information general
                    <button onClick={showFormEditPre} className="edit-pre"><Icon name="edit" size="1rem" color='#fff'/></button>
                : <></>
            }
            {
                optionEdit && sectionSelectedTLU == 'pr' ? //Boton de editar precandidato para la subseccion process recruitment
                    <button onClick={showFormEditPre} className="edit-pre"><Icon name="edit" size="1rem" color='#fff'/></button>
                : <></>
            }
            {
                sectionSelectedTLU == 'pr' ?
                    <button onClick={confirmationStageToGI} className="edit-pre"><Icon type="icon" name="back" color="#fff"/></button>
                : <></>
            }
            {
                optionEdit && sectionSelectedTLU == 'sp' ? 
                    <button onClick={showFormProcessSelection} className="edit-pre"><Icon name="edit" size="1rem" color='#fff'/></button>
                : <></>
            }
            {
                sectionSelectedTLU == 'sp' ?
                    <button onClick={confirmationSubsectionPR} className="edit-pre"><Icon type="icon" name="back" color="#fff"/></button>
                : <></>
            }
            {
                optionEdit && sectionSelectedTLU == 'sp' ? 
                    <button onClick={setTrueShowCardInfoCandidate} className="edit-pre"><Icon type="icon" name="see" size="1rem" color='#fff'/></button>
                : <></>
            }
        </div>
    )
}

export default ActionBar;