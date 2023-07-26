import React, { useDebugValue } from 'react'
import {BookContext} from './index.js'
import '../css/Style.css';
import { Navigate, useNavigate } from 'react-router-dom'


const Bookminiview = () => {    
    const navigate = useNavigate();

    const viewBook = (bookid) => {
        navigate('/bookdetailview/' + bookid);
    };



  return (
    <div>

    <BookContext.Consumer>
    
        {value => (
            <div>
                {value && value.map ((books) => (
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    
                                    <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
                                    
                                        <img className="card-img-top" src={books.image_path} alt="..." />
                                    
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h5 className="fw-bolder" key={books.id}>{books.title}</h5>
                                                <span>Author: {books.author} </span><br></br>
                                                <span>Published: {books.published}</span>
                                            </div>
                                        </div>
                                    
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" onClick={() => viewBook(books.id)}>View Book</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </BookContext.Consumer>
    
    
    </div>
  )
}

export default Bookminiview
