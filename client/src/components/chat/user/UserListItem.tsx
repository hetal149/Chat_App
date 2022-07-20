import { Avatar, Box, Badge,  Toolbar, Typography } from '@mui/material';
import React from 'react'

import {makeStyles} from '@mui/styles'
// import { Badge } from '@mui/icons-material';

const useStyles = makeStyles({
  box:{
    cursor: 'pointer',
    backgroundColor:"#E8E8E8",
    overflow:"none",
    '&:hover':{
            backgroundColor :"#38B2AC",
            color: "white"
          },
          width: "350px", 
          marginTop:"10px",
          marginLeft:"20px",
          marginRight:"200px",
          display:"flex",
          alignItems: "center",
          color: "black",
          borderRadius:"8px",
          height:"60px"
  }
})
function UserListItem({user,handleFunction}:any) {
  // const {user} = ChatState();
  const classes = useStyles();
  // console.log("user")
  return (
    
   <Box className={classes.box}
      onClick={handleFunction}
      >
        <Badge color="secondary" variant="dot">


    <Avatar sx={{marginRight:2,size:'small',cursor: 'pointer'}} src={user?.image} >{user?.name.split('')[0]}</Avatar></Badge>
    <Typography>{user?.name} <br/>
    Email: {user?.email}</Typography>
   </Box>
  )
}

export default UserListItem