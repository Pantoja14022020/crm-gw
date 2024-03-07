function Radio({radiosOptions,name,valueRadio, setValueRadio, defaultChecked}){
    return (
        <>
            <div className="radios-group">
                {
                    radiosOptions.map((ro,idx) => (
                        <div key={idx} className="item-radio">
                            <input type="radio" id="radio" name={name} value={ro} checked={valueRadio === ro || defaultChecked === ro} onChange={e => setValueRadio(e.target.value)} />
                            <label htmlFor="ro">{ro}</label>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Radio;