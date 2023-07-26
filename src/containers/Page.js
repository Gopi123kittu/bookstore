// export default DynamicPagination;
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/Style.css';
import { Navigate, useNavigate } from 'react-router-dom'

const DynamicPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [bookDataLoaded, setbookDataLoaded] = useState();
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const viewBook = (bookid) => {
    navigate('/bookdetailview/' + bookid);
  };

  const fetchBookData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        params: { _page: 1, _limit: 3 },
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      console.log(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchBookData();
        if (res.success) {
          setBooks(res.data);
          setbookDataLoaded(true);
          setTotalPages(Math.ceil(res.data.length / 2));
        } else {
          console.error(res.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchPaginationBookData = async (page) => {
    try {
      const response = await axios.get('http://localhost:3000/books', {
        params: { _page: page, _limit: 3 },
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      console.log(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    const res = await fetchPaginationBookData(page);
    if (res.success) {
      setBooks(res.data);
      setbookDataLoaded(true);
    } else {
      console.error(res.error);
    }
  };

  return (
    <body>
      <Navbar></Navbar>

      <section className="py-5">
        {bookDataLoaded && (
          <div>
            {books.map((book) => (
              <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  <div className="col mb-5">
                    <div className="card h-100">
                      <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
                        Sale
                      </div>
                      <img className="card-img-top" src="https://picsum.photos/200/300" alt="..." />
                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder" key={book.id}>
                            {book.title}
                          </h5>
                          <span>Author: {book.author}</span>
                          <br></br>
                          <span>Published: {book.published}</span>
                        </div>
                      </div>
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <a className="btn btn-outline-dark mt-auto" onClick={() => viewBook(book.id)}>
                            View Book
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
      </section>

      <Footer></Footer>
    </body>
  );
};

export default DynamicPagination;
