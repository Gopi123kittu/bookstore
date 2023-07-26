
import React, { useState } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const [emailInputRef,setEmail] = useState('')
  const [passwordInputRef, setPassword] = useState()
  const [redirectToIndex, setRedirectToIndex] = useState(false);
  const [name, setName] = useState();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  


  const emailEventhandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordEventhandler = (event) => {
      setPassword(event.target.value)
  }

  
  const nameHandler = (event) => {
      setName(event.target.value)
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }



  const functionSubmit = (e) => {
    e.preventDefault();

        
    alert("email " + emailInputRef);
    
        // get the data with email id
        axios.get('http://localhost:3000/users', {
            params: { 
                    email: emailInputRef, 
                    password: passwordInputRef
                },
            headers: { "Access-Control-Allow-Origin": "*" }
        })
        .then(response => {
          console.log("data", response.data)
            localStorage.setItem('isLoggedin', true);
              setRedirectToIndex(true);
              //setRedirectToLogin(true)            
            
        })
        .catch(error => {
            // handle error
            console.error(error);
        });

    }
    

  // create user
  const createUser = (e) => {
    e.preventDefault();

        // post the data with email id
        axios.post('http://localhost:3000/users', { 
          email: emailInputRef, 
          password: passwordInputRef,
          username: name } ,{
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
        })
        .then(response => {
            console.log(response.data);
            alert(name + " " + "user created successfully \n redirecting to login page");
            // Set the flag to redirect to the index page
            setRedirectToLogin(true);

        })
        .catch(error => {
            // handle error
            console.error(error);
        });

    }
  
    if (redirectToLogin) {
      //return <Navigate to="/login" replace={true} />;
      window.location.reload(false);
    }

    if (redirectToIndex) {
      return <Navigate to="/index" replace={true} />;
    }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        
        
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <Form.Control
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={emailInputRef}
                onChange={emailEventhandler}
                // value={emailInputRef}
                // onChange={(e) => setEmailNew(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <Form.Control
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={passwordInputRef}
                onChange={passwordEventhandler}
                // value={password}
                // onChange={(e) => setPasswordNew(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" onClick={functionSubmit} className="btn btn-primary" >
                Submit
              </button>
            </div>
        
            {/* <p className="text-center mt-2"> 
              Forgot <a href="#">password?</a>
            </p>*/}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={nameHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={emailEventhandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={passwordEventhandler}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={createUser} className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2"> 
            Forgot <a href="#">password?</a>
          </p>*/}
        </div>
      </form>
    </div>
  )
}
