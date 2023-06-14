import {Link} from "react-router-dom"

function ProfileNav(){
    const content = [
        {
            heading:"Purchase History",
            body:"Explore and review the collection of books you have previously purchased.",
            url:"/profile/purchased"
        },
        {
            heading:"Sold Items",
            body:"Discover and track the books you have successfully sold.",
            url:"/profile/sold"
        },
        {
            heading:"Wishlist",
            body:"Browse through your collection of books that you plan to purchase in the future.",
            url:"/profile/wishlist"
        },
        {
            heading:"Cart",
            body:"Take a look at the books you have previously added to your cart for purchase.",
            url:"/profile/cart"
        },
        {
            heading:"User Settings",
            body:"Manage and personalize your account settings to suit your preferences.",
            url:"/profile/settings"
        }
    ]


    return(
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 my-8 ">
            {content.map((section) =>{
                return(
                    <Link to={`${section.url}`}>
                    <div className="rounded-md bg-neutral-900 p-2 w-3/4 border h-full hover:bg-opacity-40">
                        <h1 className="text-xl">{`${section.heading}`}</h1>
                        <p className="mt-1 opacity-70">{`${section.body}`}</p>
                    </div>
                </Link>
                )
            })}
        </div>
    )
}
export default ProfileNav;