import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const LocationBooks = () => {

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

      
  return (
    <div>
      <Navbar></Navbar>
      <section className="py-5">


      <Footer></Footer>  
      </section>
          
    </div>
  )
}

export default LocationBooks
