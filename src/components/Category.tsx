interface CategoryData{
    id: number,
    title: string
}
import { useEffect, useState } from "react";

function getCategory(){
    const [ books, setBooks] = useState<CategoryData[]>([])

    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("http://localhost:3000/categories/Romance")
            const res = await response.json()
            setBooks(res.book)
            console.log(res.book)
        }
        fetchBooks();

    }, [])

    return (
        <>
        {books &&(
            <div>
                {books.map((book: CategoryData) =>{
                    return <div key = {book.id}>{book.title}</div>
                })}
            </div>
            )}
        </>
    )
}

export default getCategory