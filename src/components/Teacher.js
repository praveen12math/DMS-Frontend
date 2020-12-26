import React, {useEffect} from 'react'
import './Student.css'
import Aos from "aos"
import "aos/dist/aos.css"


export default function Student() {

    useEffect (() => {
        Aos.init({duration: 2000})
    })

    return (
        <div className="student">
        <p 
        data-aos="fade-down" data-aos-duration="4000"
        className="text2">What are you looking for ?</p>

        <div className="row">
        <div 
        data-aos="flip-up" data-aos-duration="1000"
        className="col-lg-2 col-sm-6 offset-1 block">
         <img className="image2" src="1.png" alt="muY"/>
         <p className="text-white text-center">Attendence</p>
        </div>  
        
        <div 
        data-aos="flip-down" data-aos-duration="1200"
        className="col-lg-2 col-sm-6 block">
         <img src="2.png" alt="muY"/>
         <p className="text-white text-center">Request Leave</p>
        </div>

        <div 
        data-aos="flip-up" data-aos-duration="1400"
        className="col-lg-2 col-sm-6 block">
         <img src="3.png" alt="muY"/>
         <p className="text-white text-center">Books</p>
        </div>

        <div
        data-aos="flip-down" data-aos-duration="1800"
         className="col-lg-2 col-sm-6 block">
         <img src="4.png" alt="muY"/>
         <p className="text-white text-center">Old Papers</p>
        </div>

        <div 
        data-aos="flip-up" data-aos-duration="2200"
        className="col-lg-2 col-sm-6 block">
         <img src="10.png" alt="muY"/>
         <p className="text-white text-center mt-4">Notice</p>
        </div>
   
      </div> <br/><br/> <br/><br/>


        <div className="row">     
        <div 
        data-aos="flip-up" data-aos-duration="1000"
        className="col-lg-2 col-sm-6 block offset-1">
         <img 
         src="6.png" alt="muY"/>
         <p className="text-white text-center mt-4">Assignment</p>
        </div>

        <div 
        data-aos="flip-down" data-aos-duration="1400"
        className="col-lg-2 col-sm-6 block">
         <img src="7.png" alt="muY"/>
         <p className="text-white text-center mt-4">Complain</p>
        </div>

        <div 
        data-aos="flip-down" data-aos-duration="1800"
        className="col-lg-2 col-sm-6 block">
         <img src="8.png" alt="muY"/>
         <p className="text-white text-center mt-4">Timetable</p>
        </div>

        <div 
        data-aos="flip-down" data-aos-duration="2200"
        className="col-lg-2 col-sm-6 block">
         <img src="11.png" alt="muY"/>
         <p className="text-white text-center mt-4">Feedback</p>
        </div>

        <div
        data-aos="zoom-in" data-aos-duration="2400"
         className="col-lg-2 col-sm-6 block">
         <img src="5.png" alt="muY"/>
         <p className="text-white text-center">Deactivate account</p>
        </div>

        </div>
        </div>
    )
}
