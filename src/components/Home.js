import React,{useEffect} from 'react'
import Aos  from "aos"
import "aos/dist/aos.css"
import './Home.css'

export default function Home() {
    useEffect(()=>{
      Aos.init({duration: 2000})
    }, [])
        

    return (
        <div>
          <header className="header myBg">
        <div className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="text-container" data-aos="fade-right"  data-aos-delay="600">
                            <h1><span className="turquoise">Department management System</span></h1>
                        </div>
                        
                <button className="btn btn-outline-primary fixed-bottom" href="#services" style={{width:"65%", left:"6%"}}>Get Started</button>
                    </div> 
                    <div className="col-lg-6">
                        <div className="image-container">
                            <img data-aos="fade-left" className="img-fluid" src="header-teamwork.svg" alt="alternative"/>
                        </div> 
                    </div> 
                </div>

               

            </div> 
        </div> 
    </header>

        </div>
    )
}
