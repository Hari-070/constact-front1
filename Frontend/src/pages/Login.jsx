import React, { useContext, useState } from 'react'
import '../stylesheet/login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { AuthContext } from '../ContextProvider/AuthContext'

const Login=()=> {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const {setData,setMail,data}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        console.log(loading)
        // navigate('/')
        // toast.success("click success")
        try {
          await axios.post("https://contact-front-ashen.vercel.app/login",{email,password})
          .then(res=>{
            setLoading(false)
            console.log(loading)
            setData(res.data)
            console.log(res.data)
            toast.success("logged in successfully!")
              navigate('/')
              localStorage.setItem("contact-user",JSON.stringify(res.data.username))
              setMail(res.data.username)

          })
        } catch (error) {
          console.log(error)
          toast.error(error.response.data)
        }
    }
  return (
    <div className='login_cont'>
        <div className='login_cont1'>
        <div>
            <h1><span style={{color:"rgba(5, 219, 19, 0.74)"}}>Contact</span>Login</h1>
        </div>
        
      <form className='login_form' onSubmit={handleSubmit} >
        <label>Email:</label>
        <input type='email' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <label >Password:</label>
        <input type='password' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
       
        <button type='submit' style={{backgroundColor:"rgba(5, 219, 19, 0.74)",border:"none"}}>Login</button>
      </form>
      
      <h2><a href='https://easycontact-tau.vercel.app/signup' style={{color:"rgba(5, 219, 19, 0.74)",fontSize:'15px'}}>New here? Signup</a></h2>
      </div>
    </div>
  )
}

export default Login
