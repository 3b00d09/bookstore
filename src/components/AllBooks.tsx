import Section from "./Section";
import "../App.css"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"

type FilterType = {
    categoryFilter: string[];
    priceFilter: number;
    languageFilter: string;
  };

function AllBooks({categoryFilter, priceFilter,languageFilter}: FilterType){

    const queryClient = useQueryClient()

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
            return res.book
        }
    }

    return(
    <>
        <div className="w-full">
            <h1 className="text-3xl py-4">Featured</h1>
                <div className="grid content-start items-stretch my-4">
                    {/* {<div className="justify-self-center text-3xl">Come back later for this section</div>} */}

                    {categoryFilter.map((filter) => filter)}
                    <br />
                    {languageFilter}
                    <br />
                    {priceFilter}
                </div>
            <h1 className="text-3xl py-4">{categoryFilter.length === 0 ? "All Books" : `${categoryFilter[0]}`}</h1>
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
