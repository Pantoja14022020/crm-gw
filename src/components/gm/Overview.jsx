import CountUp from 'react-countup';
import { Spinner } from "@material-tailwind/react";

function Overview({customers,showSpinner}){
    return(
        <section className="overview-gm">
            <div className="section-gm-overview important">
                <h1>Prospectos</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.prospecto == true).length} duration={2} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Calificación</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.calificacion == true).length} duration={2.5} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Compromiso</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.compromiso == true).length} duration={3} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Negociación</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.negociacion == true).length} duration={3.5} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
            <div className="section-gm-overview important">
                <h1>Cierre</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.cierre == true).length} duration={4} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
            <div className="section-gm-overview">
                <h1>Postventa</h1>
                <div className="count-number">
                    {
                        showSpinner ? <Spinner/> : <CountUp start={0} end={customers.filter(customer => customer.postventa == true).length} duration={5} style={{fontSize: '4rem', fontWeight: '900'}} />
                    }
                </div>
            </div>
        </section>
    )
}

export default Overview