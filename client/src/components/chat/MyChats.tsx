import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import GroupChat from './GroupChat';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/Chatprovider';

const useStyles = makeStyles({
  box:{
   
   
      width:"100%",
    flexDirection:"column",
    alignItems:"center",
    paddng:3,
    borderRadius:"30px",
    borderWidth:'1px'
  },
  box2:{
    paddingBottom:3, 
    fontSize:"28px",fontFamily:"Work Sans",
    display:"flex",
    width:"100%", 
    justifyContent:"space-between",
    alignItems:"center",
    color:"black"
  }
})



interface myChatProp{
  fetchAgain:boolean;
}
function MyChats({fetchAgain}:myChatProp) {

  const{selectedChat,setUser,user, setChats} = ChatState();
    const navigate = useNavigate();
   
  const classes = useStyles();

  useEffect(() =>{
    (async()=>{
      await userone();
     
    })();
  
   
    
   },[fetchAgain])
   const userone = async()=>{
    const userInfo= await JSON.parse(localStorage.getItem("userInfo"))
      setUser(userInfo)
    
   }
  return (
    <div>
      <Box className={classes.box} sx={{ display:{base:selectedChat?"none":"flex"}}} >
        <Box className={classes.box2}>
        
          
      
         <GroupChat> <Button variant="outlined" >New Group Chat<AddIcon/></Button></GroupChat>

         
        </Box>          
  
    </Box>
      
    </div>
  )
}

export default MyChats