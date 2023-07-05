import { useEffect, useState } from "react";
import axios from 'axios'
import SearchResultComponent from "./SearchResultComponent";
import SearchComponent from "./SearchComponent";

const SearchContainer = () => {
    const [phonebooks, setPhonebooks] = useState([])
    const [sortBy, setSortBy] = useState('name')
    const [sortMode, setSortMode] = useState('asc')
    const [searchQuery, setSearchQuery] = useState('')


    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/phonebooks`, {
                params: {
                    name: searchQuery,
                    sortBy,
                    sortMode
                }
            })
            setPhonebooks(response.data.data.phonebooks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [searchQuery, sortBy, sortMode])

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    const handleSortChange = (field) => {
        if (field === sortBy) {
            setSortMode(sortMode === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortMode('asc')
        }
    }
    return (
        <div className="search-container">
            <h2>Phonebook Search</h2>
            <SearchComponent handleSearch={handleSearch} />
            <SearchResultComponent
                phonebooks={phonebooks}
                sortBy={sortBy}
                sortMode={sortMode}
                onSortChange={handleSortChange}
            />
        </div>
    )
}
export default SearchContainer