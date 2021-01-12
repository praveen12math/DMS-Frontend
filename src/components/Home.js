import React from 'react'
import {Link} from 'react-router-dom'
import "./Home.css"


const Home = () => {
    return (
        <div>
        <div className="row no-gutters">
            <div className="col-lg-6  offset-1">
            <div className="container">
              <h1 className="header-text center display-3"> <b>Department Management System</b></h1>
              
            </div>
            </div>

            <div className="col-lg-5">
            <div className="container">
                <img src="school.png" className="center-img" alt="" style={{width: "80%"}}/>
                </div>
            </div>
</div>
        <div className="col-10 offset-md-2">
            <Link type="button" className="btn text-white btn-home" to='/account'>Get Started</Link>
            </div>
        </div>
    )
}

export default Home