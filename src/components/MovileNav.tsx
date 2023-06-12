import { Link } from "react-router-dom"
import { useClerk, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"


export default function MobileNav(){

    const { signOut } = useClerk()
    return(
        <div className="bottom-0 w-screen sticky p-2 bg-zinc-800 md:hidden">
                <ul className ="list-none justify-around items-center gap-4 basis-1/4 flex">
                    <SignedIn>
                        <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <Link to="/">
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </li>
                        <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <Link to="/create">
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </li>
                        <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                                <Link to="/cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                        </li>
                        <li className ="py-1 px-2 hover:bg-gray-700 hover:cursor-pointer">
                            <i className="fa-solid fa-arrow-right-from-bracket" onClick={() => signOut()}></i>
                        </li>
                    </SignedIn>
                    <SignedOut>
                        <li className ="">
                            <SignInButton />
                        </li>
                        <li className ="">
                            <SignUpButton />
                        </li>
                    </SignedOut>
                </ul>
        </div>
    )
}