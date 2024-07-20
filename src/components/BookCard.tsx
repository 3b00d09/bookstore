interface BookProps {
    book: BookData
    header: string
  }

interface CategoryData{
    name: string 
    id:string
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
      <div className="grid grid-rows-2 h-full">
        <img
          src="src/assets/mainBannerbg.jpg"
          className="aspect-[3/4] w-full object-cover transition-opacity group-hover:opacity-80"
        />
        <div className="grid grid-rows-[auto_auto_auto] gap-2 place-content-center p-2">
          <h3 className="text-lg font-bold text-center line-clamp-2 h-16">
            {book.title}
          </h3>

          <div className="flex flex-col justify-start h-20 overflow-hidden">
            {book.category && book.category.length > 0 ? (
              book.category.map((category) => (
                <p
                  key={category.id}
                  className="text-[#604c77] text-center text-lg"
                >
                  {category.name}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-center text-sm">No categories</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center items-center mt-auto">
            <button className="rounded-lg px-2 py-1 text-xs font-semibold bg-[#653899] text-[#f9f8fa] hover:cursor-default">
              {props.header}
            </button>
            <a href={url} onClick={appendInteractions} className="rounded-lg px-2 py-1 text-xs font-semibold bg-[#653899] text-[#f9f8fa]">
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
  
}
  
  export default Book;