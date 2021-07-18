import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { addLeave, getStudentLeave } from '../auth/Controller';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function StudentLeave() {

  var userD = JSON.parse(localStorage.getItem("jwt"))
  const userId = userD.user._id
  userD = userD.token

  const [studentLeave, setStudentLeave] = useState([])

  const [values, setValues] = useState({
    name: "",
    rollno: "",
    cordinator: "",
    subject: "",
    description: ""
  })

  const {name, rollno, cordinator, subject, description} = values


  const hanndleChange = name => event => {
    setValues({...values, [name]:event.target.value})
  }


  const onSubmit = event => {
    event.preventDefault()
    addLeave({name, rollno, cordinator, subject, description, userD, userId})
    .then(data => {
      if(data.error){
        return toast("Something went wrong", {type:"danger"})
      }
     toast("Leave Requested", {type:"success"})
     getNotice(userId, userD)
   })

  }


  const getNotice = (userId, userD) => {
    getStudentLeave({userId, userD})
    .then(data => {
      if(!data){
        return toast("Somthing went wrong", {type: "error"})
      }
      setStudentLeave(data)
    })
  }

  useEffect(() => {
    getNotice(userId, userD)
  },[userId, userD])

  console.log(studentLeave);

    return (
        <div>
           
           <ToastContainer />
           <div className="row">

           <div className="col-lg-4" style={{backgroundColor: "#2E2F7E"}}>
           <h3 className="text-center text-white mt-2" >History</h3>
           <br/><br/>
           {studentLeave[0] == null?
           <h1 className="text-white">Nothing to display, applied leave application and status will be updated here.</h1> 
           :
           <>
           {studentLeave.map(leave => (

             <div class="card border-light mb-3 bg-transparent text-white">
  <div class="card-header bg-white text-dark">{leave.status === "Pending"?
   <span className="text-warning"><b><i class="fas fa-exclamation-circle"></i> Pending</b></span>
   : leave.status === "Reject"? <span className="text-danger"><b><i class="fas fa-times-circle"></i> Rejected</b></span>
   : leave.status === "Accept"? <span className="text-success"><b><i class="fas fa-check-circle"></i> Accepted</b></span> : ""
   }  
   <span className="float-right">
   {new Date(`${leave.updatedAt}`).toLocaleString()}
   </span>
   </div>
  <div class="card-body">
    <h5 class="card-title">{leave.subject}</h5>
    <p class="card-text">{leave.description}</p>
  </div>
</div>
           ))}
           </>
           }
                    
           </div>

            <div className="col-lg-8" style={{backgroundColor: "white"}}>
         <div className="crossButton">
         <Link to="/student" className="fa fa-times" style={{textDecoration: "none"}}></Link>  
         </div>
      
     

         <h3 className="text-center mt-3">Request for leave</h3> <br/><br/>

         <form>
  <div className="row">
  
  </div> <br/>

  <div className="row">

    <div className="col">
    <label>Cordinator</label>
      <input type="text" className="form-control"
        value={cordinator}
        onChange={hanndleChange("cordinator")}
      />
    </div>
  </div> <br/>
   
   <div className="row">
   <div className="col">
   <label>Subject</label><br/>
  <textarea className="form-control" rows="2"  style={{width: "100%"}}
    onChange={hanndleChange("subject")}
    value={subject}
  />
  </div>
   </div>
    <br/>

  <div className="row">
  <div className="col">
  <label>Application body</label><br/>
  <textarea className="form-control" rows="5"  style={{width: "100%"}}
    onChange={hanndleChange("description")}
    value={description}
  />
 
  </div>  
  </div>
   <br/>

  <div className="text-center"> 
  <button className="btn btn-danger mt-3" onClick={onSubmit}>Apply for leave</button>
  </div>

</form>


            </div>   
           </div>
        </div>
    )
}
