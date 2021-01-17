import React,{useState} from 'react';
import Signin from './Signin'
import Signup from './Signup'
import {Redirect} from "react-router-dom"
import {isAuthenticated} from "../auth/index"

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

        
        <div style={{backgroundImage: "url('https://svgshare.com/i/T18.svg')",
        backgroundRepeat: "no-repeat",
        height: "100vh"
        }}>


 {/* {isAuthenticated() 
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 0 ? <Redirect to="/student" /> : ""
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 1 ? <Redirect to="/teacher" /> : ""
         ? (JSON.parse(localStorage.getItem("jwt"))).user.role === 2 ? <Redirect to="/hod" /> : ""
        
        : "" } */}


        
<div className="row no-gutters">
<div className="offset-6"></div>
<div className="col-5 center">
{login ? <Signin/> : <Signup/>}
       </div>  
</div>
<div className="row no-gutters">
<div className="offset-5"></div>
    <div className="col-5">
    <footer className="foxed-bottom text-white float-right" onClick={()=> login ? setLogin(false) : setLogin(true)}>
         {login ? "New ? Create Account" : "Already have account ? Login"}
     </footer>
    </div>
</div>
     
        </div>
     );
    }
}
 
export default Account;