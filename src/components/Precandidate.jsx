import { getTypeUser } from "../helpers/localstorage";
import BarStatus from "./BarStatus";
import Button from "./Button";
import Icon from "./Icon";
import Search from "./Search";

function Precandidate(){

    
    return (
        <section className="section-precandidates">
            <div className="btn-new-candidate">
                <Button txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6"/>
            </div>
            <div className="container-candidates">
                <div className="trades">
                    <h2>Trade</h2>
                    <div className="search-container">
                        <Search/>
                    </div>
                </div>
                <div className="professional">
                    <h2>Professional</h2>
                    <div className="search-container">
                        <Search/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Precandidate;