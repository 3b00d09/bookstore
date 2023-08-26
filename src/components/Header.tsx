import { SignInButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut, SignOutButton} from "@clerk/clerk-react";
import {Link} from "react-router-dom";
import Search from "./Search";

function Header(){
    return(
        <header className="flex justify-between items-center bg-secondary-purple flex-wrap p-4 sticky top-0 z-40">

                <Logo />
                <Search />
                <SignedIn>
                    <ul className ="list-none justify-center items-center flex-wrap gap-4 basis-1/4 hidden md:flex">
                        <Link to="/">
                            <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            
                                <p className="hidden md:block font-semibold">Home</p>
                                <i className="fa-solid fa-house md:hidden"></i>
                            </li>
                        </Link>
                        <Link to="/profile/cart">
                            <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                                
                                    <p className="hidden md:block font-semibold">Cart</p>
                                    <i className="fa-solid fa-cart-shopping md:hidden"></i>
                                
                            </li>
                        </Link>
                        <li className ="py-1 px-2 hover:cursor-pointer">
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
            <div className ="justify-center items-center gap-4 flex-wrap hover:bg-gray-700 hover:cursor-pointer p-2 hidden md:flex">
                <UserButton />
                <p className="hidden md:block font-semibold">{user.user?.username}</p>
            </div>
        </Link>
    )
}

export default Header;