import { useEffect, useState } from "react"
import { MdArrowDropDown } from "react-icons/md";


function SelectDefault({width,padding,color,title,options, setParam, fontSize, setParamDefaultEdit, valueDefault,precandidateSelected}){

   
    const [txtSelect, setTxtSelect] = useState(title);//Es el texto que aparece al inicio del select

    const [showOptionsSelect, setShowOptionsSelect] =  useState(false); //Para mostrar las opciones del select


    //ESTO ES PARA ESTABLECER POR DEFAULT EL VALOR CUANDO SE RENDERICE, ESTO SE IMPLEMENTA CUANDO EDITAMOS UN PRECANDIDATO Y
    //QUERMOS QUE SE PINTE DE FORMA AUTOMATICA LOS DATOS
    
    useEffect(()=>{
        if(setParamDefaultEdit == true && precandidateSelected != null){
            //console.log("lo cambie")
            setTxtSelect(valueDefault)
            setParam(valueDefault)
        }
    },[precandidateSelected])


    /*ESTA FUNCION ESTABLECE EL TEXTO QUE TENDRA EL SELECT Y SE MUESTRE
    PERO TAMBIEN ESE VALOR SE ESTABLECE COMO GLOBAL PARA PODER SER TOMADO POR EL
    USE STATE Y SE PUEDA FILTRAR LOS CANDIDATOS, ESTE VALOR SE OCUPA EN EL 'Dashboard.jsx' linea 178 */
    function setTxtGlobalVariable(optionSelected){
        setTxtSelect(optionSelected);
        if(setParam){
            setParam(optionSelected)//Lo hacemos global para ser utilizado en el filter 
        }  
    }

    //console.log(txtSelect)

    return(
        <div className="select" style={{width: width, backgroundColor: color, fontSize: fontSize}} onClick={e => setShowOptionsSelect(!showOptionsSelect)}>
            <p style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>{txtSelect} <MdArrowDropDown/></p>
            {
                showOptionsSelect 
                ? 
                <>
                    <div className="options">
                        {
                            options.map((option,id) => (
                                <div key={id} className="option" onClick={e => setTxtGlobalVariable(option)}>{option}</div>
                            ))
                        }
                    </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default SelectDefault