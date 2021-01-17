import React,{useState} from 'react';
import Signin from './Signin'
import Signup from './Signup'
import {Redirect} from "react-router-dom"
import {isAuthenticated} from "../auth/index"
import "./Account.css"

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

        
        <div className="accountBody">

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
   <footer className="foxed-bottom text-white text-center accountFooter" onClick={()=> login ? setLogin(false) : setLogin(true)}>
         {login ? "New ? Create Account" : "Already have account ? Login"}
     </footer>
     </div>
</div>  


<div>
<img src="newImage.svg" className="accountImage" alt=""/>
</div>
</div>
        
     );
    }
}
 
export default Account;