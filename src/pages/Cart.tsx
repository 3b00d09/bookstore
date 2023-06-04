import React from "react"
import { useEffect, useState } from "react";
import { BookData } from "../components/Book"
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
        const userId = user.user?.id
        const cart = {
            userId: userId,
            cart: cartItems
        }

        console.log(cart)
        
        const response = await fetch("https://bookstore-git-main-diyararashid123.vercel.app/book/buy", {
            method: "POST",
            body: JSON.stringify(cart)
        })

        const res = await response.json()
        console.log(res)
    }

    return (
        <React.Fragment>
            <h1 className="text-3xl p-4">Cart</h1>
            <div className="grid content-start items-stretch my-4">
                {cartItems ? 
                <Section books={cartItems}/>
                : 
                <div className="justify-self-center border-8 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>}
            </div>
            <button onClick={processPurchase}>SENDED CART</button>
        </React.Fragment>
    )
}
