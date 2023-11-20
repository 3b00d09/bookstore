import { Link } from "react-router-dom"
import { useClerk, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react"

export default function MobileNav(){

    const { signOut } = useClerk()

    const toggleSideBar = (e: any) =>{
        // this is all super scuffed but sidebar is a distant relative of this component and i cba do it another way
        const sideBar:HTMLDivElement | null = document.querySelector("#sidebar")
        // to know active or not
        const parent = e.target.parentElement
        const classlist = Array.from(parent.classList)

        if(classlist.includes("bg-gray-900")){
            parent.classList.remove("bg-gray-900")
            sideBar?.classList.add("hidden")

        }
        else{
            parent.classList.add("bg-gray-900")
            sideBar?.classList.add("fixed", "bg-black", "w-full")
            sideBar?.classList.remove("hidden", "sticky")

            const bg:HTMLElement  = document.createElement("div")
            bg.classList.add("bg-black", "z-50")
            sideBar?.appendChild(bg)

        }



    }
    return(
        <div className="bottom-0 w-screen sticky p-2 bg-secondary md:hidden z-50">
                <ul className ="list-none justify-around items-center gap-4 basis-1/4 flex">
                    <SignedIn>
                        <li className ="py-1 px-2 hover:cursor-pointer">
                                <i className="fa-solid fa-book" onClick={toggleSideBar}></i>
                        </li>

                        <li className ="py-1 px-2 hover:cursor-pointer">
                            <Link to="/">
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </li>
                        <li className ="py-1 px-2 hover:cursor-pointer">
                                <Link to="/cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                        </li>
                        <li className ="py-1 px-2 hover:cursor-pointer">
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