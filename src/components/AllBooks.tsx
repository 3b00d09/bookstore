import { useEffect, useState } from "react";
import Book from "./Book"
import Category from "./Category"
import "../App.css"

interface BookData{
    id: number,
    title: string,
    price: number,
    description: string,
    category: Array<Int16Array>
}

function AllBooks(){

    const [allBooks, setBooks] = useState<BookData[]>([])
    const [dataLoaded, setLoaded] = useState(false)
    const [validData, setValid] = useState(true)
    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("https://bookstore-eight-xi.vercel.app/books")
            if (response.status === 500){
                setValid(false)
            }
            else{
                setLoaded(true)
            }
            const res = await response.json()
            setBooks(res)
        }
        fetchBooks();

    }, [])


    return(
    <>
        <div className="w-full">
            <h1 className="text-3xl p-4">All books</h1>
                <div className="grid content-start items-stretch my-4">
                {allBooks && (
                    <div className="flex flex-wrap gap-4 mx-4">
                        {allBooks.map((book) =>(
                            <Book book = {book} key={book.id}/>
                        ))}
                    </div>
                )}
                {!dataLoaded  &&(
                    <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                )}
                {!validData &&(
                    <h1 className="justify-self-center">Could not load data</h1>
                )}
                </div>
            </div>

        <h1>Romance</h1>
        <Category />
    </>
    )
}


export default AllBooks;
