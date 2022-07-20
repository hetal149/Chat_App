import React, { useState } from 'react'
import animationData from "../chat/animation/typing.json";
import io from 'socket.io-client'
import Lottie from 'react-lottie';
import { FormControl, TextField } from '@mui/material';
import { ChatState } from '../context/Chatprovider';
import axios from 'axios';
function Text() {
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const[socketConnected, setSocketConnected]= useState<boolean>()
    const [newMessage, setnewMessage] = useState("")
    const [messages, setmessages] = useState<string[]>([])
    const{user,selectedChat} =ChatState(); 
    var socket:any,selectedChatCompare:any;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
    const sendMessage =async(event:any)=>{
   
        if(event.key === "Enter" && newMessage){
            socket.emit("stop typing",selectedChat._id)
            try {
                const config ={
                    headers:{
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setnewMessage("")
                const {data} = await axios.post(`/api/msg`,{
                    content:newMessage,
                    chatId:selectedChat._id},config)
                    // console.log(data)
                    socket.emit("new message", data);
                    setmessages([...messages,data])
                  
            } catch (error) {
                
                alert(error)
            }
        }

    }


 
 
      

    
   
 
    const typingHandler =(e:any)=>{

        setnewMessage(e.target.value)
        //typing idicator
        if(!socketConnected) return;

        if(!typing){
            setTyping(true);
            socket.emit("typing",selectedChat._id)
        }

        let lastTypingTime = new Date().getTime();
        var timerlength = 3000;
        setTimeout(()=>{
            var timeNow = new Date().getTime() 
            var timeDiff = timeNow - lastTypingTime;

            if(timeDiff >= timerlength && typing){
                socket.emit("stop typing",selectedChat._id);
                setTyping(false)
            }
        },timerlength)
        }
  return (
    <FormControl onKeyDown={sendMessage} required className="kaibi returns"  >    

                    {istyping?( <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>):(<></>)}

                    <TextField sx={{ width:1000,position:"fixed"}} 
                    placeholder="Enter Your Message" variant="outlined"
                    
                     onChange={typingHandler}
                     value={newMessage}></TextField>
             </FormControl>
  )
}

export default Text