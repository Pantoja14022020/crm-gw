import { generarColorAlegre } from "../helpers/generators";

function Card({user}){
    return (
        <section className="card">
            <div className="image-card-container">
                <div className="image-card" style={{background: generarColorAlegre()}}><p>{user.fullname[0].toUpperCase()}</p></div>
            </div>
            <div className="info-general">
                <h1>{user.fullname}</h1>
                <p>📧 {user.email}</p>
                <p>📱 {user.phone}</p>
                <p>🎂 {user.dateBirth}</p>
                <div className="gender-ig">
                    <b style={{color: `${user.gender == 'Femenino' ? '#f50caf' : (user.gender == 'Masculino' ? '#3134f5' : '#212225') }`,borderColor:`${user.gender == 'Femenino' ? '#f50caf' : (user.gender == 'Masculino' ? '#3134f5' : '#212225') }`}}>Gender</b>
                    <b style={{color: "#fff", borderColor: `${user.gender == 'Femenino' ? '#f50caf' : (user.gender == 'Masculino' ? '#3134f5' : '#212225') }` ,backgroundColor: `${user.gender == 'Femenino' ? '#f50caf' : (user.gender == 'Masculino' ? '#3134f5' : '#212225') }`}}>{user.gender}</b>
                </div>
                <p>🌍 {user.country}</p>
                <p><b id="levelStudies">Level Studies</b> {user.levelStudies}</p>
                <div id="englishLevelDiv"><p>English Level</p> <p>{user.englishLevel}</p></div>
                <div id="positionDiv"><p>Position</p> <p>{user.position}</p></div>
            </div>
        </section>
    )
}

export default Card;