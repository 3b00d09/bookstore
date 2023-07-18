import {Link} from "react-router-dom";
interface BookProps {
    book: BookData
  }

interface CategoryData{
    name: string 
}

export interface BookData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryData[];
  stock: number;
  interactionsCount: number;
  releaseDate: string;
  categories:string[]
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
      <div onClick={appendInteractions}>
        <Link to={url}><img className ="max-w-none w-28 md:w-32 rounded-lg panel-img" src ="src/assets/TestCover.jpg"/></Link>
      </div>
    );
  
}
  
  export default Book;