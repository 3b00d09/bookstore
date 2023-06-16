import { useState } from "react";
import { Link } from "react-router-dom";

function Search(){

    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    return(
        <div className="w-full md:basis-2/4">
            <div className="flex gap-4 justify-center">
                <input value={searchQuery} onChange={handleInputChange} className = "w-3/4 p-2 rounded" type="text" placeholder="Search..."></input>
                <Link to={`/search/${searchQuery}`}>
                    <button>Search</button>
                </Link>
            </div>
        </div>
    )
}

export default Search;