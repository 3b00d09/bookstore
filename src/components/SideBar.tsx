import { useEffect, useRef, useState } from "react"
import "../index.css"
import { useNavigate } from "react-router-dom"

interface props{
    activeSidebar: boolean,
    setsideBarActive: React.Dispatch<React.SetStateAction<boolean>>,
    activeCategories: String[],
    setActiveCategories: React.Dispatch<React.SetStateAction<String[]>>
}
function SideBar(props:props ){

    const categorySelectParent = useRef<HTMLUListElement>(null)
    const redirect = useNavigate()

    
    const handleCategoryClick = (e:React.MouseEvent<HTMLElement>) =>{
        // if sidebar is disabled due to fetch state (categoryResults.tsx) then we dont do anything
        if(!props.activeSidebar){
            console.log("off")
            return
        }
        const element = e.target as HTMLElement
        const categoryName = element.id as string
        
        if(props.activeCategories.includes(categoryName)){
            // filter out the category that exists
            props.setActiveCategories(props.activeCategories.filter((element) =>{
                return element !== categoryName
            }))
        }
        else{
            props.setActiveCategories([...props.activeCategories, categoryName])
        }
    }

    // whenever active categories change we check if it has any items in it we redirect with those items
    useEffect(() =>{
        // color the icons whenever activeCategories changes
        const elements =  document.querySelectorAll(".category-select")
        elements.forEach((element) =>{
            if(props.activeCategories.includes(element.id)){
                element.classList.add("text-red-900")
            }
            else{
                element.classList.remove("text-red-900")
            }
        })
        
        if(props.activeCategories.length > 0){
            const allCategories = props.activeCategories.join(",")
            const redirectUrl = (`/categories/${encodeURI(allCategories)}`)
            redirect(redirectUrl)
        }
        
        // check to see if categories is empty AND we are on the categories page, basically means if user unselected all categories we return to home
        else if(props.activeCategories.length === 0 && location.pathname.startsWith("/categories")){
            redirect("/")
        }
    },[props.activeCategories])

    return(
        <div id="sidebar" className="max-w-xs bg-secondary-purple p-6 hidden lg:block sticky top-0 left-0 h-screen">

                <h2 className="text-2xl mb-1 font-semibold">Categories</h2>

                {/* dont know how to grid with tailwind without having minmax */}
                <ul className="icon-grid mt-4" ref={categorySelectParent}>
                    <i onClick={handleCategoryClick} id={"Self-help"}className="category-select hover:cursor-pointer fa-solid fa-person-dots-from-line"></i><p>Self-help</p>
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
                <div className="fixed bottom-8">
                    <p>Frontend by Annon</p>
                    <p>Backend by Jexzz</p>
                </div>
            </div>


            )}

export default SideBar