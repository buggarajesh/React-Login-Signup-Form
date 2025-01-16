// import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style= {{backgroundImage : "linear-gradient(#2A00B7,rgb(180, 78, 243))"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1>Hello! Welcome to our Pag</h1>
        <Link to='/login' className="btn btn-light my-5">Logout</Link>
    </div>
  )
}

export default Home