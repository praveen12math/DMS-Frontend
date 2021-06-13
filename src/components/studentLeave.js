import React from 'react'
import { Link } from 'react-router-dom';

export default function studentLeave() {
    return (
        <div>
           

           <div className="row">

           <div className="col-lg-4" style={{backgroundColor: "#2E2F7E", height: "100vh"}}>
           <h3 className="text-center text-white mt-2" >History</h3>
           <br/><br/>
           <h1 className="text-white">Nothing to display, applied leave application and status will be updated here.
           </h1>          
           </div>

            <div className="col-lg-8" style={{backgroundColor: "white", height: "100vh"}}>
         <div className="crossButton">
         <Link to="/student" className="fa fa-times" style={{textDecoration: "none"}}></Link>  
         </div>
      
     

         <h3 className="text-center mt-3">Request for leave</h3> <br/><br/>

         <form>
  <div className="row">
    <div className="col">
    <label>First name</label>
      <input type="text" className="form-control"/>
    </div>
    <div className="col">
    <label>Last name</label>
      <input type="text" className="form-control"/>
    </div>
  </div> <br/>

  <div className="row">
    <div className="col">
    <label>Roll no</label>
      <input type="text" className="form-control"/>
    </div>
    <div className="col">
    <label>Cordinator</label>
      <input type="text" className="form-control"/>
    </div>
  </div> <br/>
   
   <div className="row">
   <div className="col">
   <label>Subject</label><br/>
  <textarea className="form-control" rows="2"  style={{width: "100%"}}></textarea>
  </div>
   </div>
    <br/>

  <div className="row">
  <div className="col">
  <label>Application body</label><br/>
  <textarea className="form-control" rows="5"  style={{width: "100%"}}></textarea>
 
  </div>  
  </div>
   <br/>

  <div className="text-center"> 
  <button className="btn btn-danger mt-3">Apply for leave</button>
  </div>

</form>


            </div>   
           </div>
        </div>
    )
}
