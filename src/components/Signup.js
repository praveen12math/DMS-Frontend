import React, {useState} from "react"
import { signup } from "../auth/index";


const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        rollno: "",
        batch: "",
        year: "",
        password: "",
        error: "",
        loading: false,
        success: false
    })

    const {name, email, rollno, batch, year, password, error, success, loading} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error:false, loading: true})
        signup({name, email, rollno, batch, year, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false, loading: false})
            }
            else{
                setValues({...values,
                
                success: true,
                loading: false
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
                            <div className="alert alert-danger text-center" style={{display: error ? "" : "none"}}>
                                {error}
                            </div>
                )
            }
        
            const successMessage = () => {
                return (
                            <div className="alert alert-success text-center" style={{display: success ? "" : "none"}}>
                                New account created successfully.
                            </div>
                )
            }
if(loading){
    if(loading){
        return(
            <img src="loader7.gif" alt=""/>
        )
    }
}

else{

    return(
        <div style={{width:"100%"}}>

        {errorMessage()}
        {successMessage()}

        <form>

        {/* <level className="text-white">Name</level> */}
        <input type="text" className="form-control" placeholder="Name"
            onChange={handleChange("name")}
            value={name}
            required
        /><br/>

        {/* <level className="text-white">Email</level> */}
        <input type="text" className="form-control" placeholder="Email"
            onChange={handleChange("email")}
            value={email}
        /><br/>

        {/* <level className="text-white">Roll No</level> */}
        <input type="text" className="form-control" placeholder="Roll No"
            onChange={handleChange("rollno")}
            value={rollno}
        /><br/>

        <div className="row">
            <div className="col">
            {/* <level className="text-white">Batch</level> */}
        <input type="text" className="form-control" placeholder="Batch (Example- 2020)" 
            onChange={handleChange("batch")}
            value={batch}
        />
            </div>

            <div className="col">
            {/* <level className="text-white">Year</level> */}
        <input type="text" className="form-control" placeholder="Year (Example- 2)" 
            onChange={handleChange("year")}
            value={year}
        />
            </div>
        </div>
<br/>
          
        {/* <level className="text-white">Password</level> */}
        <div className="input-group">
        <div class="input-group-prepend" style={{width:"100%"}}>
        <input type="password" id="ipassword" className="form-control" placeholder="Password"
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
}



export default Signup