import React from "react";
import {Link, Outlet} from "react-router-dom"

function Profile(){
    return(
        <React.Fragment>
            <div className="grid mx-2 my-4">
                <div className="justify-self-center w-3/4">
                    <h1 className="text-2xl">Your Account</h1>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 my-8 ">
                        <Link to={"/profile/purchased"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">Purchase History</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>

                        <Link to={"/profile/sold"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">Sold Items</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>

                        <Link to={"/profile/selling"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">Posted Items</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>

                        <Link to={"/profile/wishlist"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">Wishlist</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>

                        <Link to={"/profile/cart"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">Cart</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>

                        <Link to={"/profile/settings"}>
                            <div className="rounded-md bg-neutral-900 p-2 w-3/4">
                                <h1 className="text-xl">User settings</h1>
                                <p>View your previous purchases.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="justify-self-start">
                <Outlet />
            </div>

        </React.Fragment>
    )
}

export default Profile;
