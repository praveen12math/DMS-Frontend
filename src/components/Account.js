import React,{useState} from 'react';
import Signin from './Signin'
import Signup from './Signup'

const Account = () => {

    const [login, setLogin] = useState(true)

    return ( 

        <div style={{backgroundImage: "url('https://svgshare.com/i/T18.svg')",
        backgroundRepeat: "no-repeat",
        height: "100vh"
        }}>
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
 
export default Account;