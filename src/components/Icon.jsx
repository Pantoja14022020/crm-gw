import { IoNotificationsOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPowerOff } from "react-icons/fa6";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";






function Icon({type,name, url, spaceHorizontal, spaceVertical, width, height,fn,color,size,center}){
    return(
        <div onClick={fn} className={`${type == 'icon' ? 'icon' : ''}`} style={{backgroundImage: `url(${ type==="image" ? url : ''})`, marginRight: `${spaceHorizontal ? '0.5rem' : ''}`, marginBottom: `${spaceVertical ? '1rem' : ''}`, width: width, height: height, cursor: `${type == "icon" ? "pointer" : ""}`, backgroundPosition:'center',backgroundSize:'cover', margin: `${center ? 'auto' : ''}`   }}>
            {
                type === "icon" 
                ? 
                    <>

                        {
                            name === "notification"  ? <IoNotificationsOutline size="1.3rem" color="#000"/> : <></>
                        }
                        {
                            name === "options" ? <SlOptionsVertical size="1rem" color="#000" /> : <></>
                        }
                        {
                            name === "logout" ? <FaPowerOff size="1rem" color="#dd0000"/> : <></>
                        }
                    </> 
                : 
                    <>
                        {
                            name === "chart" ? <RiBarChartHorizontalLine style={{position:"absolute",top:"1rem",right:"1rem",transform:"rotate(180deg)",color:"#a5a5a5"}} /> : <></>
                        }
                        {
                            name === "edit" ? <MdModeEditOutline color={color} size={size}/> : <></>
                        }
                        {
                            name === "user" ? <FaUserCheck color={color} size={size}/> : <></>
                        }
                        {
                            name === "check" ? <FaCheckCircle color={color} size={size} /> : <></>
                        }
                        {
                            name === 'search' ? <RiSearchLine color={color} size={size} /> : <></>
                        }
                        {
                            name === 'arrow' ? <MdArrowDropDown color={color} size={size} style={{margin:'auto'}}/> : <></>
                        }
                        {
                            name === 'delete' ? <MdDelete color={color} size={size}/> : <></>
                        }{
                            name == 'ready' ? <FaCheck color={color} size={size} /> : <></>
                        }
                    </>
            }
        </div>
    )
}

export default Icon;