import React,{useState} from 'react';
import Signin from './Signin'
import Signup from './Signup'
import {Redirect} from "react-router-dom"
import {isAuthenticated} from "../auth/index"
import swal from 'sweetalert';
import "./Account.css"
import { requestForPasswordRecovery } from '../auth/Controller';

const Account = () => {

   const [login, setLogin] = useState(true)

     if(isAuthenticated()){
        const userD = JSON.parse(localStorage.getItem("jwt")).user.role
        console.log(userD);  

         if(userD === 0){

            return <Redirect to="/student" />
         }
         else if(userD === 1){
            return <Redirect to="/teacher" />
         }
         else if(userD === 2){
            return <Redirect to="/hod" />
         }
     }
     else{

    

    return ( 

        
        <div className="accountBody accountPage">

        {login ? <img src="user (1).svg" className="accountUserImage" alt=""/> : <img src="add-friend.svg" className="accountUserImage" alt=""/>}
 {/* {isAuthenticated() 
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 0 ? <Redirect to="/student" /> : ""
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 1 ? <Redirect to="/teacher" /> : ""
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 2 ? <Redirect to="/hod" /> : ""
        
        : "" } */}


        
<div className="row">
<div className="col-lg-6"></div>
<div className="col-lg-5 center2">
{login ? <Signin/> : <Signup/>}
       </div>


<div className="col-12">
   <footer className="foxed-bottom text-white text-center accountFooter" 
   onClick={()=> login ? setLogin(false) : setLogin(true)} style={{cursor:"pointer"}}>
         {login ? "New ? Create Account" : "Already have account ? Login"} <br/>         
     </footer>

     </div>

<div className="col-5"></div>
     <div className="col mx-auto text-center"><span className="btn btn-outline-primary text-white"
     onClick={()=> swal({
  text: 'Enter your email/username',
  content: "input",
  button: {
    text: "Reset",
    closeModal: false,
  },
})
.then(email => {
   requestForPasswordRecovery({email})
   .then(res => {
      if(res.err){
         return swal({
            title: res.err,
            icon: "error"
  });
      }
      else{
         swal({
    title: res.message,
    icon: "success"
  });
      }
     
   })
})
}
     >Reset Password</span></div>
</div>  


<div>
<img src="newImage.svg" className="accountImage" alt=""/>
</div>
</div>
        
     );
    }
}
 
export default Account;