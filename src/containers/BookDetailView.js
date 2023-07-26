import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BookContext} from './index.js'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from  'react-router-dom'


const BookDetailview = () => {

    const [books, setBooks] = useState();
    const [bookDataLoaded, setbookDataLoaded] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {params:
      {id: id},
        headers: { "Access-Control-Allow-Origin": "*" }
      });
      
      console.log(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }

const deleteItem = async (bookId) => {
    try {
        const response = await axios.delete('http://localhost:3000/books/' + bookId, {
          headers: { "Access-Control-Allow-Origin": "*" }
        });
        console.log(response.data);
        alert("book succssfully deleted, moving to home page");
        navigate('/index')
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
  }, [id]);


  const editBook = (id) => {
    alert("reacted");
    localStorage.setItem('editForm', true);
    navigate('/addbook/' + id + '/' + true)
  }
  // code to avoid undefined error when raises due to components loads the book data without loading properly
  // to avoid that error we need to make sure books data is available if not we will show below code
  if (!books || books.length === 0) {
    //const isLoggedin = localStorage.getItem('isLoggedin');
    return <div>No books available.</div>;
  }


  return (
    <div>
          <Navbar></Navbar>
          <section className="py-5">
                                {/* using context */}
                                <Container>
                                <Row>
                                    <Col><img className="card-img-top" src={books[0].image_path} alt="..." /></Col>
                                    <Col>
                                             <div className="text-left">
                                                <h5 className="fw-bolder">{books[0].title}</h5>
                                                <span>Author: {books[0].author} </span><br></br>
                                                <span>Published: {books[0].published}</span><br></br>
                                                <span>Pages: {books[0].pages} </span><br></br>
                                             <span>Descrption: {books[0].description} </span><br></br>
                                            </div>
                                            </Col>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col>
                                        <br></br>
                                        
                                        <Button variant="primary" onClick={() => editBook(books[0].id)}>Edit</Button>{' '}
                                            
                                        <Button variant="primary" onClick={() => deleteItem(books[0].id)}>Delete</Button>
                                        

                                    </Col>
                                    
                                    <Col></Col>
                                </Row>
                                </Container>
                                <br></br>
                    <Footer></Footer>
                </section>

      </div>
  )
}

export default BookDetailview
