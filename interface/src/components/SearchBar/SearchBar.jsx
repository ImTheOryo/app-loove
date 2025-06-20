import {PiMagnifyingGlass} from "react-icons/pi";

function SearchBar ({changeValue, value}) {
    return (
        <div className="user-list-search-bar">
            <PiMagnifyingGlass className="search-icon" />
            <input
                type="text"
                placeholder="Recherchez par un ID, prénom, mail, ou autre"
                className="search-input"
                value={value}
                onChange={(e) => {
                    changeValue(e.target.value)
                }}
            />
        </div>
    )
}

export default SearchBar;