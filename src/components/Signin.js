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

    const {email, password, error, redirect} = values
    

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


    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-center">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>

                </div>
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


    return(

        <div style={{width:"100%"}}>

        {redirect ? 
            <Redirect to="/student" />
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



export default Signin