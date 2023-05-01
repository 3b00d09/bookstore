import AllBooks from "../../components/AllBooks";
import Search from "../../components/Search"

import React from "react";

function Home(){
    return(
        <React.Fragment>
            <Search />
            <AllBooks />
        </React.Fragment>
    )
}

export default Home;