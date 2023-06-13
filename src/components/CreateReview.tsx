import { useUser } from "@clerk/clerk-react";
import {useRef, useState} from "react"
import { FormEvent } from 'react';


interface ReviewProps{
    bookId: number;
}

export default function CreateReview(props: ReviewProps){

    const [review, setReview] = useState("")
    const [rating, setRating] = useState<Number>(0) 


    const userRating = useRef<HTMLDivElement>(null)
    const user = useUser()
    const bookId = props.bookId
    
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const newReview = {
            bookId: bookId,
            userId: user.user?.id,
            comment: review,
            rating: rating
        }

        console.log(newReview)

        const response = await fetch("https://bookstore-eight-xi.vercel.app/review/create",{
            method:"POST",
            body: JSON.stringify(newReview),
            headers: {
                "Content-Type": "application/json"
              },
        })

        const res = await response.json()
        console.log(res)
    }

    const handleRatingClick = (event: any) =>{
        if(userRating.current){

            for(let i = 0; i < userRating.current.children.length; i++){
                userRating.current.children[i].classList.remove("active")
            }
            if (event.target.id == 1) return

            for (let i = 0; i < parseInt(event.target.id); i++){
                userRating.current.children[i].classList.add("active")
            }
        }

        setRating(parseInt(event.target.id))
    }



    return(
        <form action="" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={user.user?.id}></input>
        <input type="hidden" name="bookId" value={bookId}></input>
        <br></br>
        <div className="flex gap-2 mb-4" ref={userRating}>
            <i className="fa-star fa-regular fa-2xl" id ="1" onClick={handleRatingClick}></i>
            <i className="fa-star fa-regular fa-2xl" id ="2" onClick={handleRatingClick}></i>
            <i className="fa-star fa-regular fa-2xl" id ="3" onClick={handleRatingClick}></i>
            <i className="fa-star fa-regular fa-2xl" id ="4" onClick={handleRatingClick}></i>
            <i className="fa-star fa-regular fa-2xl" id ="5" onClick={handleRatingClick}></i>
        </div>
        <textarea className="w-2/5 p-2 mt-4" name="comment" onChange={(e) => setReview(e.target.value)}></textarea>
        <button type="submit">Submit Review</button>
      </form>
    )
}