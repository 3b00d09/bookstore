import {Link} from "react-router-dom";
interface BookProps {
    book: BookData
  }

export interface BookData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: Array<Int16Array>;
  quantity: number;
  interactionsCount: number;
  releaseDate: string
}

function Book(props: BookProps) {
    const book = props.book  
    const url = `/book/${book.id}`

    const appendInteractions = async() =>{

      const interactions: BookData[] = JSON.parse(localStorage.getItem("interactions") || "[]") as BookData[];
      const index = interactions.findIndex(obj => obj.id === book.id);

      if(index !== -1){
        interactions[index].interactionsCount += 1
        localStorage.setItem("interactions", JSON.stringify(interactions))
      }

      else{
        const interaction ={
          id: book.id,
          interactionsCount: 1
        }
        
        const updatedInteractions = [...interactions, interaction]
        localStorage.setItem("interactions", JSON.stringify(updatedInteractions))
      }

    }

    return (
      <div onClick={appendInteractions} className="flex flex-col items-stretch p-2">
        <Link to={url}><img className ="w-44 bg-gray-900  border-8 border-yellow-800 rounded-lg" src ="src/assets/NoBookAvailable.png"/></Link>
        <div className="w-44 p-2 bg-zinc-900 h-full flex flex-col justify-between ">
            <div className="py-1">{book.title}</div>
            <div>£{book.price}</div>
        </div>
      </div>
    );
  
}
  
  export default Book;