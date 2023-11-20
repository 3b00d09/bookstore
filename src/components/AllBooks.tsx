import "../index.css"
import { useQuery } from "@tanstack/react-query";
import PanelNav from "./PanelNav";
import { motion } from "framer-motion";



function AllBooks(){

    const popular = useQuery({queryKey:["popularBooks"], queryFn: fetchPopularBooks})
    const topSelling = useQuery({queryKey:["topSellingBooks"], queryFn: fetchTopSellingBooks})
    const mostWishedFor = useQuery({queryKey:["mostWishedForBooks"], queryFn: fetchMostWishedForBooks})
    //const recommended = useQuery({queryKey:["recommendedBooks"], queryFn: fetchRecommendedBooks})


    async function fetchPopularBooks(){
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/popular")
        const data = await response.json()
        return data
    }

    async function fetchTopSellingBooks(){
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/sell")
        const data = await response.json()
        return data
    }

    async function fetchMostWishedForBooks(){
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/topwished")
        const data = await response.json()
        return data
    }


    return(
        <div className="w-full mb-8">
            <div className="flex flex-col justify-center items-center main-banner">
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="z-10 text-center"
                    >
                <p className="text-3xl lg:text-5xl md:text-4xl italic font-semibold">Explore a Vast Collection of <br/><span className="gradient-text">Literary Treasures</span></p>
                </motion.div>
            </div>
            <h1 className="mt-6 text-2xl lg:text-4xl md:text-3xl">Popular Titles</h1>
            {/* <PanelNav heading={"Featured Books"} query={featured}/> */}
            {popular &&(
                <PanelNav key={"Popular"} heading={"Popular"} query={{data:popular.data, isError:popular.isError, isSuccess: popular.isSuccess, isLoading: popular.isFetching}}/>
            )}
            <h1 className="mt-6 text-2xl lg:text-4xl md:text-3xl">Top Selling Titles</h1>
            {topSelling &&(
                <PanelNav key={"Top Selling"} heading={"Top Selling"} query={{data:topSelling.data, isError:topSelling.isError, isSuccess: topSelling.isSuccess, isLoading: topSelling.isFetching}}/>
            )}

            <h1 className="mt-6 text-2xl lg:text-4xl md:text-3xl">Most Wished For</h1>
            {mostWishedFor &&(
                <PanelNav key={"Most Wished For"} heading={"Most Wished For"} query={{data:mostWishedFor.data, isError:mostWishedFor.isError, isSuccess: mostWishedFor.isSuccess, isLoading: mostWishedFor.isLoading}}/>
            )}
        </div>
    )
}


export default AllBooks;
