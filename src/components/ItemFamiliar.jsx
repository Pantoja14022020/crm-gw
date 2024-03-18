import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

function ItemFamiliar({setErrorCCD,setMsgErrorCCD,setFamily,family}){

    const [showMyself, setShowMyself] = useState(true)
    const [checkboxValues, setCheckboxValues] = useState({
        birthCertificate: false,
        passport: false//,
        //proofAddress: false
    });
    const [textInputValue, setTextInputValue] = useState('');

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues({ ...checkboxValues, [name]: checked });
    };

    const handleTextInputChange = (event) => {
        setTextInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if(textInputValue == ''){
            setErrorCCD(true)
            setMsgErrorCCD('Type relationship')
        }else{
            setShowMyself(false)
            const {birthCertificate,passport/*,proofAddress*/} = checkboxValues;
            const relationship = textInputValue;
            const familiar = {
                birthCertificate,
                passport,
                proofAddress: '',
                relationship
            }
            setFamily([...family,familiar])
        }
    };

    return(
        <>
        {
            showMyself ?
            <div className="item-familiar">
                <fieldset>
                    <input name="birthCertificate" type="checkbox" checked={checkboxValues.checkbox1} onChange={handleCheckboxChange} />
                    <label htmlFor="birthCertificate">Birth Certificate</label>
                </fieldset>
                <fieldset>
                    <input name="passport" type="checkbox" checked={checkboxValues.checkbox2} onChange={handleCheckboxChange}/>
                    <label htmlFor="passport">Passport</label>
                </fieldset>
                {/**<fieldset>
                    <input name="proofAddress" type="checkbox" checked={checkboxValues.checkbox3} onChange={handleCheckboxChange}/>
                    <label htmlFor="proofAddress">Proof Address</label>
                </fieldset>**/}
                <input type="text" placeholder="Relación" value={textInputValue} onChange={handleTextInputChange} />
                <button id="ok-item-fam" onClick={handleSubmit}>ok</button>
            </div>
            :<>
                <FaCheckCircle color="#38802f" size="1rem" style={{margin:"auto",marginTop: "1rem"}}/>
            </> 
        }
        </>
    )
}

export default ItemFamiliar