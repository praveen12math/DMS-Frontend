import React from 'react';
import {Link} from "react-router-dom"
import "./PageNotFound.css"

const PageNotFound = () => {
    return ( 
        <div className="text-center" style={{backgroundColor: "#ffffff", height: "100vh"}}>
        <div className="row">
            <div className="col-12 text-center">
            <img className="pagenotfoundImage" src="404-1.gif" alt=""/>
            </div>   
        </div>
        The page you are looking for not available!
        <h4>Look like you're lost</h4>
        <Link className="button btn btn-success" to="/">Go to Home</Link>
        </div>
        
     );
}
 
export default PageNotFound;