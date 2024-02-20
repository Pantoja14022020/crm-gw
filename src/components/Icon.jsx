import { IoMdNotificationsOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPowerOff } from "react-icons/fa6";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";





function Icon({type,name, url, spaceHorizontal, spaceVertical, width, height,fn,color,size}){
    return(
        <div onClick={fn} className="icon" style={{backgroundImage: `url(${ type==="image" ? url : ''})`, marginRight: `${spaceHorizontal ? '0.5rem' : ''}`, marginBottom: `${spaceVertical ? '1rem' : ''}`, width: width, height: height, cursor: `${type == "icon" ? "pointer" : ""}`   }}>
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
                            name === 'arrow' ? <MdArrowDropDown color={color} size={size} /> : <></>
                        }
                    </>
            }
        </div>
    )
}

export default Icon;