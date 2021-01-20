import React, {useState} from "react"
import {signin, authenticate} from "../auth/index"
import {Redirect} from "react-router-dom"


const Signin = () => {


    const [values, setValues] = useState({
        email: "p@gmail.com",
        password: "12345",
        error: "",
        loading: "",
        redirect : ""
    })

    const {email, password, error, redirect, loading} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error:false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }
            else{
                authenticate(data, () => {
                    setValues({...values,
                        email: "",
                        passowrd: "",
                        redirect : true
                        })    
                })
            }
        })
        .catch(console.log("error in signin"))
    }

//     <div class="alert alert-primary" role="alert">
//   A simple primary alert—check it out!
// </div>

    const errorMessage = () => {
        return (
                    <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>

        )
    }

    // const successMessage = () => {
    //     return (
    //         <div className="row">
    //             <div className="col-md-6 offset-sm-3 text-center">
    //                 <div className="alert alert-success" style={{display: success ? "" : "none"}}>
    //                     New account created successfully.
    //                 </div>

    //             </div>
    //         </div>
    //     )
    // }

    

    const seePassword = () => {
        const x = document.getElementById("ipassword")
        if(x.type === "password"){
            x.type = "text"
        }
        else{
            x.type = "password"
        }
            }

            if(loading){
                return(
                    <img src="loader7.gif" alt=""/>
                )
            }
    else{

    return(

        <div style={{width:"100%"}}>

<div class="toast d-flex align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
  <button type="button" class="btn-close ms-auto me-2" data-bs-dismiss="toast" aria-label="Close"></button>
</div>

        {redirect ? 
            <Redirect to="/account" />
         : ""}

        {errorMessage()}
        {/* {successMessage()} */}

        <form>
        
    <level className="text-white">Email</level>
        <input type="email" className="form-control"
            onChange={handleChange("email")}
            value={email}
        /><br/>
        
    
        <level className="text-white">Password</level>
        <div className="input-group">
        <div class="input-group-prepend" style={{width:"100%"}}>
        <input type="password" id="ipassword" className="form-control"
            onChange={handleChange("password")}
            value={password}
        />
          <div class="input-group-text">
           <i className="fas fa-eye" onClick={seePassword}></i>
           </div>
        </div>
        </div>
<br/>
        <button type="submit" onClick={onSubmit} className="btn btn-success float-right">Login</button>

        {/* <p className="text-white text-center">{JSON.stringify(values)}</p>   */}
        
</form>
    </div>
    )
        }
}



export default Signin