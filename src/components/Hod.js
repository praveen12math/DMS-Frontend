import React, {useEffect} from 'react'
import {signout, isAuthenticated} from "../auth/index"
import {useHistory} from "react-router-dom"
import Aos from "aos"
import "aos/dist/aos.css"
import './Teacher.css'


export default function Student() {

    const history = useHistory()

    if(!isAuthenticated()){
        history.push("/account")
    }

    const userD = JSON.parse(localStorage.getItem("jwt"))
    if(userD.user.role === 0){
        history.push("/student")
    }
    else if(userD.user.role === 1){
        history.push("/teacher")
    }

    useEffect (() => {
        Aos.init({duration: 2000})
    })

    return (
        <div className="student">
        <p 
        data-aos="fade-down" data-aos-duration="4000"
        className="text2">What are you looking for ? HOD {userD.user.name}</p>

<div className="row">
        <div 
        data-aos="flip-up"
        
        className="col-lg-2 col-sm-6 offset-sm-1 block myblock">
         <img className="image2" src="1.png" alt="muY"/>
         <p className="text-white text-center">Attendence</p>
        </div>  
        
        <div 
        data-aos="flip-down"
        data-aos-delay="500"
        className="col-lg-2 col-sm-6 block myblock">
         <img className="image3" src="2.png" alt="muY"/>
         <p className="text-white text-center">Review Leave</p>
        </div>

        <div 
        data-aos="flip-up"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 block myblock">
         <img src="3.png" alt="muY"/>
         <p className="text-white text-center">Books</p>
        </div>

        <div
        data-aos="flip-down"
        data-aos-delay="1100"
         className="col-lg-2 col-sm-6 block myblock">
         <img src="4.png" alt="muY"/>
         <p className="text-white text-center">Old Papers</p>
        </div>

        <div 
        data-aos="flip-up"
        data-aos-delay="1400"
        className="col-lg-2 col-sm-6 block myblock">
         <img src="10.3.png" alt="muY" />
         <p className="text-white text-center mt-4">Notice</p>
        </div>
   
        
        <div 
        data-aos="flip-up"
        data-aos-delay="1700"
        className="col-lg-2 col-sm-6 block offset-sm-1 myblock">
         <img 
         src="6.png" alt="muY"/>
         <p className="text-white text-center mt-4">Assignment</p>
        </div>

        <div 
        data-aos="flip-down"
        data-aos-delay="2000"
        className="col-lg-2 col-sm-6 block myblock">
     <img src="7.png" alt="muY"/>
         <p className="text-white text-center mt-4">Review Complain</p>
        </div>


        <div
        data-aos="flip-up"
        data-aos-delay="2900"
         className="col-lg-2 col-sm-6 block myblock" onClick={()=> signout(()=> history.push("/account"))}>
     <i class="fas fa-users-cog" style={{fontSize:"700%", color:"#FF362E"}}></i>
         <p className="text-white text-center">Logout</p>
        </div>

        </div>
        </div>
    )

}
   
    