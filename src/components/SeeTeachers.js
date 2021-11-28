import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { getAllTeacher, removeUser } from '../auth/Controller';

const SeeTeacher = () => {

    const [teacher, setTeacher] = useState([])

    const userD = JSON.parse(localStorage.getItem("jwt"))

    var tokenId = ""
    
    if(userD){
        tokenId = userD.token
    }

    const fetchData = (tokenId) => {        

        getAllTeacher(tokenId)
        .then(res => {
            setTeacher(res)
        })
    }

    const onDelete = (id) => {
        removeUser({id, tokenId})
        .then(res => {
            if(res.err || res.error){
               return swal({title:"Something went wrong", icon:"error"})
            }

            return (
                swal({title: "Teacher deleted", icon:"success"}),
            fetchData(tokenId)
            )
        })
    }

    useEffect(() => {
        fetchData(tokenId)
    },[tokenId])


    if(!tokenId || userD.user.role === 0 || userD.user.role === 1){
        return( swal({title: "Access Denied", icon:"warning"}),
         <Redirect to="/account" />
        )
     } 


    return ( 
        <>
<Link to="/teacher" className="fa fa-arrow-left ml-2 mt-2 backArrow" ></Link>

<div className="row mt-5">
{teacher.map(data => (
<div className="col-lg-4">
    <div className="card border-light mb-3 bg-transparent text-white">
  <div className="card-header bg-white text-dark"><b> {data.name}  </b>
 <span className="float-right" style={{ cursor:"pointer"}}><i className="fas fa-trash text-danger float-right" style={{fontSize:"150%"}} 
    onClick={() => onDelete(data.id)}
    ></i>
    </span>
   </div>
  <div className="card-body">
  Email: {data.email} <br/>
  Created at: {new Date(`${data.create}`).toLocaleString()}
  </div>
  {data.role===1? <btn className="btn btn-success">Teacher Access</btn> : <btn className="btn btn-success">HOD Access</btn>}
</div>
</div>

))}
</div>
        </>
     );
}
 
export default SeeTeacher;