import { useEffect, useState } from "react";

interface Book{
    id: number,
    title: string,
    price: number,
    description: string
}

function AllBooks(){

    const [allBooks, setBooks] = useState<Book[]>([])
    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("https://bookstore-git-main-diyararashid123.vercel.app/books")
            const res = await response.json()
            setBooks(res)
            console.log(allBooks)
        }
        fetchBooks();

    }, [])


    return(
        <div className="flex flex-wrap gap-4 items-center m-6 flex-1 content-start ">
        {allBooks.map((book) =>(
            <div key = {book.id}>
                <img className ="w-32 mb-2" src ="src/assets/Samplebook.png"/>
                <div className="px-2">
                    <div>{book.title}</div>
                    <div>{book.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</div>
                </div>
            </div>
        ))}
        </div>
    )
}


export default AllBooks;
