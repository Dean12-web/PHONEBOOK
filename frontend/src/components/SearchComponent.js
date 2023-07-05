import React, {useState} from 'react'

const SearchComponent = ({handleSearch}) =>{
    const [searchQuery, setSearchQuery] = useState('')
    const handleChange = (e) => {
        setSearchQuery(e.target.value)
        handleSearch(e.target.value)
    } 

    return(
        <div>
            <input type='text' value={searchQuery} onChange={handleChange} placeholder='Search...'/>
        </div>
    )
}

export default SearchComponent