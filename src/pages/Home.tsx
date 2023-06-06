
import AllBooks from "../components/AllBooks";

type FilterType = {
    categoryFilter: string[];
    priceFilter: number;
    languageFilter: string;
  };


function Home({categoryFilter, priceFilter, languageFilter}: FilterType){

    
    return(
        <div className="">
            <AllBooks categoryFilter={categoryFilter} languageFilter={languageFilter} priceFilter={priceFilter} />
        </div>
    )
}

export default Home;