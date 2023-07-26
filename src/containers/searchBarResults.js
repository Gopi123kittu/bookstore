import React, { useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BookContext} from './index.js'
import Bookminiview from "./Bookminiview";

const searchBarResults = () => {

  const [books, setBooks] = useState();
  const [bookDataLoaded, setbookDataLoaded] = useState()
  const { item } = useParams();

  const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {params: { 
        q: item, 
    },
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
  }, [item]);

  

  return (
    <div>
          <Navbar></Navbar>
          <section className="py-5">
                                
                                {/* using context */}
                                <BookContext.Provider value={books}>
                                  <Bookminiview />
                                </BookContext.Provider>

                    <Footer></Footer>
                </section>

      </div>
  )
}

export default searchBarResults
