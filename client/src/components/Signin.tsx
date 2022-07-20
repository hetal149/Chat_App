// import { Input } from '@mui/icons-material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
function Signin() {

    const[show,setShow]= useState<boolean>();
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[loading,setLoading] = useState<boolean>()
    const history=useNavigate();
    const handleClickShowPassword = () => {
        setShow(!show)
       };

    const signin=async()=>{
        setLoading(true);


    

        // if(!name||!email||!password){
        //   // alert("Please fill all the fields")
        //   setLoading(false);
        //   return;
        // }
        try {
          const config = { 
            headers:{
              "Content-type":"application/json",
            },
          }
          
          const {data} = await axios.post("/api/user/signin",{email,password},config)
          alert("Login successfully");
          localStorage.setItem('userInfo',JSON.stringify(data))
          setLoading(false)
          history('chats')
        } catch (error) {
          alert("error")
          setLoading(false)
        }
      
    }
  return (
    <div>   
        <Stack spacing={2}>
        <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Email</InputLabel>
            <Input value={email} id="component-simple"  onChange={(e)=>setEmail(e.target.value)} /></FormControl>
            <FormControl variant="standard">
               <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
             <Input value={password}   id="component-simple"  type={show ? 'text' : 'password'} 
           
            endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                        {show ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                         } onChange={(e)=>setPassword(e.target.value)} /></FormControl>

            <Button variant="contained" color="success"  onClick={signin} >
            SignIn
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>{setEmail("guest@example.com");setPassword("123456")}}>
            Get Guest User Credentials
        </Button>
        </Stack>
    </div>
    
  )
}

export default Signin