import { useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"
import { useEffect, useState } from "react"


export default function SearchResult(){
    const query = useParams()
    const [books, setBooks] = useState<BookData[]>([])
    
    useEffect(() =>{
        const fetchBooks = async() =>{
            const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/books/search?searchQuery=${query.query}`)
            const res = await response.json()
            setBooks(res)
        }

        fetchBooks()
    },[])
    return(
        <div>
            {books.map((book) =>{
                return(
                    <div key={book.id}>{book.title}</div>
                )
            })}
        </div>
    )
}