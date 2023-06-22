import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"
import "../index.css"
import { useQuery } from "@tanstack/react-query";

interface props{
    setsideBarActive: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCategories: React.Dispatch<React.SetStateAction<String[]>>
}
export default function CategoryResults(props: props){

    const query = useParams()
    const {isLoading, isError, data} = useQuery({queryKey:["categoryResults", query], queryFn: (async() =>{
        const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/categories/books/?names=${query.query}`)
        const res = await response.json()
        return res
        })
    })

    useEffect(() =>{
        isLoading === true ? props.setsideBarActive(false) : props.setsideBarActive(true)
        
    }, [isLoading])

    // reset active categories when we dismount (just to clear the color of selected icons + the state of activeCategories)
    useEffect(() =>{
        return(() =>{
            props.setActiveCategories([])
        })
    }, [])
    

    return(
        <div className="mt-8">
            <h1 className="text-3xl mb-6">Query Results</h1>
            <div className="flex flex-wrap gap-4">
                {query.query?.split(",").map((query) =>{
                    return(
                        <div key={query} className="category-btn rounded-lg p-[4px]">{query}</div>
                    )
                })}
            </div>
            {isLoading ? (
                <div className="flex justify-center"><div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div></div>
            ):<></>}

            
            {data?.map((book:BookData) =>{
                    return(
                        <div className="flex gap-4 border rounded-full border-red-900 p-4 mb-2 w-1/2" key={book.id}>
                             <img src="../src/assets/TestCover.jpg" className="max-w-none w-28 md:w-32 rounded-lg panel-img group-hover/images:opacity-30"></img>
                             <div>
                                <p>{book.title}</p>
                                <p>{book.price}</p>
                                <p>{book.description}</p>
                             </div>
                        </div>
                    )
                })
            }
        </div>
    )
}