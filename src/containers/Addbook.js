import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom'
import '../css/Style.css'
import Navbar from "./Navbar";
import Footer from "./Footer";


const AddBook = () => {
        const [cancel, setCancel] = useState(false);
        const [books, setBooks] = useState();
        const [bookDataLoaded, setbookDataLoaded] = useState();
        const { id } = useParams();
        const { edit } = useParams();


        // declare useState
        const [form, setForm] = useState({
            title: '',
            author: '',
            description: '',
            published: '',
            pages: '',
            location: '',
            image_path: "https://loremflickr.com/320/240"
        });

        // alternative for form validartion
        // const validate = (form.title != "") && (form.author != "") && (form.published != ""

        

        // handle form changes
        const handleChange = (event) => {
            setForm ({
                ...form,
                [event.target.id]: event.target.value,
            });
        };

        //validate form
        const validate = () => {
            return form.title != "" && form.location != "" && form.author !="" && form.description != "" && form.published !="";
          };

        // handle submit
        const handlesubmit = (event) => {
            event.preventDefault();

            axios.post('http://localhost:3000/books', form, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert("form submitted successfully");
                    window.location = "/Addbook"; // This line of code will redirect you once the submission is successful
                })
                .catch(error => {
                    console.error(error);
                });
        };

        //
        const Edithandlesubmit = (event) => {
            event.preventDefault();

            axios.put('http://localhost:3000/books/' + id, form, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert("form updated successfully");
                    window.location = "/bookdetailview/"+id; // This line of code will redirect you once the submission is successful
                })
                .catch(error => {
                    console.error(error);
                });
        };
        
        



        // code for edit
          useEffect(() => {
              axios.get('http://localhost:3000/books/'+ id)
              .then(res => 
                        
                        setForm({...form, 
                                title: res.data.title,
                                author: res.data.author,
                                description: res.data.description,
                                published: res.data.published,
                                pages: res.data.pages,
                                location: res.data.location}),
                                
                )
              .catch(err=> console.log(err))
            
          }, []);

          // load form with data
          


        if (cancel) {return <Navigate to ='/index' />};  

        if (edit) {
           return (
           <div>
               

               
                    <body>
                        <div>
                        
                            <Navbar></Navbar>
                            <section className="py-5">
                            <form className="container" onSubmit={Edithandlesubmit}>
                            <div className="Auth-form-content">
                            
                            <h3 className="Auth-form-title">Edit Book</h3>
                            
                                <div className="form-group mt-3">
                                
                                    <label>Title</label>
                                    <input
                                    id = "title"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g Book Name"
                                    value={form.title}
                                    key={form.id}
                                    onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Author</label>
                                    <input
                                    id = "author"
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Author Name"
                                    value={form.author}
                                    onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Description</label>
                                    <input
                                    id = "description"
                                    type="description"
                                    className="form-control mt-1"
                                    placeholder="About the book"
                                    value={form.description}
                                    onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label>Pubished Date</label>
                                    <input
                                    id = "published"
                                    type="published"
                                    className="form-control mt-1"
                                    placeholder="ex: 20/05/2023"
                                    value={form.published}
                                    onChange={handleChange}
                                    />
                                </div>
                                

                                <div className="form-group mt-3">
                                    <label>Pages</label>
                                    <input
                                    id = "pages"
                                    type="pages"
                                    className="form-control mt-1"
                                    placeholder="No: of pages ex: 250"
                                    value={form.pages}
                                    onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label>location</label>
                                    <input
                                    id = "location"
                                    type="location"
                                    className="form-control mt-1"
                                    placeholder="Available location"
                                    value={form.location}
                                    onChange={handleChange}
                                    />
                                </div>
                    
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                Update Book
                                </button>
                                <button type="submit" onClick={() => setCancel(true)} className="btn btn-secondary">
                                cancel
                                </button>
                            </div>
                            {/* <p className="text-center mt-2"> 
                                Forgot <a href="#">password?</a>
                            </p>*/}
                            
                            </div>
                            </form>
                            </section>
                        <Footer></Footer>
                        
                        </div>
                    </body>
                
            </div>
           
            )
        }





        // code ends for edit

    return (

        
        <div>
           
            <body>
        <Navbar></Navbar>
        <section className="py-5">
                    <form className="container" onSubmit={handlesubmit}>
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Add Book</h3>
                    
                        <div className="form-group mt-3">
                            <label>Title</label>
                            <input
                            id = "title"
                            type="title"
                            className="form-control mt-1"
                            placeholder="e.g Book Name"
                            value={form.title}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Author</label>
                            <input
                            id = "author"
                            type="author"
                            className="form-control mt-1"
                            placeholder="Author Name"
                            value={form.author}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Description</label>
                            <input
                            id = "description"
                            type="description"
                            className="form-control mt-1"
                            placeholder="About the book"
                            value={form.description}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Pubished Date</label>
                            <input
                            id = "published"
                            type="published"
                            className="form-control mt-1"
                            placeholder="ex: 20/05/2023"
                            value={form.published}
                            onChange={handleChange}
                            />
                        </div>
                        

                        <div className="form-group mt-3">
                            <label>Pages</label>
                            <input
                            id = "pages"
                            type="pages"
                            className="form-control mt-1"
                            placeholder="No: of pages ex: 250"
                            value={form.pages}
                            onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>location</label>
                            <input
                            id = "location"
                            type="location"
                            className="form-control mt-1"
                            placeholder="Available location"
                            value={form.location}
                            onChange={handleChange}
                            />
                        </div>
            
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" disabled={!validate()}>
                        Add Book
                        </button>
                        <button type="submit" onClick={() => setCancel(true)} className="btn btn-secondary">
                        cancel
                        </button>
                    </div>
                    {/* <p className="text-center mt-2"> 
                        Forgot <a href="#">password?</a>
                    </p>*/}
                    </div>
                </form>
        </section>
        <Footer></Footer>
        </body>
        </div>
    )

    };


export default AddBook
