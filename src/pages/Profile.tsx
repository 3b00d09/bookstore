import React from "react";

function Profile(){
    return(
        <React.Fragment>
            <div className="grid mx-2 my-4">
                <div className="justify-self-center">
                    <h1 className="text-2xl">Your Account</h1>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8 ">
                        <button>Purchase History</button>
                        <button>Sold Items</button>
                        <button>Posted Items</button>
                        <button>Wishlist</button>
                        <button>Cart</button>
                        <button>User Settings</button>
                    </div>
                </div>
            </div>
            <div className="justify-self-start">
                <h1 className="text-3xl">Slider</h1>
                <h1 className="text-3xl">Slider</h1>
                <h1 className="text-3xl">Slider</h1>
            </div>

        </React.Fragment>
    )
}

export default Profile;