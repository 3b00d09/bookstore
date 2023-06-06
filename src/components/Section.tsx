import  {BookData}  from "./Book";
import Book from "./Book";

interface sectionProps{
    books: BookData[],
}


export default function Section(props: sectionProps){

    return(

        <div className="flex flex-wrap gap-4 justify-around">
            {props.books.slice(0, 7).map((book) =>{
                return <Book book = {book} key={book.id}/>
            })}
        </div>
        )

}

