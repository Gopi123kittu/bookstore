import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routing from "./Routes.js"

function App() {
  return (

    <div className="App">
      <Routing />
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App;
