import React, {useEffect, useState} from 'react'
import {useHistory, Redirect} from "react-router-dom"
import {signout,isAuthenticated} from "../auth/index"
import './Teacher.css'
import './Notice'

import Aos from "aos"
import "aos/dist/aos.css"
import { addTeacher, editTeacher } from '../auth/Controller'
import swal from 'sweetalert'


export default function Student() {

    const history = useHistory()

    const [email, setEmail] = useState()
    const [role, setRole] = useState()
    const [name, setName] = useState()

    const userD = JSON.parse(localStorage.getItem("jwt"))


    useEffect (() => {
        Aos.init({duration: 2000})
    })


    if(!isAuthenticated()){
        return <Redirect to="account"/>
    }
    else if(userD.user.role === 0){
        return <Redirect to="/student"/>
    }

    const onSubmit = () => {
      const token = userD.token
      addTeacher({token, email, role})
      .then(res => {
        

        if(res.err){
          return swal({title: res.err, icon:"error"})
        }

        if(res.error){
          return swal({title: "Something went wrong", icon:"error"})
        }

        swal({title: "Teacher Saved Successfully", icon:"success"})

      })
    }

    const onEdit = () => {
      const token = userD.token
      const id = userD.user._id
      editTeacher({token, id, name})
      .then(res => {      
        if(res.err){
          return swal({title: res.err, icon:"error"})
        }

        if(res.error){
          return swal({title: "Something went wrong", icon:"error"})
        }

        swal({title: "Update Success", icon:"success"})

        signout(()=> history.push("/account"))

      })
    }

    console.log(name);

    if(userD.user.newUser){
      return (
        <>
        <form action="" className="mt-5">
          <div className="row mt-5">
            <div className="container mt-5">
              <div className="col auto-mx mt-5">

                  <label className="text-white mt-5">Enter Your Full Name:
                  <span className="text-danger" style={{fontSize:"180%"}}> *</span></label>
                  <input type="text" className="form-control" 
                    onChange={(e)=>setName(e.target.value)}
                  />
<br/>
                  <div className="text-center">
                    <button type="button" className="btn btn-info btn-lg" onClick={onEdit}>Save</button>
                  </div>

              </div>
            </div>
          </div>
        </form>
        </>
      )
    }
    else{

    return (
    
<>
       <div className="student">
        <p 
        data-aos="fade-down" data-aos-duration="4000"
        className="text2">What are you looking for ? Professor {userD.user.name}</p>

<div className="row">
        <div 
        onClick={()=> history.push("/attendance")}
        data-aos="flip-up"
        className="col-lg-2 col-sm-6 offset-sm-1 block myblock">
         <img className="image2" src="1.png" alt="muY"/>
         <p className="text-white text-center">Attendence</p>
        </div>  
        
        <div 
        onClick={() => history.push("/responseLeave")}
        data-aos="flip-down"
        data-aos-delay="500"
        className="col-lg-2 col-sm-6 block myblock">
         <img className="image3" src="2.png" alt="muY"/>
         <p className="text-white text-center">Response Leave</p>
        </div>

        <div 
        onClick={() => history.push("/books")}
        data-aos="flip-up"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 block myblock">
         <img src="3.png" alt="muY"/>
         <p className="text-white text-center">Books</p>
        </div>

        <div
        onClick={() => history.push("/paper")}
        data-aos="flip-down"
        data-aos-delay="1100"
         className="col-lg-2 col-sm-6 block myblock">
         <img src="4.png" alt="muY"/>
         <p className="text-white text-center">Old Papers</p>
        </div>

        <div 
        onClick={ ()=> history.push('/notice')}
        data-aos="flip-up"
        data-aos-delay="1400"
        className="col-lg-2 col-sm-6 block myblock">
         <img src="10.3.png" alt="muY" />
         <p className="text-white text-center mt-4">Notice</p>
        </div>
   
         
        <div 
        onClick={ ()=> history.push('/teacherAssignment')}

        data-aos="flip-up"
        data-aos-delay="1400"
        className="col-lg-2 col-sm-6 block offset-sm-1 myblock">
         <img src="6.png" alt="muY"/>
         <p className="text-white text-center mt-4">Assignment</p>
        </div>

        <div 
        onClick={ ()=> history.push('/seeStudent')}
        data-aos="flip-down"
        data-aos-delay="1100"
        className="col-lg-2 col-sm-6 block myblock">
     <img src="8.png" alt="muY"/>
         <p className="text-white text-center mt-4">See Students</p>
        </div>

        {/* <div 
        data-aos="flip-down"
        data-aos-delay="800"
        className="col-lg-2 col-sm-6 block myblock">
     <i class="fas fa-user-edit" alt="muY" style={{fontSize:"600%", color:"#FFC400"}}/>
         <p className="text-white text-center mt-4">Edit Profile</p>
        </div> */}

{userD.user.role === 2?
<>

<div 
        onClick={ ()=> history.push('/seeTeacher')}
        data-aos="flip-down"
        data-aos-delay="1100"
        className="col-lg-2 col-sm-6 block myblock">
     <img src="8.png" alt="muY"/>
         <p className="text-white text-center mt-4">See Teachers</p>
        </div>

        <div 
        data-aos="flip-down"
        data-aos-delay="500"
        className="col-lg-2 col-sm-6 block myblock">
     <i class="fas fa-user-plus" style={{fontSize:"600%", color:"#976CAD"}}
         data-bs-toggle="modal" data-bs-target="#exampleModal"
     />
         <p className="text-white text-center mt-4">Add Teacher</p>
        </div> 
        
        </>
        : ""}

        <div
        data-aos="flip-up"
        //data-aos-delay="500"
         className="col-lg-2 col-sm-6 block myblock" onClick={()=> signout(()=> history.push("/account"))}>
     <i class="fas fa-sign-out-alt mt-2" style={{fontSize:"700%", color:"#FF362E"}}></i>
         <p className="text-white text-center">Logout</p>
        </div>

        </div>
        
        </div>






        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add new Teacher</h5>

      </div>
      <div className="modal-body">
      <input type="email" placeholder="Email" className="form-control"
        onChange={(e)=>setEmail(e.target.value)}
      /><br/>

    <select className="form-select form-control" aria-label="Default select example"
    onChange={(e)=> setRole(e.target.value)}
    >
  <option selected>Select Role</option>
    <option value="1">1: For Teacher</option>
    <option value="2">2: For HOD</option>
</select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"
        onClick={onSubmit}
        >Add</button>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

}
   
    