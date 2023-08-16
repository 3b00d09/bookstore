import { Link, useNavigate, useParams } from "react-router-dom"
import React from "react"
import { useEffect, useState, useRef } from "react";
import { BookData } from "../components/BookCard"
import { useAuth, useUser } from "@clerk/clerk-react";
import "../index.css"
import CreateReview from "../components/CreateReview";
import SimilarBooks from "../SimilarBooks";
import BookReview from "../components/BookReviews";
import BookReviews from "../components/BookReviews";

interface review{
  username: string,
  comment: string,
  rating: number,
  profileimageurl: string
}

interface ratingType{
  averageRating: number,
  reviews: review[]
}



export default function BookPage(){
    const { id } = useParams()
    const [book, setBook] = useState<BookData>()
    const [bookReviews, setBookReviews] = useState<ratingType>()
    const [inCart, setInCart] = useState(false)
    const [cart, setCart] = useState<BookData[]>([])
    const [inWishlist, setInWishlist] = useState(false)
    const [wishlist, setWishlist] = useState<BookData[]>([])

    const user = useUser()
    const {getToken} = useAuth()

    const starDiv = useRef<HTMLParagraphElement>(null)
    const addToCart = () => {

        if (book) {
        // Append the book to the existing cart or create a new cart with only the book we are adding
          const updatedCart = [...cart, book]; 
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCart(updatedCart)
        }
      };

      const removeFromCart = () =>{
        if(book){
          const updatedCart = cart.filter((item) => {return item.id !== book.id})
          localStorage.setItem("cart", JSON.stringify(updatedCart))
          setCart(updatedCart)
        }
      }

      const addToWishlist = async() =>{
        const myToken = await getToken()
        const data = {
          userId: user.user?.id,
          bookId: id
        }
        const response = await fetch("https://bookstore-eight-xi.vercel.app/wishlist/add",{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`
          }
        })
        const res = await response.json()
        console.log(res)
      }

      const removeFromWishlist = async() =>{
        const myToken = await getToken()
        const data = {
          userId: user.user?.id,
          id: id
        }
        const response = await fetch("https://bookstore-eight-xi.vercel.app/wishlist/remove",{
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`
          }
        })
        const res = await response.json()
        console.log(res)
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

        const fetchWishlist = async() =>{
          const myToken = await getToken()
          const data = {
            userId: user.user?.id,
          }
          const response = await fetch(`https://bookstore-eight-xi.vercel.app/wishlist/?limit=100`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myToken}`
            }

          })
          const res = await response.json()
          if(res.Books.length > 0) setWishlist(res.Books)
        }

        fetchBook()
        fetchWishlist()

        const cart: BookData[] = JSON.parse(localStorage.getItem("cart") || "[]") as BookData[];
        setCart(cart)
    }, [])

    useEffect(() =>{
      if(starDiv.current){
        const rating = bookReviews?.averageRating
        if (!rating) return
        for (let i = 0; i<Math.floor(rating); i++){
          starDiv.current.children[i].classList.add("active", "fa-solid")
        }
        if(!Number.isInteger(rating)){
          const lastStar = Math.ceil(rating) - 1
          starDiv.current.children[lastStar].classList.add("fa-star-half-stroke", "active")
        }
        }
    },[bookReviews])

    useEffect(() =>{
      setInCart(cart.some((item)=>{
        return item.id === book?.id
      }))
    }, [book, cart])

    useEffect(() =>{
      wishlist.forEach((item)=>{
        if(book?.id === item.id) setInWishlist(true)
      })
    },[wishlist])

    return (
          <>
            {book ?  
            <React.Fragment>
                <div className="flex justify-around mt-16 flex-wrap lg:flex-nowrap gap-4">

                  <div className="w-6/12 xl:w-max">
                    <img className="w-64 h-full" src ="../src/assets/Samplebook.png"/>
                  </div>

                  <div className="bg-secondary-purple p-4 rounded-lg xl:w-6/12">
                    <h1 className="text-3xl font-semibold">{book.title} - {book.releaseDate}</h1>
                    <div className="flex gap-2 flex-nowrap">
                      {book.category.map((item, i) =>{
                        return(
                          <div key={i} className="p-2 bg-secondary-white rounded-lg my-4">{item.name}</div>
                        )
                      })}
                    </div>
                    <div className="flex flex-wrap gap-4 items-center mb-2" >
                    <p ref={starDiv}>
                      <i className="fa-star fa-regular fa-xl"></i>
                      <i className="fa-star fa-regular fa-xl"></i>
                      <i className="fa-star fa-regular fa-xl"></i>
                      <i className="fa-star fa-regular fa-xl"></i>
                      <i className="fa-star fa-regular fa-xl"></i>
                    </p>
                  </div>
                    <p className="mb-2 font-medium">{book.description}</p>
                    <div className="text-4xl font-semibold">{`$${book.price}`}</div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {user.isSignedIn &&(
                        <>
                        {book.stock > 0?(
                          <>
                          {inCart?(
                            <button onClick={removeFromCart}>Remove from cart</button>
                          ):(
                          <button onClick={addToCart}>Add to cart</button>
                          )}
                          {inWishlist?(
                            <button onClick={removeFromWishlist}>Remove From wishlist</button>
                          )
                          :
                          (
                            <button onClick={addToWishlist}>Add to wishlist</button>
                          )}
                          
                          </>
                        ):(
                          <></>
                        )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <SimilarBooks bookId={book.id}/>
                </div>

                {user.isSignedIn &&(
                    <div>
                    <p className="mt-6 opacity-80">Write a review...</p>
                    <CreateReview bookId = {book.id}/>
                  </div>
                )}

                
                  <BookReviews bookId = {book.id}/>

              </React.Fragment>
            : 
            <div className="w-screen h-screen place-content-center grid">
              <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
              }
          </>
    )
}

