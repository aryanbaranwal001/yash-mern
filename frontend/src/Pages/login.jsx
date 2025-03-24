
import React,{useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'; 
import {ToastContainer} from 'react-toastify'; 
import axios from 'axios'
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  }); 
  const navigate = useNavigate(); 

  const handleSUbmit = async (e) => {
    e.preventDefault(); 
    try {
      const {data}= await axios.post("http://localhost:5000/login" , values, {
        withCredentials: true
      }); 
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.role==="owner") {
          navigate("/admin"); 
        } else {
          navigate("/home/"); 
        }
      }
        
    } catch(error) {
      console.log(error)
    }
  }; 


  return (
    <div className='container'>
      <h2>Login Account </h2>
      <form onSubmit={(e)=>handleSUbmit(e)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" placeholder="Email" onChange={(e)=>
            setValues({...values, [e.target.name]: e.target.value})}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={(e)=>
            setValues({...values, [e.target.name]: e.target.value})}/>
        </div>
        <button type="submit">Submit</button>

        <span>
          create new account <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer /> 
    </div>
  )
}