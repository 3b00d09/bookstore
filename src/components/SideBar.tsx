import { useEffect, useState } from "react"

interface CategoryData{
    id: number,
    name: string,
}

function SideBar(){
    const [categories ,setCategories] = useState<CategoryData[]>([])   
    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("https://bookstore-eight-xi.vercel.app/categories")
            const res = await response.json()
            setCategories(res)
        }
        fetchBooks();

    }, [])
    
    return(
        <div className="max-w-xs bg-zinc-900 p-8 h-full">
            <h1 className="my-2">Categories</h1>
            <ul>
                {categories &&(
                    categories.map((category) =>{
                        return <li>{category.name}</li>
                    })
                )}
            </ul>
        </div>
    )
}

export default SideBar;