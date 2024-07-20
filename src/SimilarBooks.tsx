import { useQuery } from "@tanstack/react-query";
import { BookData } from "./components/BookCard";
import { useNavigate } from "react-router-dom";

interface props{
    bookId: number
}

export default function SimilarBooks(props:props){

    const redirect = useNavigate()
    const {data, isLoading, isError, isSuccess} = useQuery({queryKey:["similarBooks", props.bookId], queryFn: async ()=>{
        const response = await fetch(`http://localhost:3000/books/similar/${props.bookId}/`)
        const res = await response.json()
        return res
    }})

    return(
        <div className="bg-secondary-purple place-items-center rounded-lg w-2/12 overflow-auto h-96 hidden xl:grid">
            {isLoading &&(
                <p>Loading</p>
            )}
            {isSuccess &&(
                <>
                    <h1>Similar Books</h1>
                    <div className="grid grid-cols-2">  
                    {data.map((book:BookData) =>{
                        return(
                    
                        <div key={book.id} className="p-2 hover:
                        cursor-pointer" onClick={() =>{
                            // there is no other graceful way of doing this that i know, router just wont let me redirect from book/x to book/y
                            redirect(`../book/${book.id}`);
                            redirect(0)
                        }}>
                            <img src="../src/assets/Samplebook.png" className="w-20"/>
                        </div>
                    
                        )
                    })}
                    </div>
                </>
                
            )}
            {isError&&(
                <p>Error</p>
            )}
        </div>
    )
}