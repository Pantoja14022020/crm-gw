function Section(props){

    return (
        <section className={`section ${props.sectionName}`}> 
            <div>
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