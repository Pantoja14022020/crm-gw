import Icon from "./Icon";

function Section(props){

    return (
        <section className={`section ${props.sectionName}`}> 
            <div>
                {
                    props.icon ? <Icon type="icon-normal" name={props.nameIcon}/> : <></>
                }
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
         {
            props.children
         }
        </section>
    )
}

export default Section;