interface BookProps {
    book: {
      id: number;
      title: string;
      price: number;
      description: string;
    };
  }

function Book(props: BookProps) {
    const book = props.book  
    return (
      <div className="flex flex-col items-stretch">
        <img className ="w-32" src ="src/assets/Samplebook.png"/>
        <div className="p-2 bg-gray-900 h-full">
            <div>{book.title}</div>
            <div>{book.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</div>
        </div>
      </div>
    );
  }
  
  export default Book;