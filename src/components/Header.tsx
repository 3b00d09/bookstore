import { SignInButton, SignOutButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut} from "@clerk/clerk-react";
import {Link} from "react-router-dom";
import Search from "./Search";

function Header(){
    return(
        <header className="flex justify-between items-center bg-zinc-800 flex-wrap p-4">
            <Logo />
            <Search />
            <SignedIn>
                <ul className ="list-none flex justify-center items-center flex-wrap gap-4 basis-1/4">
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
            </SignedIn>
            <SignedOut>
                <ul className ="list-none flex justify-center items-center flex-wrap gap-4">
                    <li className ="">
                        <SignInButton />
                    </li>
                    <li className ="">
                        <SignUpButton />
                    </li>
                </ul>
            </SignedOut>
        </header>

    )
}


function Logo(){
    const user = useUser()
    return(
        <div className ="flex justify-center items-center gap-4 flex-wrap basis-1/4">
            <UserButton />
            {user.user?.username}
        </div>
    )
}

export default Header;