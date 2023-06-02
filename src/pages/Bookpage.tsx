import { useParams } from "react-router-dom"
import React from "react"
import { useEffect, useState } from "react";
import { BookData } from "../components/Book"



export default function BookPage(){
    const { id } = useParams()
    const [book, setBook] = useState<BookData>()

    useEffect(() =>{

        const fetchBook = async () => {
            const response = await fetch(`https://bookstore-eight-xi.vercel.app/book/${id}`)
            const res = await response.json()
            setBook(res)
        }

        fetchBook()
        
    }, [])
    

    const addToCart = () => {
        // we tell typescript to parse localstorage as an array of objects with bookdata type (i think ???)
        const cart: BookData[] = JSON.parse(localStorage.getItem("cart") || "[]") as BookData[];

        if (book) {
        // Append the book to the existing cart or create a new cart with only the book we are adding
          const updatedCart = [...cart, book]; 
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          console.log("Book added to cart:", book);
        }
      };

      const processPurchase = () =>{
        return;
      }
      

    return (
        <div className="flex flex-wrap justify-around content-center h-screen mt-2">
            {book ? 
            <React.Fragment>
                <div>{book.title}</div>
                <div>{book.price}</div>
                <button onClick={addToCart}>Add to cart</button>
                <button onClick={processPurchase}>Add to wishlist</button>
            </React.Fragment>
            : 
            <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
        </div>
    )
}