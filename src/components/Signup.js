import React, {useState} from "react"
import { signup } from "../auth/index";


const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        rollno: "",
        password: "",
        error: "",
        success: false
    })

    const {name, email, rollno, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error:false})
        signup({name, email, rollno, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                setValues({...values,
                name: "",
                email: "",
                rollno: "",
                password: "",
                success: true
            })
            }
        })
        .catch(console.log('error in signup'))
    }

    const seePassword = () => {
        const x = document.getElementById("ipassword")
        if(x.type === "password"){
            x.type = "text"
        }
        else{
            x.type = "password"
        }
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
        
            const successMessage = () => {
                return (
                    <div className="row">
                        <div className="col-md-6 offset-sm-3 text-center">
                            <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                                New account created successfully.
                            </div>
        
                        </div>
                    </div>
                )
            }


    return(
        <div style={{width:"100%"}}>

        {errorMessage()}
        {successMessage()}

        <form>

<level className="text-white">Name</level>
        <input type="text" className="form-control"
            onChange={handleChange("name")}
            value={name}
            required
        /><br/>

    <level className="text-white">Email</level>
        <input type="text" className="form-control"
            onChange={handleChange("email")}
            value={email}
        /><br/>

        <level className="text-white">Roll No</level>
        <input type="text" className="form-control"
            onChange={handleChange("rollno")}
            value={rollno}
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
        <button type="submit" onClick={onSubmit} className="btn btn-success float-right">Register</button>
        
</form>
    </div>
    )
}



export default Signup