import { SignInButton, SignUpButton, UserButton, useUser, SignedIn, SignedOut, SignOutButton} from "@clerk/clerk-react";
import {Link} from "react-router-dom";
import Search from "./Search";

function Header(){
    return(
        <header className="flex justify-between items-center bg-zinc-800 flex-wrap p-4">
            <Logo />
            <Search />
            <SignedIn>
                <ul className ="list-none flex justify-center items-center flex-wrap gap-4 basis-1/4">
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                        <Link to="/">Home</Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                        <Link to="/create">Post book</Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <Link to="/cart">Cart</Link>
                    </li>
                    <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
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
        <Link to="/profile">
            <div className ="flex justify-center items-center gap-4 flex-wrap hover:bg-gray-700 hover:cursor-pointer p-2">
                <UserButton />
                {user.user?.username}
            </div>
        </Link>
    )
}

export default Header;