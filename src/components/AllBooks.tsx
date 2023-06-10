import Section from "./Section";
import "../App.css"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react"
import HomeSection from "./HomeSection";

type FilterType = {
    categoryFilter: string[];
    priceFilter: number;
    languageFilter: string;
  };

function AllBooks({categoryFilter, priceFilter,languageFilter}: FilterType){

    const queryClient = useQueryClient()
    const paragraphTag = useRef<HTMLParagraphElement>(null)
    const imagesDiv = useRef<HTMLDivElement>(null)

    const query = useQuery({queryKey:["books", categoryFilter], queryFn: fetchAllBooks})

    async function fetchAllBooks(){
        
        // my backend dev decided to return different types of json so here we are

        if(categoryFilter.length === 0){
            const response = await fetch(`https://bookstore-eight-xi.vercel.app/books`)
            const res = await response.json()
            return res
        }
        else{
            const queryString = categoryFilter.join(",")
            console.log(queryString)
            const response = await fetch(`https://bookstore-eight-xi.vercel.app/categories/books/?names=${queryString}`)
            const res = await response.json()
            return res
        }
    }

    const handleHoverIn = (event: React.MouseEvent) =>{
        const parent = event.target as HTMLDivElement
        if(paragraphTag.current && imagesDiv.current){
            parent.classList.remove("flex")
            paragraphTag.current.classList.remove("animate-down")
            paragraphTag.current.classList.add("animate-up")
            imagesDiv.current.classList.add("flex")
            imagesDiv.current.classList.remove("hidden")
        }
    }

    const handleHoverOut = (event: React.MouseEvent) =>{
        const parent = event.target as HTMLDivElement
        if(paragraphTag.current && imagesDiv.current){
            parent.classList.add("flex")
            paragraphTag.current.classList.remove("animate-up")
            paragraphTag.current.classList.add("animate-down")
            imagesDiv.current.classList.remove("flex")
            imagesDiv.current.classList.add("hidden")
        }
    }

    return(
    <>
        <div className="w-full">
            <div className="flex text-3xl py-4 rounded-lg mt-6 p-2 history-banner text-center h-42" onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
                <h1 className="text-3xl" ref={paragraphTag}>Featued Books</h1>
                <div className="flex p-2 mt-6 justify-center gap-16 hidden" ref={imagesDiv}>
                <div>
                    <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                </div>
                <div>
                    <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                </div>
                <div>
                    <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                </div>
                <div>
                    <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                </div>
                <div>
                    <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                </div>

            </div>
            </div>
            {query?.data &&(
            <HomeSection heading={"Browse Through our Featured Books"} books={query.data}/>
            )}

            <h1 className="text-3xl py-4 bg-gray-800 rounded-lg mt-6 p-2">{categoryFilter.length === 0 ? "All Books" : `${categoryFilter[0]}`}</h1>
                <div className="grid content-start items-stretch my-4">
                {query?.data && (
                    <Section books={query.data} />
                )}
                {query.isLoading  &&(
                    <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                )}
                {query.error &&(
                    <h1 className="justify-self-center">Could not load data</h1>
                )}
                </div>
        </div>
    </>
    )
}


export default AllBooks;
