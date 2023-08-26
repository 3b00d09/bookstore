import { useEffect, useRef, useState } from "react"
import { redirect, useNavigate, useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"
import "../index.css"
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from '@tanstack/react-query'
import React from "react";
import { useIntersection } from "@mantine/hooks";

interface props{
    setsideBarActive: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCategories: React.Dispatch<React.SetStateAction<String[]>>
}
export default function CategoryResults(props: props){

    const query = useParams()
    const redirect = useNavigate()

    const fetchBooks = async({pageParam = 1})=>{
        const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/categories/books/?names=${query.query}&page=${pageParam}`)
        const res = await response.json()
        return res
    }

    const {data, error, fetchNextPage, isFetching, isFetchingNextPage, isLoading} = useInfiniteQuery({
        queryKey:["categoryResults", query], 
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

    // disable sidebar while we are fetching data so user has to wait for data to be returned before clicking another catergory and calling more datanpm run 
    useEffect(() =>{
        props.setsideBarActive(!isFetching)
        
    }, [isFetching])

    // reset active categories when we dismount (just to clear the color of selected icons + the state of activeCategories)
    useEffect(() =>{
        return(() =>{
            props.setActiveCategories([])
            // for some reason if we abruptly exit this page then our sidebar goes off (just a simple f5 causes this to break so here we are)
            props.setsideBarActive(true)
        })
    }, [])

    useEffect(()=>{
        console.log(data?.pages)
    },[data?.pages])
    

    return(
        <div className="mt-8">
            {isLoading ? (
                <div className="flex justify-center"><div className="border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div></div>
            ):<></>}

            <div className="grid md:grid-cols-2 gap-8">
            {/**can use [0] index because we only want to display this when no results found at all so there isnt pagination**/}
            {data?.pages[0].Books.length === 0 &&(
                <div>No results found.</div>
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
                                                    <p className="text-base word-break">{book.description}</p>
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