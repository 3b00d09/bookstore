import { useQuery } from "@tanstack/react-query"
import { reviewType } from "../pages/Bookpage"

interface props{
    reviews: reviewType
}

export default function BookReviews(props:props){

    return(
        <>
            <h1 className="text-4xl font-semibold mb-16 mt-4">Reviews</h1>

            {props.reviews.reviews &&(
                <>
                    {props.reviews.reviews.map((review) =>{
                    return(
                        <div key= {review.username} className="flex items-center space-x-4 mb-8 mt-8 bg-secondary-white p-2 rounded-lg">
                            {/* Left section */}
                            <div className="flex-shrink-0">
                            <img className="w-12 h-12 rounded-full" src={review.profileimageurl} alt="User" />
                            <p>username</p>
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
                </>
            )}
        </>
    )
}