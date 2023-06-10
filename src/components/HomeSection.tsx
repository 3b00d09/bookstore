import "../index.css"
import { BookData } from "./BookCard";
import {useState, useEffect}from "react"

interface HomeSectionProps{
    heading: String,
    books: []
}
export default function HomeSection(props: HomeSectionProps){
    const tempArray = [...props.books]
    let bookPages: Array<any> = [];
    const [currIndex, setCurrIndex] = useState(0)

    const totalSlices = Math.floor(props.books.length / 5)

    for(let i = 0; i < totalSlices; i++){
        const removedElements = tempArray.splice(0, 5)
        bookPages = [...bookPages, removedElements]
    }

    console.log("rendered")

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCurrIndex((prevIndex) => (prevIndex + 1) % bookPages.length);
    //     }, 2000);
      
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, [bookPages.length]);


    
    return(
        <div className="text-3xl py-4 rounded-lg mt-6 p-2 banner
        text-center">
            <h1 className="">{props.heading}</h1>
            <div className="flex p-2 mt-4 justify-center gap-16">
                {bookPages[currIndex]?.map((book: BookData) =>{
                    return(
                        <div>
                            <img src="../src/assets/TestCover.jpg" className="h-10 sm:20 md:h-16 lg:h-24 xl:h-32 2xl:h-44 rounded-lg"></img>
                        </div>
                    )
                })}
            </div>

        </div>  
    )
}