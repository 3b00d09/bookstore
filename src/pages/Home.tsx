
import AllBooks from "../components/AllBooks";
import "../index.css"

type FilterType = {
    categoryFilter: string[];
    priceFilter: number;
    languageFilter: string;
  };


function Home({categoryFilter, priceFilter, languageFilter}: FilterType){

    
    return(
        <div>
            <AllBooks categoryFilter={categoryFilter} languageFilter={languageFilter} priceFilter={priceFilter} />
        </div>
    )
}

export default Home;