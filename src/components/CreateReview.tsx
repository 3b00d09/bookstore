import { useUser } from "@clerk/clerk-react";
import {useState} from "react"
import { FormEvent } from 'react';


interface ReviewProps{
    bookId: number;
}

export default function CreateReview(props: ReviewProps){

    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0) 
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



    return(
        <form action="" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={user.user?.id}></input>
        <input type="hidden" name="bookId" value={bookId}></input>
        <br></br>
        <select name="rating" onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea className="w-2/5 p-2" name="comment" onChange={(e) => setReview(e.target.value)}></textarea>
        <br></br>
        <button type="submit">Submit Review</button>
      </form>
    )
}