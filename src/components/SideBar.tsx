import { useEffect, useState, useContext } from "react"

interface CategoryData{
    id: number,
    name: string,
}

type FilterType = {
    categoryFilter: string[];
    setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
    priceFilter: number;
    setPriceFilter: React.Dispatch<React.SetStateAction<number>>;
    languageFilter: string;
    setLanguageFilter: React.Dispatch<React.SetStateAction<string>>;
  };


function SideBar({categoryFilter, setCategoryFilter, priceFilter, setPriceFilter, languageFilter, setLanguageFilter}: FilterType){

    const [categories ,setCategories] = useState<CategoryData[]>([])   

    // arrays to store the checkboxes so that later on whenever a checkbox is clicked i loop over these arrays and disable them all except clicked
    // this is to force user to only select one price fitler or one language filter. hacky solution but it works 
    // used any type because i couldnt figure out what type to give when using document.querySelectorAll
    const [languageCheckboxes, setLanguageCheckBoxes] = useState<any>()
    const [priceCheckboxes, setPriceCheckboxes] = useState<any>()
 

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

    const handleLanguageCheckbox = async(e:React.ChangeEvent<HTMLInputElement>) =>{
        languageCheckboxes.forEach((element:any) =>{
            if(e.target !== element) element.checked = false;
        })

        // this just clears filter when the function is called by an element that was unchecked
        e.target.checked ? setLanguageFilter(e.target.value) : setLanguageFilter("") 
    }

    const handlePriceCheckbox = async(e:React.ChangeEvent<HTMLInputElement>) =>{
        priceCheckboxes.forEach((element:any) =>{
            if(e.target !== element) element.checked = false;
        })

        // this just clears filter when the function is called by an element that was unchecked
        e.target.checked ? setPriceFilter(parseInt(e.target.value)) : setPriceFilter(0)   
    }



    useEffect(() =>{

        const fetchBooks = async()=>{
            const response = await fetch("https://bookstore-eight-xi.vercel.app/categories")
            const res = await response.json()
            setCategories(res)
        }

        fetchBooks();

        setLanguageCheckBoxes(document.querySelectorAll(".language-checkbox"))
        setPriceCheckboxes(document.querySelectorAll(".price-checkbox"))

    }, [])

    
    
    return(
        <div className="top-0 max-w-xs bg-zinc-900 p-8 h-screen sticky">
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

            <h2 className="text-2xl mt-2 mb-1">Languages</h2>
            <ul>
                <div className="flex flex-row gap-1 justify-center align-center w-max">
                    <input type="checkbox" value="arabic" className="language-checkbox" onChange={handleLanguageCheckbox}></input>
                    <label>Arabic</label>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" value="english" className="language-checkbox" onChange={handleLanguageCheckbox}></input>
                    <li>English</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" value="spanish" className="language-checkbox" onChange={handleLanguageCheckbox}></input>
                    <li>Spanish</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" value="Chinese" className="language-checkbox" onChange={handleLanguageCheckbox}></input>
                    <li>Chinese</li>
                </div>
            </ul>

            <h2 className="text-2xl mt-2 mb-1">Price</h2>
            <ul>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" className="price-checkbox" value="5" onChange={handlePriceCheckbox}></input>
                    <li>Under $5</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" className="price-checkbox" value="20" onChange={handlePriceCheckbox}></input>
                    <li>$5-20</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" className="price-checkbox" value="50" onChange={handlePriceCheckbox}></input>
                    <li>$20-50</li>
                </div>
                <div className="flex gap-1 justify-center align-center w-max">
                    <input type="checkbox" className="price-checkbox" value="100" onChange={handlePriceCheckbox}></input>
                    <li>$100+</li>
                </div>
            </ul>
        </div>
    )
}

export default SideBar;