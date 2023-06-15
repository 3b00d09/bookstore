import { Link, useParams } from "react-router-dom"
import React from "react"
import { useEffect, useState, useRef } from "react";
import { BookData } from "../components/BookCard"
import { useUser } from "@clerk/clerk-react";
import "../index.css"
import CreateReview from "../components/CreateReview";

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
    const [similarBooks, setSimilarBooks] = useState<BookData[]>()
    const [bookReviews, setBookReviews] = useState<ratingType>()
    const [inCart, setInCart] = useState(false)
    const [cart, setCart] = useState<BookData[]>([])
    const user = useUser()

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
        const data = {
          userId: user.user?.id,
          bookId: id
        }
        const response = await fetch("https://bookstore-eight-xi.vercel.app/addwishlist/add",{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
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

        const fetchSimilarBooks = async() =>{
          const response = await fetch(`https://bookstore-eight-xi.vercel.app/books/similar/${id}/`)
          const res = await response.json()
          setSimilarBooks(res)
        }

        const fetchReviews = async() =>{
          const response = await fetch(`https://bookstore-eight-xi.vercel.app/review/${id}`)
          const res = await response.json()
          setBookReviews(res)
        }

        fetchBook()
        fetchSimilarBooks()
        fetchReviews()

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

      

    return (
          <>
            {book ?  
            <React.Fragment>
                <div className="flex justify-between mt-16 flex-wrap lg:flex-nowrap sm:gap-2">

                  <div className="basis-1/3 mx-auto">
                    <img className="w-64 m-auto" src ="../src/assets/Samplebook.png"/>
                  </div>

                  <div className="bg-zinc-800 p-4 rounded-lg basis-3/3 lg:basis-2/3 xl:basis-1/3 h-min 2xl:-ml-16">
                    <h1 className="text-3xl">{book.title} - {book.releaseDate}</h1>
                    <p>By John Cena</p>
                    <div className="">{`$${book.price}`}</div>
                    <div>{`${book.stock} in stock`}</div>
                    <p className="mt-6 w-full">{book.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {book.stock > 0?(
                        <>
                        {inCart?(
                          <button onClick={removeFromCart}>Remove from cart</button>
                        ):(
                        <button onClick={addToCart}>Add to cart</button>
                        )}
                        </>
                      ):(
                        <></>
                      )}
                      <button onClick={addToWishlist}>Add to wishlist</button>
                    </div>

                  </div>

                  <div className="basis-1/3 overflow-auto h-96 hidden xl:block">
                    <h1 className="text-center">Similar Books</h1>
                    {similarBooks?.map((book) =>{
                    return(
                      <Link key={book.id} to={`/book/${book.id}`}>
                        <div className="flex flex-wrap gap-4 border-8 rounded-lg border-zinc-800 w-4/5 p-2 m-auto mt-2">
                          <img src="../src/assets/Samplebook.png" className="w-20"/>
                          <div>
                            <p>{book.title}</p>
                          </div>
                        </div>
                    </Link>
                    )
                  })}
                  </div>

                </div>
                <div className="flex flex-wrap gap-4 items-center mt-16" >
                  <h1 className="text-3xl">Rating</h1>
                  <p ref={starDiv}>
                    <i className="fa-star fa-regular fa-2xl"></i>
                    <i className="fa-star fa-regular fa-2xl"></i>
                    <i className="fa-star fa-regular fa-2xl"></i>
                    <i className="fa-star fa-regular fa-2xl"></i>
                    <i className="fa-star fa-regular fa-2xl"></i>
                  </p>
                </div>


                <div>
                  <p className="mt-6 opacity-80">Write a review...</p>

                  <CreateReview bookId = {book.id}/>
                </div>

                <h1 className="text-3xl mb-16 mt-4">Reviews</h1>
                {bookReviews?.reviews.map((review) =>{
                    return(
                      <div key= {review.username} className="flex items-center space-x-4 mb-8 mt-8">
                      {/* Left section */}
                      <div className="flex-shrink-0">
                        <img className="w-12 h-12 rounded-full" src={review.profileimageurl} alt="User" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{}</h3>
                      </div>
    
                      {/* Right section */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-semibold">{`${review.rating}/5`}</h4>
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                    )
                  })
                }
              </React.Fragment>
            : 
            <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
          </>
    )
}
