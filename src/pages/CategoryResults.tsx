import { useEffect, useState } from "react"
import { redirect, useNavigate, useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"
import "../index.css"
import { useQuery } from "@tanstack/react-query";

interface props{
    setsideBarActive: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCategories: React.Dispatch<React.SetStateAction<String[]>>
}
export default function CategoryResults(props: props){

    const query = useParams()
    const redirect = useNavigate()

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
            // for some reason if we abruptly exit this page then our sidebar goes off (just a simple f5 causes this to break so here we are)
            props.setsideBarActive(true)
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

            <div className="grid md:grid-cols-2 gap-8">
                {data?.map((book:BookData) =>{
                        return(
                            <div className="flex gap-4 p-4 mb-2 hover:cursor-pointer rounded-lg border border-red-900" key={book.id} onClick={() => {redirect(`/book/${book.id}`)}}>
                                <img src="../src/assets/TestCover.jpg" className=" w-28 md:w-32 rounded-lg panel-img group-hover/images:opacity-30"></img>
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
        </div>
    )
}