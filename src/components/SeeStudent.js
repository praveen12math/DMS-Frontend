import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getAllStudent, removeUser } from '../auth/Controller';

const SeeStudent = () => {

    const [student, setStudent] = useState([])

    const userD = JSON.parse(localStorage.getItem("jwt"))

    const tokenId = userD.token

    const fetchData = (tokenId) => {        
        getAllStudent(tokenId)
        .then(res => {
            setStudent(res)
        })
    }

    const onDelete = (id) => {
        removeUser({id, tokenId})
        .then(res => {
            if(res.err || res.error){
               return swal({title:"Something went wrong", icon:"error"})
            }

            return (
                swal({title: "Student deleted", icon:"success"}),
            fetchData(tokenId)
            )
        })
    }

    useEffect(() => {
        fetchData(tokenId)
    },[tokenId])

    return ( 
        <>
<Link to="/teacher" className="fa fa-arrow-left ml-2 mt-2 backArrow" ></Link>

<div className="row mt-5">
{student.map(data => (
<div className="col-lg-4">
    <div className="card border-light mb-3 bg-transparent text-white">
  <div className="card-header bg-white text-dark"><b> {data.name}  </b>
 <span className="float-right" style={{ cursor:"pointer"}}><i className="fas fa-trash text-danger float-right" style={{fontSize:"150%"}} 
    onClick={() => onDelete(data.id)}
    ></i>
    </span>
   </div>
  <div className="card-body">
  Roll No: {data.rollno} <br/>
  Batch: {data.batch} <br/>
  Year: {data.year} <br/>
  Email: {data.email} <br/>
  Created at: {new Date(`${data.create}`).toLocaleString()}

  </div>
</div>
</div>

))}
</div>
        </>
     );
}
 
export default SeeStudent;