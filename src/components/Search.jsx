import Icon from "./Icon";


function Search({setFilteredCandidates,filteredCandidates,setSearchTerm,searchTerm}){

    

    return (
        <div className="search-input">
            <Icon name="search" size="1.2rem" color="#888"/>
            <input
                type="text"
                placeholder="Search a candidate to trade"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onInput={ e => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default Search;