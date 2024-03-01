import { FaCircleInfo } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import Icon from "./Icon";
import alert from '../public/alert.png';
 
function Modal({message,title,type,modalType}){

    return(
        <>
            <div className="modal-primary">
                <div>
                    {
                        type === "error" 
                        ? <FaCircleInfo color="red" size="1rem"/>
                        : (type === "notify" ? <Icon type="image" url={alert} width="30px" height="30px"/>
                            : <FaCircleCheck color="green" size="1rem"/>)
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