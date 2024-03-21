import CountUp from 'react-countup';

function Overview(){
    return(
        <section className="overview-gm">
            <div className="section-gm-overview important">
                <h1>Prospectos</h1>
                <div className="count-number">
                    <CountUp start={0} end={34} duration={2} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Calificación</h1>
                <div className="count-number">
                    <CountUp start={0} end={14} duration={2.5} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Compromiso</h1>
                <div className="count-number">
                    <CountUp start={0} end={8} duration={3} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Negociación</h1>
                <div className="count-number">
                    <CountUp start={0} end={32} duration={3.5} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
            <div className="section-gm-overview important">
                <h1>Cierre</h1>
                <div className="count-number">
                    <CountUp start={0} end={67} duration={4} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Postventa</h1>
                <div className="count-number">
                    <CountUp start={0} end={20} duration={5} style={{fontSize: '4rem', fontWeight: '900'}} />
                </div>
            </div>
        </section>
    )
}

export default Overview