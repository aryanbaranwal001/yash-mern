import React,{useState} from 'react'; 

import {Link} from 'react-router-dom'; 
import {ToastContainer, toast} from 'react-toastify'; 
import axios from 'axios'
export default function Register() {
  const [values, setValues] = useState({
    name: "", 
    email: "",
    password: "",
    isOwner: false, 
  }); 

  const handleSUbmit = async (e) => {
    e.preventDefault(); 
    try {
      const {data}= await axios.post("http://localhost:5000/register" , {
        ...values,
        })
    } catch(error) {
      console.log(error)
    }
  }

  const handleCheckboxChange = (e) => {
    setValues({...values, isOwner: e.target.checked});
  };
  


  return (
    <div className='login-container'>
    <div className='container'>
      <h2>Register Account </h2>
      <form onSubmit={(e)=>handleSUbmit(e)}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type="name" name="name" placeholder="name" onChange={(e)=>
            setValues({...values, [e.target.name]: e.target.value})}/>
        </div>
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
        {/* Checkbox for Restaurant Owner */}
        <div className='checkbox-container'>
          <input 
            type="checkbox" 
            name="isOwner" 
            id="isOwner"
            checked={values.isOwner}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="isOwner">I am a restaurant owner</label>
        </div>
        <button type="submit">Submit</button>

        <span>
          Already have an account?  <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer /> 
    </div>
    </div>
  )
}
