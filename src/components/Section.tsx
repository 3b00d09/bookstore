import  {BookData}  from "./BookCard";
import BookCard from "./BookCard";

interface sectionProps{
    books: BookData[],
}


export default function Section(props: sectionProps){

    return(
        <div className="flex flex-wrap">
            {props.books.map((book) =>{
                return <BookCard book = {book} key={book.id}/>
            })}
        </div>
        )
}

