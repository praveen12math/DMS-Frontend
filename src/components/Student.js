import React, {useEffect} from 'react'
import './Student.css'
import {isAuthenticated, signout} from "../auth/index"
import Aos from "aos"
import "aos/dist/aos.css"
import { Redirect, useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { removeUser } from '../auth/Controller'
import swal from 'sweetalert'


export default function Student() {

    const history = useHistory()

    useEffect (() => {
        Aos.init({duration: 2000})
    })

    const userD = JSON.parse(localStorage.getItem("jwt"))


    if(!isAuthenticated()){
        return <Redirect to="account"/>
    }
    else if(userD.user.role !== 0){
        return <Redirect to="/teacher"/>
    }

    const onDelete = (id) => {
        const tokenId = userD.token
        removeUser({id, tokenId})
        .then(res => {
            if(res.err || res.error){
               return swal({title:"Something went wrong", icon:"error"})
            }
  
            return swal({title: "Account deleted", icon:"success"})
        })
    }

    return (

        <div className="student">
        <p 
        data-aos="fade-down"
        className="text2">What are you looking for ? {userD.user.name}
        </p>
        

        <div className="row">

        <div 
        data-aos="flip-up"
        className="col-lg-2 col-sm-6 offset-sm-2 block myblock">
        <Link to={{pathname: "/seeAttendanceStudent", 
        params: {rollno: userD.user.rollno}}}
        >
         <img className="image2" src="1.png" alt="muY"/>
         <p className="text-white text-center" style={{textDecoration:"none"}}>Attendence</p>
         </Link>
        </div>  
        
        <div 
        data-aos="flip-down"
        data-aos-delay="500"
        className="col-lg-2 col-sm-6 block myblock"
       onClick={ ()=> history.push('/studentLeave')}>
        <img className="image3" src="2.png" alt="muY"/>
         {/* <p className="text-white text-center">Request Leave</p> */}
         <p className="text-white text-center">Request Leave</p>
    </div>

        <div 
       onClick={ ()=> history.push('/books')}
        data-aos="flip-up"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 block myblock">
         <img src="3.png" alt="muY"/>
         <p className="text-white text-center">Books</p>
        </div>

        <div
        onClick={ ()=> history.push('/paper')}
        data-aos="flip-down"
        data-aos-delay="1100"
         className="col-lg-2 col-sm-6 block myblock">
         <img src="4.png" alt="muY"/>
         <p className="text-white text-center">Old Papers</p>
        </div>
        </div>


<div className="row mt-5">
        <div 
        onClick={ ()=> history.push('/notice')}
        data-aos="flip-up"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 offset-sm-2 block myblock">
         <img src="10.3.png" alt="muY" />
         <p className="text-white text-center">Notice</p>
        </div>
       
     
        <div 
        onClick={() => history.push('/studentAssignment')}
        data-aos="flip-up"
        data-aos-delay="500"
        className="col-lg-2 col-sm-6 mt-3 block myblock">
         <img src="6.png" alt="muY"/>
         <p className="text-white text mt-3">Assignment</p>

        </div>
    

        <div 
        data-aos="flip-down"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 block myblock">
     <i class="fas fa-user-minus" style={{fontSize:"600%", color:"#FFC400"}} 
       onClick={ () =>
        swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able recover your account!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    onDelete(userD.user._id)
    swal("Poof! Your account has been deleted!", {
      icon: "success",
    },
    signout(()=> history.push("/account"))
    )
  } else {
    swal("Your account is safe!");
  }
})
         }
     />
         <p className="text-white text-center mt-4">Delete Profile</p>
        </div>

        <div
        data-aos="flip-up"
         className="col-lg-2 col-sm-6 block myblock" onClick={()=> signout(()=> history.push("/account"))} >
     <i class="fas fa-sign-out-alt logoutIcon" style={{fontSize:"600%", color:"#FF362E"}}></i>
         <p className="text-white text-center mt-4">Logout</p>
        </div>

        </div>
        </div>
    )
}
