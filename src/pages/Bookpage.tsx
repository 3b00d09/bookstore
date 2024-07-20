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
import { useMutation, useQuery } from "@tanstack/react-query";

export type reviewType = {
  averageRating: number,
  reviews:{
    rating: number,
    comment: string,
    username: string,
    profileimageurl: string,
  }[]
}

interface wishlistType{
  Books: BookData[]
}



export default function BookPage(){
    const { id } = useParams()
    const [inCart, setInCart] = useState(false)
    const [cart, setCart] = useState<BookData[]>([])
    const [inWishlist, setInWishlist] = useState(false)
    const [refreshingWishlist, setRefreshingWishlist] = useState(false)
    const starDiv = useRef<HTMLParagraphElement>(null)

    const user = useUser()
    const {getToken} = useAuth()

    const book = useQuery(({queryKey:["book", id], queryFn:async()=>{

        const response = await fetch(`http://localhost:3000/book/${id}`)
        const res = await response.json()
        const date = new Date( res.releaseDate);
        res.releaseDate = date.toLocaleDateString("en-GB",{
          month: "long",
          year:"numeric"
        })
        return res as BookData
      }
    }))

    const reviews = useQuery(({queryKey:["reviews", id], queryFn:async()=>{

        const response = await fetch(`http://localhost:3000/review/${id}`)
        const res = await response.json()
        return res as reviewType
    }}))

    const wishlist = useQuery({queryKey:["wishlist", id], queryFn:async()=>{
      const myToken = await getToken()
      const data = {
        userId: user.user?.id,
      }
      const response = await fetch(`http://localhost:3000/wishlist/?limit=100`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`
        }

      })
      const res = await response.json()
      setInWishlist(false)
      res.Books.forEach((item:BookData)=>{
        if(id === item.id.toString()) setInWishlist(true)
      })
      return res as wishlistType
    }})

    const addToCart = () => {

        if (book.data) {
        // Append the book to the existing cart or create a new cart with only the book we are adding
          const updatedCart = [...cart, book.data]; 
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCart(updatedCart)
        }
      };

      const removeFromCart = () =>{
        if(book.data){
          const updatedCart = cart.filter((item) => {return item.id !== book.data.id})
          localStorage.setItem("cart", JSON.stringify(updatedCart))
          setCart(updatedCart)
        }
      }

      const addToWishlist = useMutation(async()=>{
        setRefreshingWishlist(true)
        const myToken = await getToken()
        const data = {
          userId: user.user?.id,
          bookId: id
        }
        const response = await fetch("http://localhost:3000/wishlist/add",{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`
          }
        })
        const res = await response.json()
        setRefreshingWishlist(false)
        wishlist.refetch()
        return res
      })

      const removeFromWishlist = useMutation(async()=>{
        setRefreshingWishlist(true)
        const myToken = await getToken()
        const data = {
          userId: user.user?.id,
          id: id
        }
        const response = await fetch("http://localhost:3000/wishlist/remove",{
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`
          }
        })
        //if(response.status === 500) //handle error?
        setRefreshingWishlist(false)
        wishlist.refetch()
      })

      useEffect(() =>{
        const cart: BookData[] = JSON.parse(localStorage.getItem("cart") || "[]") as BookData[];
        setCart(cart)
    }, [])

    useEffect(() =>{
      if(starDiv.current){
        const rating = reviews.data?.averageRating
        if (!rating) return
        for (let i = 0; i<Math.floor(rating); i++){
          starDiv.current.children[i].classList.add("active", "fa-solid")
        }
        if(!Number.isInteger(rating)){
          const lastStar = Math.ceil(rating) - 1
          starDiv.current.children[lastStar].classList.add("fa-star-half-stroke", "active")
        }
        }
    },[reviews])

    useEffect(() =>{
      setInCart(cart.some((item)=>{
        return item.id === book.data?.id
      }))
    }, [book, cart])

    return (
          <>
            {book.data && wishlist.data?  
            <React.Fragment>
                <div className="flex justify-around mt-16 flex-wrap lg:flex-nowrap gap-4">

                  <div className="w-6/12 xl:w-max">
                    <img className="w-64 h-full" src ="../src/assets/Samplebook.png"/>
                  </div>

                  <div className="bg-secondary-purple p-4 rounded-lg xl:w-6/12">
                    <h1 className="text-3xl font-semibold">{book.data.title} - {book.data.releaseDate}</h1>
                    <div className="flex gap-2 flex-nowrap">
                      {book.data.category.map((item, i) =>{
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
                    <p className="mb-2 font-medium">{book.data.description}</p>
                    <div className="text-4xl font-semibold">{`$${book.data.price}`}</div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {user.isSignedIn &&(
                        <>
                        {book.data.stock > 0?(
                          <>
                          {inCart?(
                            <button onClick={removeFromCart}>Remove from cart</button>
                          ):(
                          <button onClick={addToCart}>Add to cart</button>
                          )}
                          
                            {inWishlist?(
                              <button onClick={()=>removeFromWishlist.mutate()}>
                                {wishlist.isRefetching || refreshingWishlist ? "Loading" : "Remove From wishlist"}
                                </button>
                            )
                            :
                            (
                              <button onClick={()=>addToWishlist.mutate()}>
                                {wishlist.isRefetching || refreshingWishlist ? "Loading" : "Add To wishlist"}
                                </button>
                            )}
                            </>

                        ):(
                          <></>
                        )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <SimilarBooks bookId={book.data.id}/>
                </div>

                {user.isSignedIn &&(
                    <div>
                    <p className="mt-6 opacity-80">Write a review...</p>
                    <CreateReview bookId = {book.data.id}/>
                  </div>
                )}

                  {reviews.isLoading &&(
                    <p>Loading...</p>
                  )}
                  {reviews.data &&(
                    <BookReviews reviews = {reviews.data}/>
                  )}
                  {reviews.isError &&(
                    <p>Error retrieving reviews.</p>
                  )}
                
              </React.Fragment>
            : 
            <div className="w-screen h-screen place-content-center grid">
              <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
            </div>
              }
          </>
    )
}

