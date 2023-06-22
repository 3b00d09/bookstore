import React from "react";
import "../index.css"
import { BookData } from "./BookCard";
import {useState, useEffect, useRef}from "react"
import { useNavigate } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion"


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
    const redirect = useNavigate()

    const intervalRef = useRef<number>()


    useEffect(() => {
        let booksPerSlide;
        const screenSize: number = window.innerWidth
        
        // idk how to index an object with typescript problem for another day
        screenSize >= 1536 ? booksPerSlide = 5 : screenSize >= 700 ? booksPerSlide = 4 : screenSize >= 500 ? booksPerSlide = 3
        : booksPerSlide = 2

        
        if (props.query.data) {
          const totalSlices = Math.floor(props.query.data.length / 5);
          const tempArray = [...props.query.data];
          let temp = [];
          for (let i = 0; i < totalSlices; i++) {
            const removedElements = tempArray.splice(0, booksPerSlide);
            temp.push(removedElements);
          }
          setBookPages(temp);
        }
      }, [props.query.data]);


    const startNavInterval = () => {
        // clear before we start any interval cause sometimes when hovering across images in a panel we get stacking intervals going from img to img
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // we pass in the previous index to the next call because otherwise we are stuck with the initial value of currIndex when the timeout was first called
            setCurrIndex((prevIndex) =>
            prevIndex === bookPages.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000 * 2);
        };


    const handleHoverIn = () =>{
        if(window.innerWidth < 1024) return
        startNavInterval()
    }

    const handleHoverOut = () =>{
        if(window.innerWidth < 1024) return
        clearInterval(intervalRef.current);
        
    }

    const handlePrevNav = () =>{
        if(currIndex === 0) return
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex - 1)
    }

    const handleNextNav = () =>{
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex + 1)
    }


    
    return(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
        <div className={`lg:flex text-3xl py-4 rounded-lg mt-6 p-2 panel-nav text-center h-42 group hover:block ${props.heading.replaceAll(" ", "-")}`} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>

            {props.query.isSuccess &&(
                <React.Fragment>
                    <h1 className="text-3xl self-center hover:animate-up" >{props.heading}</h1>
                    <div className="flex p-2 mt-6 justify-center gap-16 lg:hidden group-hover:flex">

                        {/* NEED Z INDEX BECAUSE WE HAVE ::BEFORE HERE AND SO IT COVERS THE P TAG AND DOESNT MAKE IT CLICKABLE */}
                        <p className="hidden lg:block self-center z-10 cursor-pointer" onClick={handlePrevNav}>PREV</p>

                            {bookPages.length > 0 &&(
                                bookPages[currIndex].map((book) =>{
                                    return(
                                        // AnimatePresence with those two props tells our DOM to wait until current element leave the DOM before animating new one in
                                        <AnimatePresence
                                        initial={false}
                                        mode="wait"
                                        >
                                            {/* the div with all the animation magic happening https://www.framer.com/motion/component/ */}
                                            <motion.div
                                            key={book.id}
                                            whileHover={{scale: 1.2}}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="relative rounded-lg hover:bg-opacity-40"
                                            onClick={() => redirect(`/book/${book.id}`)}
                                            >
                                                <img src="../src/assets/TestCover.jpg" className="max-w-none w-28 md:w-32 rounded-lg panel-img"></img>
                                                <p className="absolute bottom-0 mb-2 w-full text-base break-words font-sans font-serif">{book.title}</p>
                                            </motion.div>
                                        </AnimatePresence>
                                    )
                                })
                            )}


                        <p className="hidden lg:block self-center z-10 cursor-pointer" onClick={handleNextNav}>NEXT</p>
                    </div>

                    <div className="flex lg:hidden justify-around mt-4">
                        <p className="z-10 cursor-pointer" onClick={handlePrevNav}>PREV</p>
                        <p className="z-10 cursor-pointer" onClick={handleNextNav}>NEXT</p>
                    </div>

                </React.Fragment>

                
            )}

            {props.query.isError &&(
                <h1>Could not load data</h1>
            )}

            {props.query.isLoading && !props.query.data &&(
                <h1>Loading...</h1>
            )}

        </div>
        </motion.div>
    )
}
