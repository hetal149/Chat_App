import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import SideDrawer from './SideDrawer';

import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { useNavigate } from 'react-router-dom';



function Chat() {
  const [user, setUser] = useState<object>()
    const [fetchAgain, setfetchAgain] = useState<boolean>(false)
    const navigate = useNavigate();
    useEffect(() => {
      const value= localStorage.getItem("userInfo")
     
      if(typeof value=== 'string'){
       var userInfo:any = JSON.parse(value)

      }
      setUser(userInfo )

      if(!userInfo){
       navigate('')
       alert('hi')
      }


   },[])
  return(
    <>
    <Box sx={{color:'black',height:"100vh", overflow:'hidden'}} display="flex">
          <Grid container >
              <Grid item xs={3} >
              {user && <SideDrawer fetchAgain={fetchAgain}/>}
              </Grid>
              <Grid item xs={9}>
              {user && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />}
              </Grid> 
          </Grid>
      </Box>
      </>
    )
  
};

export default Chat