import { useNavigate, useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useIntersection } from "@mantine/hooks"
import { useRef } from "react"


export default function SearchResult(){
    const query = useParams()

    const redirect = useNavigate()

    const fetchBooks = async({pageParam = 1})=>{
        const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/books/search?searchQuery=${query.query}&page=${pageParam}`)
        //const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/books?page=${pageParam}`)
        const res = await response.json()
        return res
    }

    const {data, error, fetchNextPage, isFetchingNextPage, isLoading} = useInfiniteQuery({
        queryKey:["searchResults", query], 
        queryFn: (fetchBooks), 
        getNextPageParam: (lastPage) => {
            let nextPage = lastPage.currentPage + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined; 
        },
    })

    const lastPost = useRef<HTMLElement>(null)
    const {ref, entry} = useIntersection({
        root: lastPost.current,
        threshold: 1
    })

    useEffect(()=>{
        if(entry?.isIntersecting) fetchNextPage()
    },[entry])
    
    return(
        <div>
            {isLoading ? (
                <div className="flex justify-center mt-8"><div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div></div>
            ):<></>}

            <div className="flex flex-wrap gap-8 my-4">
                {data?.pages[0].Books.length === 0 &&(
                    <div>No Search Results.</div>
                )}
                {data?.pages.map((group, i) =>{
                        return(
                            <React.Fragment key={i}>
                                {group.Books.map((book: BookData,i:number) =>{
                                    if(i === group.Books.length - 1){
                                        return(
                                            <div key={book.id} ref={ref}>
                                                <div className="flex gap-4 p-4 mb-2 hover:cursor-pointer rounded-lg border border-red-900" key={book.id} onClick={() => {redirect(`/book/${book.id}`)}}>
                                                <img src="../src/assets/TestCover.jpg" className=" w-28 md:w-32 rounded-lg panel-img group-hover/images:opacity-30"></img>
                                                <div className="text-xl">
                                                    <p>{book.title}</p>
                                                    <p>{book.price.toFixed(2)}</p>
                                                    <p className="text-base">{book.description}</p>
                                                </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                return(
                                <div key={book.id}>
                                    <div className="flex gap-4 p-4 mb-2 hover:cursor-pointer rounded-lg border border-red-900" key={book.id} onClick={() => {redirect(`/book/${book.id}`)}}>
                                    <img src="../src/assets/TestCover.jpg" className=" w-28 md:w-32 rounded-lg panel-img group-hover/images:opacity-30"></img>
                                    <div className="text-xl">
                                        <p>{book.title}</p>
                                        <p>{book.price.toFixed(2)}</p>
                                        <p className="text-base">{book.description}</p>
                                    </div>
                                    </div>
                                </div>
                                )
                                })}
                            </React.Fragment>
                        )
                    })
                }            
            </div>
            {isFetchingNextPage?
                <div className="my-6 place-content-center grid">
                    <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                </div>
                :
               <></>
            }
        </div>
    )
}