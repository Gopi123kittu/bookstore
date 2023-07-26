import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./containers/Login";
import Index from "./containers";
import AddBook from "./containers/Addbook"
import DynamicPagination from "./containers/Page"
import BooksPerLocation from "./containers/BooksPerLocation";
import searchBarResults from "./containers/searchBarResults";
import BookDetailview from "./containers/BookDetailView";
import NewLogin from "./containers/NewLogin";

const isLoggedin = localStorage.getItem('isLoggedin');


const Routing = () => (
  <Router>
    <Routes>
        <Route  path="/newlogin" Component={NewLogin} /> 
       <Route  path="/login" Component={Login} /> 
       <Route  path="/index" Component={Index} />
       <Route  path="/addbook/:id?/:edit?" Component={AddBook} />
       <Route  path="/page" Component={DynamicPagination} />
       <Route  path="/booksperlocation/:location" Component={BooksPerLocation} />
       <Route  path="/searchBarResults/:item" Component={searchBarResults} />
       <Route  path="/bookdetailview/:id" Component={BookDetailview} />
    </Routes>
  </Router>
);

export default Routing;