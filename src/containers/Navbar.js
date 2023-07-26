import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom'
import '../css/Style.css'
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navbar = () => {

  
  const [AddBook, setAddBook] = useState(false);
  const [Home, setHome] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  

    if (AddBook){
            return <Navigate to="/AddBook" />
    };

    if (Home){
        return <Navigate to="/index" />
    };

    const fetchBookPerLocation = (location) => {
        navigate('/booksperlocation/' + location);
    };

    const searchEventhandler = (event) => {
        setSearch(event.target.value)
    };

    const searchBar = () => {
        navigate('/searchbarresults/' + search);
    };

    const logOut = () => {
        alert("clicked logout");
        const isLoggedin = localStorage.getItem('isLoggedin');
        if (isLoggedin) {
            //
            localStorage.removeItem('isLoggein');
            // remove all
            localStorage.clear();
            navigate('/login')
        }
    }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <div className="container px-4 px-lg-5">
                            <a className="navbar-brand" href="#!">The Last Chapter</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                                    <li className="nav-item"><a className="nav-link active" aria-current="page" onClick={() => setHome(true)}>Home</a></li>
                                    <li className="nav-item"><a className="nav-link active" aria-current="page" onClick={() => setAddBook(true)}>Add Book</a></li>
                                     <Nav>
                                        <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title="Shop By location"
                                        menuVariant="dark">
                                            {/* ref: calling a function with parameters example below */}
                                        <NavDropdown.Item onClick={() => fetchBookPerLocation('stuttgart')}>Stuttgart</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => fetchBookPerLocation('frankfurt')}>Frankfurt</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    
                                </ul>

                            </div>
                            <Form className="d-flex">
                                        <Form.Control
                                        type="search"
                                        placeholder="eg: bookname,pub date, author name"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={searchEventhandler}
                                        />
                                        <Button variant="outline-success" onClick={() => searchBar()}>Search</Button>
                            </Form>
                            
                            <Button variant="light" onClick={logOut}>Logout</Button>{' '}
                        </div>
                            
                    </nav>
        
                    <header className="bg-dark py-5">
                        <div className="container px-4 px-lg-5 my-5">
                            <div className="text-center text-white">
                                <h1 className="display-4 fw-bolder">The Last Chapter</h1>
                                <p className="lead fw-normal text-white-50 mb-0">Shop Wide Range of Books</p>
                            </div>
                        </div>
                    </header>
                     
    </div>
  )
}

export default Navbar
