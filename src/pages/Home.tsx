
import AllBooks from "../components/AllBooks";
import "../index.css"

type FilterType = {
    categoryFilter: string[];
  };


function Home({categoryFilter}: FilterType){

    
    return(
        <div>
            <AllBooks categoryFilter={categoryFilter} />
        </div>
    )
}

export default Home;