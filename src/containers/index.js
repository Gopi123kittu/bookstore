import React, { useState, useEffect} from "react";
import axios from "axios";
import Bookminiview from "./Bookminiview";
import '../css/Style.css';
import Navbar from "./Navbar";
import Footer from "./Footer";



export const BookContext = React.createContext();

export default function () {

    const [books, setBooks] = useState()
    const [bookDataLoaded, setbookDataLoaded] = useState()
    
    // using context in order to send the data to another component
    


    
    const fetchBookData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/books', {
            headers: { "Access-Control-Allow-Origin": "*" }
          });
          
          console.log(response.data);
          return { success: true, data: response.data };
        } catch (error) {
          console.error(error);
          return { success: false, error: error.message };
        }
      }
      

        useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await fetchBookData();
              if (res.success) {
                setBooks(res.data);
                setbookDataLoaded(true);
              } else {
                console.error(res.error);
              }
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchData();
        }, []);
      
        // return (
        //   <div>
        //     {bookDataLoaded ? (
        //       <div>
        //         <ul>
        //           {books.map(book => (
        //             <li key={book.id}>
        //               <h3>{book.title}</h3>
        //               <p>{book.author}</p>
        //               {/* Additional book details */}
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //     ) : (
        //       <p>No books found</p>
        //     )}
        //   </div>
        // );
      
    

        return (

            <div>
                <body>
        
                    <Navbar></Navbar>
        
                <section className="py-5">
                                
                                {/* using context */}
                                <BookContext.Provider value={books}>
                                  <Bookminiview />
                                </BookContext.Provider>

                    <Footer></Footer>
                </section>
                </body>
            </div>
        )

}

