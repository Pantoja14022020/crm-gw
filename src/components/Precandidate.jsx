import BarStatus from "./BarStatus";

function Precandidate(){

    const stagesTrades = [
        {
            id: 0,
            title: 'Pre-Candidates',
            description: 'General Information and Recruitment Process',
            paint: true
        },
        {
            id: 1,
            title: 'Candidates',
            description: 'Selection Process',
            paint: false
        },
        {
            id: 2,
            title: 'EB3 Workers',
            description: 'Client Documents and GM Process',
            paint: false
        }

    ]

    return (
        <section className="section-precandidates">
            <BarStatus stages={stagesTrades} />
        </section>
    )
}

export default Precandidate;