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
        <div className="top-0 max-w-xs bg-zinc-900 p-8 h-screen sticky">
            <h2 className="text-2xl mb-1">Categories</h2>
            <ul>
                {categories &&(
                    categories.map((category) =>{
                        return (
                        <div key={category.id} className="flex gap-1 justify-center align-center w-max">
                            <input type="checkbox"></input>
                            <li>{category.name}</li>
                        </div>
                        )
                    })
                )}
            </ul>

            <h2 className="text-2xl mt-2 mb-1">Languages</h2>
            <ul>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>English</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>English</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>English</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>English</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>English</li>
                </div>
            </ul>

            <h2 className="text-2xl mt-2 mb-1">Price</h2>
            <ul>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>Under $5</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>$5-20</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>$20-50</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox"></input>
                    <li>$100+</li>
                </div>
            </ul>
        </div>
    )
}

export default SideBar;