import React  from 'react'
import {MdSearch} from "react-icons/md"

const SearchBar = ({handleSearch}) => {
    return  (
    <div className="search-bar">
        <MdSearch></MdSearch>
        <input onChange={(event) => handleSearch(event.target.value)} type="text" placeholder='search...' />
    </div>
    )
    
}

export default SearchBar;