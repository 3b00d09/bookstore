import { useState} from "react";
import "./style.css"



function PostBook(){

    const [bookTitle, setBookTitle] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [bookPrice, setBookPrice] = useState("");
    const [bookStock, setBookStock] = useState("")


    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setBookTitle(e.target.value);
      };
    
      const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBookDescription(e.target.value);
      };
    
      const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookPrice(e.target.value);
      };

      const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookStock(e.target.value);
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Book = {
            title: bookTitle,
            price: parseFloat(bookPrice),
            description: bookDescription,
            categories: [2],
            stock: parseInt(bookStock)
        }

        const response = await fetch("https://bookstore-git-main-diyararashid123.vercel.app/book/create",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(Book),

        })

        const res = await response.json()
        console.log(res)
      };

    return(
        <form className = "form" onSubmit={handleSubmit}>
            <input type ="text" placeholder="Book title" onChange={handleTitleChange}></input>
            <textarea placeholder="Book description" onChange={handleDescriptionChange}></textarea>
            <input type ="number" placeholder="Book price" onChange={handlePriceChange}></input>
            <input type="number" placeholder="Stock " onChange={handleStockChange}></input>
            <button type="submit">SUBMIT</button>
        </form>
    )
}


export default PostBook;