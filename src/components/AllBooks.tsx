
function AllBooks(){

    const Books = [
        {
            id:1,
            title: "book1",
            price: 8.95,
            description: "book1 test description im just gonna say random stuff oh well time to stop now i think",
            category: {
                1: "Horror",
                2: "Action"
            }
        },
        {
            id: 2,
            title: "book2",
            price: 3.25,
            description: "book2 test description im just gonna say random stuff oh well time to stop now i think",
            category: {
                3: "Comedy",
                4: "Adventure"
            }
        },
        {
            id: 3,
            title: "book3",
            price: 6.61,
            description: "book3 test description im just gonna say random stuff oh well time to stop now i think",
            category: {
                5: "Fani",
            }
        },
        {
            id: 4,
            title: "book4",
            price: 12.34,
            description: "book4 test description im just gonna say random stuff oh well time to stop now i think",
            category: {
                1: "Horror",
            }
        },

    ]

    return(
        <div className="flex flex-wrap gap-4 items-center m-6 flex-1 content-start ">
        {Books.map((book) =>(
            <div key = {book.id}>
                <img className ="w-32 mb-2" src ="src/assets/Samplebook.png"/>
                <div className="px-2">
                    <div>{book.title}</div>
                    <div>{book.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</div>
                </div>
            </div>
        ))}
        </div>
    )
}


export default AllBooks;
