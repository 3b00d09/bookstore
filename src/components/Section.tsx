import  {BookData}  from "./Book";
import Book from "./Book";

interface sectionProps{
    books: BookData[],
}


export default function Section(props: sectionProps){

    return(
        <div className="flex flex-wrap">
            {props.books.length === 0 &&(
                <div>No books ahahahahahaah</div>
            )}
            {props.books.map((book) =>{
                return <Book book = {book} key={book.id}/>
            })}
        </div>
        )
}

