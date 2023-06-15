import React from "react"
import { useEffect, useState } from "react";
import { BookData } from "../components/BookCard"
import Section from "../components/Section";
import { useUser } from "@clerk/clerk-react";



export default function Cart (){

    const [cartItems, setCart] = useState<BookData[]>([])
    const user = useUser()

    useEffect(() =>{

        const getCart = async()=>{
            const cart: BookData[] = JSON.parse(localStorage.getItem("cart") || "[]") as BookData[];
            setCart(cart)
        }
        getCart();

    }, [])

    const processPurchase = async () =>{
        const cart = {
            userId: user.user?.id,
            cart: cartItems
        }
        
        const response = await fetch("https://bookstore-eight-xi.vercel.app/book/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(cart)
        })

        const res = await response.json()
        console.log(res)
        localStorage.setItem("cart", JSON.stringify([]))
    }

    return (
        <React.Fragment>
            <h1 className="text-3xl p-4">Cart</h1>

            {user.isSignedIn &&(
            <>            
            <div className="grid content-start items-stretch my-4">
            {cartItems ? 
            <Section books={cartItems}/>
            : 
            <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
            </div>
            {cartItems.length > 0?(
                <button onClick={processPurchase}>SENDED CART</button>
            ):(
                <div>Cart is empty.</div>
            )}

            </>
            )}

        </React.Fragment>
    )
}

