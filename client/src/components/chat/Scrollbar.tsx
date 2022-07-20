import { Avatar,Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed'
import Tooltip from '@mui/material/Tooltip';
import moment from "moment";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/chatLogic'
import { ChatState } from '../context/Chatprovider';

interface scrollProps{
    messages: any
    
}


function Scrollbar({messages}:scrollProps) {
    const {user,setUser} =ChatState();
   
    const navigate = useNavigate();
    useEffect(() => {

       const value= localStorage.getItem("userInfo")
      
       if(typeof value=== 'string'){
        var userInfo:any = JSON.parse(value)

       

       }
    //    console.log(messages);
       setUser(userInfo )

       if(!userInfo){
        navigate('')
        alert('hi')
       }


    },[])
   
  return (
    <Box>
    
        {messages && messages.map((m:any,i:any)=>(
          
            <><Box sx={{ display: 'flex', flexGrow: 1, overflowY: "auto", alignItems: 'center' }} key={m?._id}>

               

                <span style={{
                    backgroundColor: `${m.sender._id === user?.result?._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                    overflow: 'auto',
                    marginLeft: isSameSenderMargin(messages, m, i, user?.result?._id),
                    marginTop: isSameUser(messages, m, i, user?.result?._id) ? 3 : 10

                }}>
                    {m.content}
                  
                </span>  <span style={{ fontSize: "10px"}}><p>{moment(m.createdAt).format('LT')}</p></span><br />

            </Box></>   
        ))}
    </Box>
  )
}

export default Scrollbar

