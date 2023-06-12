import { useState } from "react";

function Search(){

    const [searchQuery, setSearchQuery] = useState("");

    const queryBooks = async () =>{
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/search",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(searchQuery),

        })
        const res = await response.json()
        console.log(res)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      };
    return(
        <div className="w-full md:basis-2/4">
            <div className="flex gap-4 justify-center">
                <input value={searchQuery} onChange={handleInputChange} className = "w-3/4 p-2 rounded" type="text" placeholder="Search..."></input>
                <button onClick={queryBooks} className="">Search</button>
            </div>
        </div>
    )
}

export default Search;