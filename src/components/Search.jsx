import Icon from "./Icon";

function Search(){
    return (
        <div className="search-input">
            <Icon name="search" size="1.2rem" color="#888"/>
            <input
                type="text"
                placeholder="Search a candidate to trade"
            />
        </div>
    )
}

export default Search;