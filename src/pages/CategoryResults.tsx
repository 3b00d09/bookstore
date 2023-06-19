import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookData } from "../components/BookCard"

export default function CategoryResults(){
    const query = useParams()
    const [books, setBooks] = useState<BookData[]>([])

    useEffect(() =>{
        if(query.query?.length === 0) return;
        const fetchBooks = async() =>{
            const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/categories/books/?names=${query.query}`)
            const res = await response.json()
            const date = new Date( res.releaseDate);
            res.releaseDate = date.toLocaleDateString("en-GB",{
                month: "long",
                year:"numeric"
              })
            setBooks(res)
        }
        fetchBooks()
    },[query])
    return(
        <div className="mt-8">
            <h1 className="text-3xl mb-6">Query Results</h1>
            {books &&(
                books.map((book) =>{
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
            )}
        </div>
    )
}