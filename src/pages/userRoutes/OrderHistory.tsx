import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function OrderHistory(){

    const orderHistory =useQuery({queryKey:["popularBooks"], queryFn: fetchHistory})

    async function fetchHistory(){
        const response = await fetch("https://bookstore-eight-xi.vercel.app/books/")
    }

    return(
        <div>Order History</div>
    )
}

export default OrderHistory;