import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../auth/Controller';
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';


const PasswordRecovery = () => {

    const history = useHistory()

    const {token} = useParams()

    const [password, setPassword] = useState()
    const [flag, setFlag] = useState(true)


    const seePassword = () => {
        const x = document.getElementById("password")
        if(x.type === "password"){
            x.type = "text"
        }
        else{
            x.type = "password"
        }
            }

            const handleChange = () => {
                if(document.getElementById("password").value === document.getElementById("Cpassword").value){
                    document.getElementById("errorM").style.display = 'none'
                    setFlag(false)
                }                
                else{
                    document.getElementById("errorM").style.display = 'block'
                    setFlag(true)
                }
            }

            const onSubmit = () => {
                resetPassword({password, token})
                .then(res => {
                    if(res.error){
                        return swal({
                            title: res.error,
                            icon: "error"
                          })
                          .then(
                            history.push('/account')
                          )
                    }

                    if(res.err){
                        return swal({
                            title: res.err,
                            icon: "error"
                          })
                          .then(
                            history.push('/account')
                          )
                    }

                    swal({
                        title: res.message,
                        icon: "success"
                      })
                      .then(
                        history.push('/account')
                      )
                })
            }

    return ( 
        <div className="passwordRecovery">

        <div className="row mt-5">
            <div className="col-3"></div>
            <div className="col-6 mt-5">
            <form>
            <level className="text-white">New Password</level>
        <div className="input-group">
        <div class="input-group-prepend" style={{width:"100%"}}>
        <input type="password" className="form-control"
        onChange={(e)=> {
            handleChange();
            setPassword(e.target.value);
        }}
        
        id="password"
        />
          <div class="input-group-text">
           <i className="fas fa-eye" onClick={seePassword}></i>
           </div>
        </div>
        </div>
<br/>
        <level className="text-white">Confirm New Password</level>
        <div className="input-group">
        <div class="input-group-prepend" style={{width:"100%"}}>
        <input type="password" className="form-control"
        id="Cpassword"
        onChange={handleChange}
        />
        </div>
        </div>

        </form>
        <br/>
        <h5 className="text-center text-danger" id="errorM">Password not match</h5>

<div className="text-center">
        <button className="btn btn-info" id="saveButton" 
        onClick={()=> onSubmit()} disabled={flag}
        >Save Password</button>
        </div>
            </div>            
        </div>       
        <div className="col-3"></div>
        </div>
     );
}
 
export default PasswordRecovery;