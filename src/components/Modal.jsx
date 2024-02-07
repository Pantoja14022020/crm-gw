import { FaCircleInfo } from "react-icons/fa6";
 
function Modal({message,title}){

    return(
        <>
            <div className="modal-primary">
                <div><FaCircleInfo color='blue' size="1rem"/></div>
                <div className="txt-info">
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default Modal;