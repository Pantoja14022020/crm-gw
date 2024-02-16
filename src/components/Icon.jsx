import { IoNotificationsOutline } from "react-icons/io5";

function Icon({type,name, url, spaceHorizontal, spaceVertical, width, height}){
    return(
        <div className="icon" style={{backgroundImage: `url(${ type==="image" ? url : ''})`, marginRight: `${spaceHorizontal ? '1rem' : ''}`, marginBottom: `${spaceVertical ? '1rem' : ''}`, width: width, height: height   }}>
            {
                type === "icon" 
                ? 
                    <>

                        {
                            name === "notification"  ? <IoNotificationsOutline /> : <></>
                        }
                        
                    </> 
                : 
                    <></>
            }
        </div>
    )
}

export default Icon;