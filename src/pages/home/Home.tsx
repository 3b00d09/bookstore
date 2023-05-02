import AllBooks from "../../components/AllBooks";
import SideBar from "../../components/SideBar";

function Home(){
    return(
        <div className="flex gap-4 h-full">
            <SideBar />
            <AllBooks />
        </div>
    )
}

export default Home;