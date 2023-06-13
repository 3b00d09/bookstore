import React from "react";
import "../index.css"
import { BookData } from "./BookCard";
import {useState, useEffect, useRef}from "react"


interface queryType{
    data: [],
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}

interface HomeSectionProps{
    heading: String,
    query: queryType
}
export default function PanelNav(props: HomeSectionProps){

    const [currIndex, setCurrIndex] = useState(0)
    const [bookPages, setBookPages] = useState<BookData[][]>([])

    const intervalRef = useRef<number>()


    useEffect(() => {
        if (props.query.data) {
          const totalSlices = Math.floor(props.query.data.length / 5);
          const tempArray = [...props.query.data];
          let temp = [];
          for (let i = 0; i < totalSlices; i++) {
            const removedElements = tempArray.splice(0, 5);
            temp.push(removedElements);
          }
          setBookPages(temp);
        }
      }, [props.query.data]);


    const startNavInterval = () => {
        intervalRef.current = setInterval(() => {
            // we pass in the previous index to the next call because otherwise we are stuck with the initial value of currIndex when the timeout was first called
            setCurrIndex((prevIndex) =>
            prevIndex === bookPages.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000 * 2);
        };


    const paragraphTag = useRef<HTMLParagraphElement>(null)
    const imagesDiv = useRef<HTMLDivElement>(null)

    const handleHoverIn = (event: React.MouseEvent) =>{
        startNavInterval()
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
    
        clearInterval(intervalRef.current);

        const parent = event.target as HTMLDivElement
        if(paragraphTag.current && imagesDiv.current){
            parent.classList.add("flex")
            paragraphTag.current.classList.remove("animate-up")
            paragraphTag.current.classList.add("animate-down")
            imagesDiv.current.classList.remove("flex")
            imagesDiv.current.classList.add("hidden")
        }
    }

    const handlePrevNav = () =>{
        if(currIndex === 0) return
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex - 1)
    }

    const handleNextNav = () =>{
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex + 1)
    }



    
    return(
        <div className="flex text-3xl py-4 rounded-lg mt-6 p-2 history-banner text-center h-42" onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>

            {props.query.isSuccess &&(
                <React.Fragment>
                    <h1 className="text-3xl" ref={paragraphTag}>{props.heading}</h1>
                    <div className="flex p-2 mt-6 justify-center gap-16 hidden" ref={imagesDiv}>

                        {/* NEED Z INDEX BECAUSE WE HAVE ::BEFORE HERE AND SO IT COVERS THE P TAG AND DOESNT MAKE IT CLICKABLE */}
                        <p className="self-center z-10 cursor-pointer" onClick={handlePrevNav}>PREV</p>
                        {bookPages.length > 0 &&(
                            bookPages[currIndex].map((book) =>{
                                return(
                                    <div key={book.id} className="relative group rounded-lg hover:bg-black cursor-pointer">
                                        <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg group-hover:opacity-30"></img>
                                        <p className="absolute bottom-0 mb-2 w-full text-base break-words font-sans font-serif">{book.title}</p>
                                    </div>
                                )
                            })
                        )}
                        <p className="self-center z-10 cursor-pointer" onClick={handleNextNav}>NEXT</p>

                    </div>
                </React.Fragment>
            )}

            {props.query.isError &&(
                <h1>Could not load data</h1>
            )}

            {props.query.isLoading && (
                <h1>Loading...</h1>
            )}

        </div>
    )
}
