import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { addAttendance } from "../auth/Controller";
import Loader from "./loader";

const TakeAttendance = (params) => {
    
        const [present, setPresent] = useState([]);
        const [loader, setLoader] = useState(false);
        const [gotoBack, setGotoBack] = useState(false);

        if(params.location.params){

    
    const start = params.location.params.start
    const end = params.location.params.end
    const lateralStart = params.location.params.lateralStart
    const lateralEnd = params.location.params.lateralEnd
    const subject = params.location.params.subject
    const modalId = params.location.params.modalId

     var nRollNo = []

     for(let i=start;i<=end && i>0;i++){
         nRollNo.push(i)
     }

     for(let i=lateralStart;i<=lateralEnd && i>0;i++){
         nRollNo.push(i)
     }

     const onMark = (mark, rollno) => {
         if(mark === "a"){
             document.getElementById(rollno).style = "background-color:grey"
             document.getElementById(rollno+'a').style = "background-color:#E21717"
             
             for(let j in present){
                 if(present[j] === rollno){
                     present.splice(j, 1)
                     break
                 }
             }
         }
         else if(mark === "p"){
             document.getElementById(rollno).style = "background-color:#3DBE29"
             document.getElementById(rollno+'a').style = "background-color:grey"
             handlePresent(rollno);
         }
     }
    
     const handlePresent = (rollno) => {
         setPresent([...present, rollno])
     }

     console.log(present);


     const onSubmit = event => {
        event.preventDefault()
        setLoader(true)
        addAttendance({roll: present, id: modalId})
         .then(res => {
             setLoader(false)
             if(res.ok){
                setGotoBack(true)
            }
            else{
                alert("Something went wrong! Try again")
                setGotoBack(true)
            }
         })
     }


     if(!loader){
    return ( 
        <> 
        {gotoBack?<Redirect to="/attendance" />:""}   
        <h5 className="text-white text-center mt-4"><b>{subject}</b></h5>      

        <Link to="/attendance" className="fa fa-arrow-left ml-2 mt-2 backArrow" />

     <div className="row mt-4">    
    {nRollNo.map(data => (
        <div className="col-sm-6 col-lg-2">
        <div className="card border-info mb-3 text-white"
        style={{background:"transparent"}}
        >
        <div className="card-header text-center"><b>{data}</b></div>
  <div className="card-body text-center">
    <button className="btn mr-3 text-white border-white" id={data} onClick={() => onMark("p", data)}><b>P</b></button>
    <span className="btn text-white border-white" id={data+'a'} onClick={() => onMark("a", data)}
    style={{backgroundColor:"#E21717"}}
    ><b>A</b></span>
  </div>
        </div>
        </div>
    ))}


    </div>

    <div className="text-center">
    <div onClick={onSubmit} className="btn btn-success mb-5">Submit Attendance</div>
    </div>
</>
     )
    }
    else{
        return(
          <div style={{backgroundColor:"#231F20"}}>
        <Loader/>
        <button className="btn btn-primary" onClick={()=> setLoader(false)}>Stop</button>
        </div>
        )
      }
}
else{
    return (
    <div className="text-white text-center mt-5">
    <h3>Ohh an error occured</h3>
       <Link to="/attendance"> <button className="btn btn-success">Go back</button> </Link>
    </div>
        )
}
}
 
export default TakeAttendance