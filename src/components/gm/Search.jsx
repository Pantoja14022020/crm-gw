import { FiSearch } from "react-icons/fi";

function Search({padding,borderRadius,fontSize,widthInput,setSearchTerm}){
    return(
        <div className="search-container-subsection-board" style={{padding,borderRadius}}>
            <FiSearch color="#707070" />
            <input type="text" placeholder="Search by name company or name owner" style={{fontSize, width: `${widthInput}`}} onInput={e => setSearchTerm(e.target.value)}/>
        </div>
    )
}

export default Search