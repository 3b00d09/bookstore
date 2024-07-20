import "../index.css"
import { useQuery } from "@tanstack/react-query";
import PanelNav from "./PanelNav";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookData } from "./BookCard";



function AllBooks(){

    const popular = useQuery({queryKey:["popularBooks"], queryFn: fetchPopularBooks})
    const topSelling = useQuery({queryKey:["topSellingBooks"], queryFn: fetchTopSellingBooks})
    const mostWishedFor = useQuery({queryKey:["mostWishedForBooks"], queryFn: fetchMostWishedForBooks})
    const featured = useQuery({queryKey:["featuredBooks"], queryFn: fetchFeaturedBooks})
    //const recommended = useQuery({queryKey:["recommendedBooks"], queryFn: fetchRecommendedBooks})


    async function fetchPopularBooks(){
        const response = await fetch("http://localhost:3000/books/popular")
        const data = await response.json()
        return data
    }

    async function fetchTopSellingBooks(){
        const response = await fetch("http://localhost:3000/books/sell")
        const data = await response.json()
        return data
    }

    async function fetchMostWishedForBooks(){
        const response = await fetch("http://localhost:3000/books/topwished")
        const data = await response.json()
        return data
    }

    async function fetchFeaturedBooks(){
        const response = await fetch("http://localhost:3000/books/featured")
        const data = await response.json()
        return data
    }


    return (
      <div className="w-full mb-8 mt-8 lg:mt-12 xl:mt-20 font-inter">
        <div className="flex flex-col justify-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="z-10"
          >
            <div className="grid items-center max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-10">
              <h1 className="lg:leading-none text-3xl font-bold tracking-tighter xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Discover Your Next Favorite Book
              </h1>
              <div className="flex flex-col items-start space-y-4 justify-self-start">
                <p className="mx-auto max-w-[700px] text-[#604c77] md:text-xl">
                  Browse our vast collection of books in all genres. Fast
                  shipping, great service, and over 100,000 titles.
                </p>
              </div>
            </div>
          </motion.div>
          <div>
            <img
              className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover lg:blur-[2px]"
              src="src/assets/mainBannerBg.jpg"
            />
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-3xl xl:text-[3.4rem] font-bold tracking-tighter text-center">
            Featured Titles
          </h2>
          <p className="text-[#604c77] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
            Explore our hand-picked selection of this month's most interesting
            books.
          </p>
          
        </div>
        { <PanelNav heading={"Featured"} query={{
              data: featured.data,
              isError: featured.isError,
              isSuccess: featured.isSuccess,
              isLoading: featured.isFetching,
            }}/>} 
        <h2 className="mt-6 text-3xl xl:text-[3.4rem] font-bold tracking-tighter text-center">
          Popular Titles
        </h2>
        {popular && (
          <PanelNav
            key={"Popular"}
            heading={"Popular"}
            query={{
              data: popular.data,
              isError: popular.isError,
              isSuccess: popular.isSuccess,
              isLoading: popular.isFetching,
            }}
          />
        )}
        <h2 className="mt-6 text-3xl xl:text-[3.4rem] font-bold tracking-tighter text-center">
          Top Selling Titles
        </h2>
        {topSelling && (
          <PanelNav
            key={"Top Selling"}
            heading={"Top Selling"}
            query={{
              data: topSelling.data,
              isError: topSelling.isError,
              isSuccess: topSelling.isSuccess,
              isLoading: topSelling.isFetching,
            }}
          />
        )}

        <h2 className="mt-6 text-3xl xl:text-[3.4rem] font-bold tracking-tighter text-center">
          Most Wished For
        </h2>
        {mostWishedFor && (
          <PanelNav
            key={"Most Wished For"}
            heading={"Most Wished For"}
            query={{
              data: mostWishedFor.data,
              isError: mostWishedFor.isError,
              isSuccess: mostWishedFor.isSuccess,
              isLoading: mostWishedFor.isLoading,
            }}
          />
        )}
      </div>
    );
}


export default AllBooks;
