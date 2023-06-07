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
          book.quantity = 1;
          const cartItem = {
            id: book.id,
            quantity: 1
          }
          const updatedCart = [...cart, cartItem]; 
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          console.log("Book added to cart:", book);
        }
      };

      const addToWishlist = () =>{
        return;
      }
      

    return (
        <div className="flex flex-wrap gap-4 items-start mt-16">
            {book ? 
            <React.Fragment>
                <img className="w-64 ml-16" src ="../src/assets/Samplebook.png"/>
                <div className="mx-12 bg-zinc-800 p-4 rounded-lg h-48">
                  <h1 className="text-3xl">{book.title}</h1>
                  <div>{book.price}</div>
                </div>
                <div className="mx-16">
                  <button onClick={addToCart}>Add to cart</button>
                  <button onClick={addToWishlist}>Add to wishlist</button>
                </div>
            </React.Fragment>
            : 
            <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
        </div>
    )
}