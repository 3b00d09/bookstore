import  {BookData}  from "./Book";
import Book from "./Book";

interface sectionProps{
    books: BookData[]
}


export default function Section(props: sectionProps){
    return(
        <div className="flex flex-wrap gap-4 mx-4">
            {props.books.map((book) =>{
                return <Book book = {book} key={book.id}/>
            })}
        </div>
    )
}

