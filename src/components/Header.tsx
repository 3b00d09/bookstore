import { SignInButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut, SignOutButton} from "@clerk/clerk-react";
import {Link} from "react-router-dom";
import Search from "./Search";

function Header(){
    return(
        <header className="flex justify-between items-center bg-zinc-800 flex-wrap p-4 sticky">
            <Logo />
            <Search />
            <SignedIn>
                <ul className ="list-none justify-center items-center flex-wrap gap-4 basis-1/4 hidden md:flex">
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                        <Link to="/">
                            <p className="hidden md:block">Home</p>
                            <i className="fa-solid fa-house md:hidden"></i>
                        </Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                        <Link to="/create">
                            <p className="hidden md:block">Post Book</p>
                            <i className="fa-solid fa-house md:hidden"></i>
                        </Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <Link to="/cart">
                                <p className="hidden md:block">Cart</p>
                                <i className="fa-solid fa-cart-shopping md:hidden"></i>
                            </Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <SignOutButton />
                    </li>
                </ul>
            </SignedIn>
            <SignedOut>
                <ul className ="list-none justify-center items-center gap-4 hidden md:flex">
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
        <Link to="/profile">
            <div className ="flex justify-center items-center gap-4 flex-wrap hover:bg-gray-700 hover:cursor-pointer p-2 hidden md:block">
                <UserButton />
                <p className="hidden md:block">{user.user?.username}</p>
            </div>
        </Link>
    )
}

export default Header;