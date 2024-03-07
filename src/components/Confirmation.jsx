import Button from "./Button";

function Confirmation({showSpinner, cancel, ok, txtTitleConfirmationAction, txtConfirmationAction}){

    return(
        <div className="confirmation animate__animated animate__bounceInRight">
            <h1>{txtTitleConfirmationAction}</h1>
            <p>{txtConfirmationAction}</p>
            <div className="btns-confirmation">
                <Button marginRight="1rem" txt="Cancel" bgColor="#000" color="#fff" fontSize="0.7rem" fn={cancel}/>
                <Button txt="Yes" bgColor="#2020cc" color="#fff" showSpinner={showSpinner} fontSize="0.7rem" fn={ok}/>
            </div>
        </div>
    )
}


export default Confirmation