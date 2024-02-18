import { IoMdNotificationsOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPowerOff } from "react-icons/fa6";


function Icon({type,name, url, spaceHorizontal, spaceVertical, width, height,fn}){
    return(
        <div onClick={fn} className="icon" style={{backgroundImage: `url(${ type==="image" ? url : ''})`, marginRight: `${spaceHorizontal ? '1rem' : ''}`, marginBottom: `${spaceVertical ? '1rem' : ''}`, width: width, height: height, cursor: `${type == "icon" ? "pointer" : ""}`   }}>
            {
                type === "icon" 
                ? 
                    <>

                        {
                            name === "notification"  ? <IoMdNotificationsOutline size="1.5rem" /> : <></>
                        }
                        {
                            name === "options" ? <SlOptionsVertical size="1.2rem" /> : <></>
                        }
                        {
                            name === "logout" ? <FaPowerOff size="1.2rem"/> : <></>
                        }
                    </> 
                : 
                    <></>
            }
        </div>
    )
}

export default Icon;