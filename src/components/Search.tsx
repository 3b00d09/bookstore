function Search(){
    return(
        <div className="basis-2/4">
            <div className="flex flex-wrap gap-4 justify-center w-full">
                <input className = "w-3/4 text-center p-2 rounded" type="text" placeholder="Search..."></input>
                <button className="">Search</button>
            </div>
        </div>
    )
}

export default Search;