import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut} from "@clerk/clerk-react";
import {Link} from "react-router-dom";
import React from "react";

function Header(){
    return(
    <React.Fragment>
        <SignedIn>
                <header className="flex justify-between items-center bg-zinc-800 flex-wrap gap-4 p-4">
                    <Logo />
                    <ul className ="list-none flex justify-center items-center flex-wrap gap-4">
                    <li className ="">
                        <Link to="/">Home</Link>
                        </li>
                        <li className ="">
                        <Link to="/create">Post book</Link>
                        </li>
                        <li className ="">
                            <Link to="/wishlist">Wishlist</Link>
                        </li>
                        <li className ="">
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li className ="">
                            <SignOutButton />
                        </li>
                    </ul>
                </header>
        </SignedIn>

        <SignedOut>
            <header>
                <Logo />
                <ul className ="list-none flex justify-center items-center flex-wrap gap-4">
                    <li className ="">
                        <SignInButton />
                    </li>
                    <li className ="">
                        <SignUpButton />
                    </li>
                </ul>
            </header>
        </SignedOut>
    </React.Fragment>
    )
}


function Logo(){
    const user = useUser()
    return(
        <div className ="flex justify-center items-center gap-4 flex-wrap">
            <UserButton />
            {user.user?.username}
        </div>
    )
}

export default Header;