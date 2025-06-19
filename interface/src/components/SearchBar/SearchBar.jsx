import {PiMagnifyingGlass} from "react-icons/pi";

function SearchBar () {
    return (
        <div className="user-list-search-bar">
            <PiMagnifyingGlass className="search-icon" />
            <input
                type="text"
                placeholder="Recherchez par un ID, prénom, mail, ou autre"
                className="search-input"
            />
        </div>
    )
}

export default SearchBar;