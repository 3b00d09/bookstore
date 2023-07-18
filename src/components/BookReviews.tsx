import { useQuery } from "@tanstack/react-query"

interface props{
    bookId: number
}

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

export default function BookReviews(props:props){
    
    const {data, isLoading, isSuccess, isError} = useQuery({queryKey:["bookReviews", props.bookId], queryFn:async()=>{
        const response = await fetch(`https://bookstore-eight-xi.vercel.app/review/${props.bookId}`)
        const res = await response.json()
        return res;
    }} )

    return(
        <>
            <h1 className="text-4xl font-semibold mb-16 mt-4">Reviews</h1>
            {isLoading &&(
                <p>Loading</p>
            )}

            {isSuccess &&(
                <>
                    {data.reviews.map((review:review) =>{
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

            {isError &&(
                <p>Error fetching reviews.</p>
            )}
        </>
    )
}