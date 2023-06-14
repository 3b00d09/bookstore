import { useEffect, useState } from "react"

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
        <div id="sidebar" className="max-w-xs bg-zinc-900 p-8 h-screen sticky hidden md:block md:top-0">
            <div>
            <h2 className="text-2xl mb-1">Categories</h2>
                <ul>
                    {categories &&(
                        categories.map((category) =>{
                            return (
                            <div key={category.id} id="category-select" className="flex gap-1 justify-center align-center w-max">
                                <input type="checkbox" value={category.name} onChange={handleCategoryCheckbox}></input>
                                <li>{category.name}</li>
                            </div>
                            )
                        })
                    )}
                </ul>
            </div>


        </div>
    )
}

export default SideBar;