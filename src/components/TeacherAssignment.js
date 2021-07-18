import React, { useEffect, useState } from 'react';
import { getAllAssignmentByTeacher, updateGradeByTeacher } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const TeacherAssignment = () => {

    const userD = JSON.parse(localStorage.getItem("jwt"))

    const [assignmentData, setAssignmentData] = useState([])
    const [gradeId, setGradeId] = useState()
    const [grade, setGrade] = useState()


    useEffect(()=> {
      const getAssignment = () => {
        const name = userD.user.name
        const token = userD.token
        getAllAssignmentByTeacher({name, token})
        .then(res => {
            setAssignmentData(res)
        })
    }
        getAssignment()
    }, [userD.token, userD.user.name])


    const getMyAssignment = () => {
      const name = userD.user.name
      const token = userD.token
      getAllAssignmentByTeacher({name, token})
      .then(res => {
          setAssignmentData(res)
      })
  }


    const onClickGrade = (id) => {
        setGradeId(id)
    }

    const onSubmit = (grade) => {
      updateGradeByTeacher({gradeId, userD, grade})
       .then(res => {
         if(res.error){
          return toast("Somthing went wrong", {type: "error"})
         }
         toast("Assignment Grade Update Success", {type:"success"})
         getMyAssignment()
       })
    }




    return ( 
       <>
<ToastContainer/>
       <h1 className="text-white text-center mb-5">Submitted Assignment</h1>

<div className="row mt-4">

{assignmentData[0] == null?
<h1 className="text-white">Nothing to display, Submitted Assignment and status will be updated here.</h1> 
:
<>

{assignmentData.map(assignment => (

    <>
  <div className="col-lg-4">
  <div class="card border-light mb-3 bg-transparent text-white"
  >
  <div class="card-header bg-white text-dark">
     <span className="text-success"><b>Obtain: {assignment.grade} <span className="float-right">Max: 10</span></b></span>  
   <span className="float-right">
   {/* {new Date(`${leave.updatedAt}`).toLocaleString()} */}
   </span>
   </div>
  <div class="card-body">
    <h4 class="card-title">Title <b>:</b> {assignment.title} 
    <span className="float-right">
    <a href={assignment.fileUrl} target="_blank" rel="noreferrer"><i class="far fa-file-alt text-warning" style={{fontSize:"200%", cursor:"pointer"}}></i>
    </a></span></h4>    
    <p class="card-text">Name <b>:</b> {assignment.name}</p>
    <p class="card-text">Rollno <b>:</b> {assignment.rollNo}
    <span className="float-right" style={{ cursor:"pointer"}}><i className="fas fa-marker text-warning float-right" style={{fontSize:"200%"}} 
    onClick={ () => onClickGrade(assignment._id)}
    data-bs-toggle="modal" data-bs-target="#exampleModal"
    ></i>
    </span>
    </p>
    <h6 className="float-right">Update Grade</h6>
    <p class="card-text">Semester <b>:</b> {assignment.sem}</p>
    <p class="card-text">Teacher <b>:</b> {assignment.teacherName}</p>
    <p class="card-text">Teacher Advice <b>:</b> {assignment.advise}</p>
    <p class="card-text">Submit on <b>:</b> {new Date(`${assignment.createdAt}`).toLocaleString()}</p>
    <p class="card-text">Last Update on <b>:</b> {new Date(`${assignment.updatedAt}`).toLocaleString()}</p>
  </div>
</div>
</div>







<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog text-dark">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Take Action</h5>
      </div>
      <div className="modal-body">
      <input type="text" placeholder="Grade (Ex 0-10)" className="form-control"
      
      onChange={(e) => setGrade(e.target.value)}
      /><br/>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => onSubmit(grade)}>Submit</button>
      </div>
    </div>
  </div>
</div>

</>
    ))}
 
      </>
  }

  </div>





       </>
     );
}
 
export default TeacherAssignment;