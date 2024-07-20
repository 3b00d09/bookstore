import React from "react"
import { useEffect, useState } from "react";
import { BookData } from "../../components/BookCard";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface cartItemsId{
    id: Number
}


function ProfileCart(){
    const [cartItems, setCart] = useState<BookData[]>([])
    const user = useUser()
    const {getToken} = useAuth()

    const removeFromCart = (id:number) =>{
        const updatedCart = cartItems.filter((item) => {return item.id !== id})
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCart(updatedCart)
      }

    useEffect(() =>{

        const getCart = async()=>{
            const cart: BookData[] = JSON.parse(localStorage.getItem("cart") || "[]") as BookData[];
            setCart(cart)
        }
        getCart();

    }, [])

    const processPurchase = async () =>{
        let temp:cartItemsId[] = [] 
        cartItems.forEach((item :cartItemsId) =>{
            const book = {
                "id": item.id,
                "quantity": 1
            }
            temp.push(book)
        })

        const cart = {
            userId: user.user?.id,
            cart: temp
        }

        const myToken = await getToken()
        const response = await fetch("http://localhost:3000/book/buy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${myToken}`
              },
            body: JSON.stringify(cart)
        })

        const res = await response.json()
        // empty cart after successful purchase 
        //localStorage.setItem("cart", JSON.stringify([]))
        
    }
    
    return(
        <>
        {cartItems.length > 0 ? (
            
            <AnimatePresence>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cartItems.map((book:BookData) =>{
                return(
                    <motion.div key={book.id} className="flex gap-2 my-4"                                         
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, y:-20}}
                    transition={{ duration: 0.6, ease:"easeInOut"}}>
                        <Link to={`/book/${book.id}`}><img src ="../src/assets/TestCover.jpg" className="max-w-none w-28 md:w-32 rounded-lg"/></Link>
                        <div className="text-xl mx-2">
                            <p>{book.title}</p>
                            <p>{book.price.toFixed(2)}</p>
                            <button onClick={()=>removeFromCart(book.id)} className="p-2 text-base">Remove</button>
                        </div>
    
                    </motion.div>
                )
            })}
            
            </div>
            <button onClick={processPurchase} key={Math.random()} className="mb-10">Purchase Items</button>
            </AnimatePresence>
            
        )
        :
            <div>No Items In Cart.</div>
        }

        </>

    )
}

export default ProfileCart;