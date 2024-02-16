import Icon from "./Icon";

export default function Profiles({profiles}){

    return(
        <div className="profiles">
                <h5>Workspaces</h5>
                <ul>
                    {
                        profiles.map((profile,id)=>(
                            <li key={id}><Icon type="image" url={profile.image} width="30px" height="30px"/><p>{profile.txt}</p></li>
                        ))
                    }
                </ul>
        </div>
    )
}