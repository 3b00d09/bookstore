import React from "react";
import "../index.css"
import BookCard, { BookData } from "./BookCard";
import {useState, useEffect}from "react"
import {motion, AnimatePresence} from "framer-motion"

interface queryType{
    data: {
        Books:[]
    },
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean
}

interface HomeSectionProps{
    heading: string,
    query: queryType
}

export default function PanelNav(props: HomeSectionProps){

    const [currIndex, setCurrIndex] = useState(0)
    const [bookPages, setBookPages] = useState<BookData[][]>([])


    useEffect(() => {
        let booksPerSlide;
        const screenSize: number = window.innerWidth
        
        // idk how to index an object with typescript problem for another day
        screenSize >= 1536 ? booksPerSlide = 5 : screenSize >= 700 ? booksPerSlide = 4 : screenSize >= 500 ? booksPerSlide = 3
        : booksPerSlide = 2

        
        if (props.query.data) {
            const books = props.query.data.Books
            const totalSlices = Math.floor(books.length / 5);
            const tempArray = [...books];
            let temp = [];
            for (let i = 0; i < totalSlices; i++) {
                const removedElements = tempArray.splice(0, booksPerSlide);
                temp.push(removedElements);
            }
            setBookPages(temp);
        }
      }, [props.query.data]);



    const handlePrevNav = () =>{
        if(currIndex === 0) return
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex - 1)
    }

    const handleNextNav = () =>{
        currIndex === bookPages.length - 1 ? setCurrIndex(0) : setCurrIndex(currIndex + 1)
    }

    useEffect(() =>{
        //if(bookPages.length > 0) startNavInterval()
    },[bookPages])

    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className={`py-4 rounded-lg mt-6 p-2 panel-nav lg:grid lg:grid-flow-col lg:auto-cols-auto lg:gap-10 ${props.heading.replaceAll(
            " ",
            "-"
          )}`}
        >
          {props.query.isSuccess && (
            <React.Fragment>
              {/* NEED Z INDEX BECAUSE WE HAVE ::BEFORE HERE AND SO IT COVERS THE P TAG AND DOESNT MAKE IT CLICKABLE */}
              {props.heading !== "Featured" && (
                <p
                  className="hidden lg:block self-center z-10 cursor-pointer w-auto"
                  onClick={handlePrevNav}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </p>
              )}

              {bookPages.length > 0 && (
                <>
                  {bookPages[currIndex].map((book) => {
                    return (
                      // AnimatePresence with those two props tells our DOM to wait until current element leaves before animating new one in
                      <AnimatePresence mode="wait" key={book.id}>
                        {/* the div with all the animation magic happening https://www.framer.com/motion/component/ */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="relative rounded-lg hover:bg-opacity-40 border shadow-sm bg-white w-full"
                        >
                          <BookCard book={book} header={props.heading}/>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })}
                </>
              )}
              {props.heading !== "Featured" && (
                <p
                  className="hidden lg:block self-center z-10 cursor-pointer w-auto"
                  onClick={handleNextNav}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </p>
              )}

              {props.heading !== "Featured" && (
                <>
                  {/* for mobile view the arrows move down */}
                  <div className="flex lg:hidden justify-around mt-4">
                    <p className="z-10 cursor-pointer" onClick={handlePrevNav}>
                      <i className="fa-solid fa-arrow-left"></i>
                    </p>
                    <p className="z-10 cursor-pointer" onClick={handleNextNav}>
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                  </div>
                </>
              )}
            </React.Fragment>
          )}

          {props.query.isError && <h1>Could not load data</h1>}

          {props.query.isLoading && !props.query.data && <h1>Loading...</h1>}
        </div>
      </motion.div>
    );
}
