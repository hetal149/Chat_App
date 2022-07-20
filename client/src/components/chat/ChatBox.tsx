import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import SingleChat from './SingleChat'

interface chatboxProp{
  setfetchAgain:React.Dispatch<React.SetStateAction<boolean>>;
  fetchAgain:boolean;
  
  
}
function ChatBox({fetchAgain, setfetchAgain}:chatboxProp) {
  // const { selectedChat } = ChatState();
  return (
    <Box sx={{height:"100vh", flexGrow: 1,position: 'relative', overflow: 'auto'}}>
        <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
       </Box>
  )
}

export default ChatBox