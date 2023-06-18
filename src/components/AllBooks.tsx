import "../App.css"
import { useQuery } from "@tanstack/react-query";
import PanelNav from "./PanelNav";



function AllBooks(){

    //const featured = useQuery({queryKey:["featured"], queryFn: fetchFeaturedBooks})
    const popular = useQuery({queryKey:["popularBooks"], queryFn: fetchPopularBooks})
    const topSelling = useQuery({queryKey:["topSellingBooks"], queryFn: fetchTopSellingBooks})
    const mostWishedFor = useQuery({queryKey:["mostWishedForBooks"], queryFn: fetchMostWishedForBooks})
    const recommended = useQuery({queryKey:["recommendedBooks"], queryFn: fetchRecommendedBooks})


    // async function fetchFeaturedBooks(){
    //     const response = await fetch("https://bookstore-eight-xi.vercel.app/books/featured")
    //     const data = await response.json()
    //     return data
    // }

    async function fetchPopularBooks(){
        console.log("Called popular")
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/popular")
        const data = await response.json()
        return data
    }

    async function fetchTopSellingBooks(){
        console.log("Called selling")
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/sell")
        const data = await response.json()
        return data
    }

    async function fetchMostWishedForBooks(){
        console.log("Called wished for")
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/topwished")
        const data = await response.json()
        return data
    }

    async function fetchRecommendedBooks(){
        console.log("Called rec")
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/recommended")
        const data = await response.json()
        return data
    }


    return(
        <div className="w-full">
            {/* <PanelNav heading={"Featured Books"} query={featured}/> */}
            {popular &&(
                <PanelNav heading={"Popular"} query={{data:popular.data, isError:popular.isError, isSuccess: popular.isSuccess, isLoading: popular.isFetching}}/>
            )}
            {recommended &&(
                <PanelNav heading={"Recommended"} query={{data:recommended.data, isError:recommended.isError, isSuccess: recommended.isSuccess, isLoading: popular.isFetching}}/>
            )}

            {topSelling &&(
                <PanelNav heading={"Top Selling"} query={{data:topSelling.data, isError:topSelling.isError, isSuccess: topSelling.isSuccess, isLoading: topSelling.isFetching}}/>
            )}

            {mostWishedFor &&(
                <PanelNav heading={"Most wished for"} query={{data:mostWishedFor.data, isError:mostWishedFor.isError, isSuccess: mostWishedFor.isSuccess, isLoading: mostWishedFor.isLoading}}/>
            )}

        </div>
    )
}


export default AllBooks;
