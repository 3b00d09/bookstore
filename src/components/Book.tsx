import {Link} from "react-router-dom";

interface BookProps {
    book: BookData
  }

export interface BookData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: Array<Int16Array>
}

function Book(props: BookProps) {
    const book = props.book  
    const url = `/book/${book.id}`
    return (
      <div className="flex flex-col items-stretch">
        <Link to={url}><img className ="w-32" src ="src/assets/Samplebook.png"/></Link>
        <div className="w-32 p-2 bg-zinc-900 h-full flex flex-col justify-between">
            <div className="py-1">{book.title}</div>
            <div>£{book.price}</div>
        </div>
      </div>
    );
  }
  
  export default Book;