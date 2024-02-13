import { FaCircleInfo } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";

 
function Modal({message,title,type}){

    return(
        <>
            <div className="modal-primary">
                <div>
                    {
                        type === "error" 
                        ? <FaCircleInfo color="red" size="1rem"/>
                        : <FaCircleCheck color="green" size="1rem"/>
                    }
                    
                </div>
                <div className="txt-info">
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default Modal;