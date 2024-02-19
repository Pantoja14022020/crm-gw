import { IoMdNotificationsOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPowerOff } from "react-icons/fa6";
import { RiBarChartHorizontalLine } from "react-icons/ri";



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
                    <>
                        {
                            name === "chart" ? <RiBarChartHorizontalLine style={{position:"absolute",top:"1rem",right:"1rem",transform:"rotate(180deg)",color:"#a5a5a5"}} /> : <></>
                        }
                    </>
            }
        </div>
    )
}

export default Icon;