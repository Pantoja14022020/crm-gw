import { getTypeUser } from "../helpers/localstorage";
import BarStatus from "./BarStatus";
import Button from "./Button";
import Icon from "./Icon";
import Search from "./Search";
import Table from "./Table";

function Precandidate(){

    const columns = [
        {id: 1,txt: 'Fullname'},
        {id: 2,txt: 'Email'},
        {id: 3,txt: 'Phone'},
        {id: 4,txt: 'Country'},
        {id: 5,txt: 'Date of birth'},
        {id: 6,txt: 'Civil status'},
        {id: 7,txt: 'Gender'},
        {id: 8,txt: 'Level of last studies'},
        {id: 9,txt: 'Position'},
        {id: 10,txt: 'English level'}
    ]


    const rows = [
        {id:0,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:1,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:2,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:3,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:4,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:5,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:6,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:7,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:8,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:0,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:1,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:2,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:3,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:4,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:5,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:6,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:7,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:8,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:0,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:1,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:2,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:3,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:4,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:5,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:6,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:7,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
        {id:8,fullname: 'Daniel Tlanepantla Pantoja', email: 'tl419411@uaeh.edu.mx', phone: '7721257773', country: 'Mexico', dateBirth: '20-07-2001', civilStatus: 'Single', gender: 'Male', levelStudies: 'University', position: 'Student', englishLevel: 'B1'},
    ]
    
    return (
        <section className="section-precandidates">
            <div className="btn-new-candidate">
                <Button txt={ getTypeUser() == 'gm' ? 'New Customer' : (getTypeUser() == 'gw' ? 'gw' : 'New Candidate') }size="100%" iconAdd={true} colorIcon="#8585b6"/>
            </div>
            <div className="container-candidates">
                <div className="search-container">
                    <Search/>
                </div>
                <Table columns={columns} rows={rows}/>
            </div>
        </section>
    )
}

export default Precandidate;