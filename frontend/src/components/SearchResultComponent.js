const SearchResultComponent = ({ phonebooks, sortBy, onSortChange }) => {
    return (
        <div>
            <div>
                <button onClick={()=> onSortChange(sortBy)}>
                    Toggle Sort
                </button>
            </div>
            <div>
            {phonebooks.map((phonebook) => (
                <div key={phonebook.id}>
                    <h3>{phonebook.name}</h3>
                    <p>{phonebook.phone}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
export default SearchResultComponent