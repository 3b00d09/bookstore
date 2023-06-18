import { useEffect, useRef, useState } from "react"
import "../index.css"
import { useNavigate } from "react-router-dom"

function SideBar(){

    const categorySelectParent = useRef<HTMLUListElement>(null)
    const [activeCategories, setActiveCategories] = useState<String[]>([])
    const redirect = useNavigate()

    
    const handleCategoryClick = (e:React.MouseEvent<HTMLElement>) =>{
        const element = e.target as HTMLElement
        const classList = Array.from(element.classList)
        classList.includes("bg-red-900")? element.classList.remove("bg-red-900") : element.classList.add("bg-red-900")

        if(categorySelectParent.current){
            const children = categorySelectParent.current.querySelectorAll(".category-select")
            let currActiveCategories:String[] = []
            children.forEach((child) =>{
                const childClasses = Array.from(child.classList)
                if(childClasses.includes("bg-red-900")){
                    currActiveCategories.push(child.id)
                }
            })
            setActiveCategories(currActiveCategories)
        }
    }

    // whenever active categories change we check if it has any items in it we redirect with those items
    useEffect(() =>{
        if(activeCategories.length > 0){
            const allCategories = activeCategories.join("&")
            const redirectUrl = (`/categories/${encodeURI(allCategories)}`)
            redirect(redirectUrl)
        }
        
        // check to see if categories is empty AND we are on the categories page, basically means if user unselected all categories we return to home
        else if(activeCategories.length === 0 && location.pathname.startsWith("/categories")){
            redirect("/")
        }
    },[activeCategories])

    return(
        <div id="sidebar" className="max-w-xs bg-zinc-900 p-8 h-screen sticky hidden lg:block md:top-0">
            <div>
                <h2 className="text-2xl mb-1">Categories</h2>

                {/* dont know how to grid with tailwind without having minmax */}
                <ul className="icon-grid mt-4" ref={categorySelectParent}>
                    <i onClick={handleCategoryClick} id={"Self-help"}className="category-select hover:cursor-pointer fa-solid fa-person-dots-from-line focus:bg-red-900"></i><p>Self-help</p>
                    <i onClick={handleCategoryClick} id={"Sci-Fi"}className="category-select hover:cursor-pointer fa-solid fa-rocket"></i><p>Sci-Fi</p>
                    <i onClick={handleCategoryClick} id={"Mystery"}className="category-select hover:cursor-pointer fa-solid fa-question"></i><p>Mystery</p>
                    <i onClick={handleCategoryClick} id={"Biography"}className="category-select hover:cursor-pointer fa-solid fa-book-open"></i><p>Biography</p>
                    <i onClick={handleCategoryClick} id={"Romance"}className="category-select hover:cursor-pointer fa-solid fa-heart-crack"></i><p>Romance</p>
                    <i onClick={handleCategoryClick} id={"History"}className="category-select hover:cursor-pointer fa-solid fa-landmark"></i><p>History</p>
                    <i onClick={handleCategoryClick} id={"Children"}className="category-select hover:cursor-pointer fa-solid fa-children"></i><p>Children</p>
                    <i onClick={handleCategoryClick} id={"Business"}className="category-select hover:cursor-pointer fa-solid fa-briefcase"></i><p>Business</p>
                    <i onClick={handleCategoryClick} id={"Fantasy"}className="category-select hover:cursor-pointer fa-solid fa-khanda"></i><p>Fantasy</p>
                    <i onClick={handleCategoryClick} id={"Fiction"}className="category-select hover:cursor-pointer fa-solid fa-glasses"></i><p>Fiction</p>
                    <i onClick={handleCategoryClick} id={"Poetry"}className="category-select hover:cursor-pointer fa-solid fa-pencil"></i><p>Poetry</p>


                </ul>
            </div>
        </div>
            )}

export default SideBar