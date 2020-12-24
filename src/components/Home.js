import React from 'react'
import './Home.css'

export default function Home() {
    return (
        <div>
          <header id="header" className="header myBg">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="text-container">
                            <h1><span className="turquoise">Department management System</span></h1>
                            <p className="p-large"></p>
                            <button className="btn-primary" href="#services">Get Started</button>
                        </div>
                    </div> 
                    <div className="col-lg-6">
                        <div className="image-container">
                            <img className="img-fluid" src="header-teamwork.svg" alt="alternative"/>
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </header>


        </div>
    )
}
