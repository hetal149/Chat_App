import { Button, FormControl, FormLabel, IconButton,InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';


function Signup() {
  const history = useNavigate();
    const[show,setShow]= useState<boolean>()
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[loading,setLoading] = useState<boolean>()
  // const toast =useToast();
  
    const[image,setImage] = useState()
    const handleClickShowPassword = () => {
       setShow(!show)
      };

      const postdetails=(images:any)=>{
        setLoading(true);
        if(images === undefined){
          alert("Please Select an Image")
          return;
        }
        if(images.type==="image/jpeg" ||images.type==="image/png" ||images.type==="image/jpg"){
          const data = new FormData();
          data.append("file",images)
          data.append("upload_preset","chatApp")
          data.append("cloud_name","djtllnjfg")
          fetch("https://api.cloudinary.com/v1_1/djtllnjfg/image/upload",{
            method:'post',body:data,
          }).then((res)=>res.json()).then(data=>{
            setImage(data.url.toString());
            // console.log(data.url.toString());
            setLoading(false);
          })
          .catch((err)=>{
            // console.log(err);
            setLoading(false)
          })
        }else{
          alert("please select image");
          // setLoading(false);
          // return;
        }
      }
      const signup=async( )=>{
        setLoading(true);
      try {
        const config = { 
          headers:{
            "Content-type":"application/json",
          },
        }
        
        const {data} = await axios.post(`/api/user`,{name,email,password,image},config)
        // console.log(data)
        alert("registerd");
        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(false)
        history('')
      } catch (error) {
        alert("error")
        setLoading(false)
      }
    }
  return (
    <div>
    <Stack spacing={2}>
    <FormControl variant="standard">
    <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
        
        <Input id="component-simple"  onChange={(e: { target: { value: any; }; })=>setName(e.target.value)} /></FormControl>
        <FormControl variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
        <Input id="component-simple"  onChange={(e)=>setEmail(e.target.value)} /></FormControl>
        <FormControl variant="standard">
       
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input  id="component-simple" type={show ? 'text' : 'password'}  endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            } onChange={(e)=>setPassword(e.target.value)} /></FormControl>
        
        {/* <TextField id="standard-basic" label="Image" variant="standard"    onChange={(e)=>setImage(e.target.value)} /> */}
          
            <input type="file"  accept="image/*" onChange={(e)=>postdetails(e.target.files![0])} />
        {/* https://api.cloudinary.com/v1_1/roadsidercoder/image/upload */}
        
        <Button variant="contained" color="success"  onClick={signup}>
            SignUp
        </Button>

        

      
   
  </Stack></div>
  )
}

export default Signup