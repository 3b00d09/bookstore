import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import BookCard, { BookData } from "../../components/BookCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface dataType{
    books: BookData[],
    totalPages: number,
    currentPage: number,
    totalCount: number
}

function OrderHistory(){

    const user = useUser()
    const {getToken} = useAuth()
    const [currPage, setCurrpage] = useState(1)

    const {data, isLoading, isError, isSuccess} = useQuery({queryKey:["orderHistory", currPage], queryFn: fetchHistory})

    async function fetchHistory(){
        const myToken = await getToken()
        const response = await fetch(`https://bookstore-git-main-diyararashid123.vercel.app/purchases/?page=${currPage}`,{
            method: "POST",
            body: JSON.stringify({userId:user.user?.id}),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myToken}`
            }
        })
        const res = await response.json()
        return res as dataType;
    }

    return(
        <div>
            {isSuccess&&(
                <>
                    <AnimatePresence>
                        <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 xl:gap-12">
                        {data.books.length === 0 &&(
                                <>
                                    No Items Found.
                                </>
                            )}
                            {data.books.map((book:BookData, i:number)=>{
                                return(
                                    <Link key={i} to={`/book/${book.id}`}>
                                        <motion.div 
                                        whileHover={{scale: 1.2}}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.6, ease:"easeInOut"}}
                                        >
                                        <img className ="max-w-none w-28 md:w-32 rounded-lg" src="../src/assets/testCover.jpg"></img>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </AnimatePresence>
                    <div className="flex gap-6 justify-center items-center my-6">
                        {[...Array(data.totalPages)].map((page, i) =>{
                            return(
                                <div onClick={()=>setCurrpage((i + 1))} 
                                className={`p-2 rounded-lg hover:cursor-pointer ${i + 1 === currPage ? "bg-gray-300" : "bg-secondary-purple "}`} 
                                key={i}>{i + 1}
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
            {isLoading&&(
                <>
                    LOADING
                </>
            )}
            {isError&&(
                <>
                    Could not load data.
                </>
            )}
        </div>
    )
}

export default OrderHistory;


