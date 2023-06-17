import { useEffect, useState } from "react"
import "../index.css"

interface CategoryData{
    id: number,
    name: string,
}

type FilterType = {
    categoryFilter: string[];
    setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
  };


function SideBar({categoryFilter, setCategoryFilter}: FilterType){

    const [categories ,setCategories] = useState<CategoryData[]>([])   
 
    const handleCategoryCheckbox = async(e:React.ChangeEvent<HTMLInputElement>) =>{

        let exists = categoryFilter.some((category) => category === e.target.value)
        if(exists){
            let newArr = categoryFilter.filter(category => category !== e.target.value)
            setCategoryFilter(newArr)
        }
        else{
            let newArr = [...categoryFilter, e.target.value]
            setCategoryFilter(newArr)
        }
    }

    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("https://bookstore-eight-xi.vercel.app/categories")
            const res = await response.json()
            setCategories(res)
        }

        fetchBooks();
    }, [])

    
    
    return(
        <div id="sidebar" className="max-w-xs bg-zinc-900 p-8 h-screen sticky hidden lg:block md:top-0">
            <div>
            <h2 className="text-2xl mb-1">Categories</h2>

                {/* dont know how to grid with tailwind without having minmax */}
                <ul className="icon-grid mt-4">
                    <i className="fa-solid fa-person-dots-from-line"></i><p>Self-help</p>
                    <i className="fa-solid fa-rocket"></i><p>Sci-Fi</p>
                    <i className="fa-solid fa-question"></i><p>Mystery</p>
                    <i className="fa-solid fa-book-open"></i><p>Biography</p>
                    <i className="fa-solid fa-heart-crack"></i><p>Romance</p>
                    <i className="fa-solid fa-landmark"></i><p>History</p>
                    <i className="fa-solid fa-children"></i><p>Children</p>
                    <i className="fa-solid fa-briefcase"></i><p>Business</p>
                    <i className="fa-solid fa-khanda"></i><p>Fantasy</p>
                    <i className="fa-solid fa-glasses"></i><p>Fiction</p>
                    <i className="fa-solid fa-pencil"></i><p>Poetry</p>
                </ul>
            </div>


        </div>
    )
}

export default SideBar;