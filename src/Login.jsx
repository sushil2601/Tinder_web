import { useState } from "react"
import axios from "axios";

const Login = () => {

  const[emailId,setEmailId] = useState('nibha@gmail.com');
  const[password,setPassword] = useState('Nibha@123');

  const handleClick = async() =>{
    try{
        const res = await axios.post(
            "http://localhost:3000/login",
            {
                emailId,
                password,
            },
            {
                withCredentials : true,
            }
        )
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <div className="flex justify-center m-10">
        <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body justify-center">
            <h2 className="card-title justify-center">Login</h2>
            <div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Email Id: </span>
                    </div>
                    <input 
                        type="text" 
                        value={emailId} 
                        onChange={(e)=>setEmailId(e.target.value)}
                        className="input input-bordered w-full max-w-xs" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password: </span>
                    </div>
                    <input 
                        type="text" 
                        value = {password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="input input-bordered w-full max-w-xs" />
                </label>

            </div>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleClick}>Login</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login
