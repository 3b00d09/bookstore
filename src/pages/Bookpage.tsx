import { useParams } from "react-router-dom"
import React from "react"
import { useEffect, useState, useRef, useCallback } from "react";
import { BookData } from "../components/BookCard"
import "../index.css"



export default function BookPage(){
    const { id } = useParams()
    const [book, setBook] = useState<BookData>()

    const starDiv = useRef<HTMLParagraphElement>(null)
    

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

      useEffect(() =>{

        const fetchBook = async () => {
            const response = await fetch(`https://bookstore-eight-xi.vercel.app/book/${id}`)
            const res = await response.json()
            const date = new Date( res.releaseDate);
            res.releaseDate = date.toLocaleDateString("en-GB",{
              month: "long",
              year:"numeric"
            })

            setBook(res)
        }

        fetchBook()
    }, [])

    useEffect(() =>{
      if(starDiv.current){
        const rating = 4.5
        if(Number.isInteger(rating)){
          console.log("int")
        }
        else{
          for (let i = 0; i<Math.floor(rating); i++){
            starDiv.current.children[i].classList.add("active")
          }
          starDiv.current.children[starDiv.current.children.length - 1].classList.add("fa-star-half", "active")
        }
      }
    },[book])

      

    return (
          <>
            {book ?  
            <React.Fragment>
                <div className="flex flex-wrap justify-between mt-16">
                  <div className="grow w-1/12">
                  <img className="w-64 m-auto" src ="../src/assets/Samplebook.png"/>
                  </div>

                  <div className="bg-zinc-800 p-4 rounded-lg grow w-1/6 h-min 2xl:-ml-16">
                    <h1 className="text-3xl">{book.title} - {book.releaseDate}</h1>
                    <p>By John Cena</p>
                    <p className="mt-6 w-full">{book.description}</p>
                    <div>{book.price}</div>
                    <button onClick={addToCart}>Add to cart</button>
                    <button onClick={addToWishlist}>Add to wishlist</button>
                  </div>

                  <div className="grow w-1/12 overflow-auto h-96 hidden xl:block">
                    <h1 className="text-center">Similar Books</h1>

                    <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                      <img src="../src/assets/Samplebook.png" className="w-20" />
                      <div>
                        <p>Book title</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                      <img src="../src/assets/Samplebook.png" className="w-20" />
                      <div>
                        <p>Book title</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                      <img src="../src/assets/Samplebook.png" className="w-20" />
                      <div>
                        <p>Book title</p>
                      </div>

                    </div>
                    <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                      <img src="../src/assets/Samplebook.png" className="w-20" />
                      <div>
                        <p>Book title</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                      <img src="../src/assets/Samplebook.png" className="w-20" />
                      <div>
                        <p>Book title</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl mt-16">User Reviews</h1>
                <p className="mt-2" ref={starDiv}>
                  <i className="fa-regular fa-star fa-2xl"></i>
                  <i className="fa-regular fa-star fa-2xl"></i>
                  <i className="fa-regular fa-star fa-2xl"></i>
                  <i className="fa-regular fa-star fa-2xl"></i>
                  <i className="fa-regular fa-star fa-2xl"></i>
                </p>
              </React.Fragment>
            : 
            <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
          </>
    )
}