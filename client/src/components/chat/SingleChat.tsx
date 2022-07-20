import {  Box,AppBar, Divider, FormControl, TextField ,Input} from '@mui/material';
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { deepPurple } from '@mui/material/colors';
import { getSender, getSenderFull } from '../config/chatLogic';
import Profile from './Profile';
import UpdateGroup from './UpdateGroup';
import axios from 'axios';
import animationData from "../chat/animation/typing.json";
import'./singleChat.css'
import Lottie from "react-lottie";
import Scrollbar from './Scrollbar';
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/Chatprovider';
import Text from './Text';
import Picker from 'emoji-picker-react';

const ENDPOINT = "http://localhost:5000";
var socket:any,selectedChatCompare:any;



interface singleProp{
  fetchAgain:boolean;
  setfetchAgain: React.Dispatch<React.SetStateAction<boolean>>;}
const SingleChat=({fetchAgain, setfetchAgain}:singleProp) =>{
    
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const{user,setSelectedChat,selectedChat,setUser,notification, setNotification } =ChatState();
    const [messages, setmessages] = useState<string[]>([])
    const [newMessage, setnewMessage] = useState("")
    const [loading, setloading] = useState<boolean>(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const[socketConnected, setSocketConnected]= useState<boolean>()
    
  

   
    const fetchMessage=async()=>{
        if(!selectedChat) return
        try {
            const config ={
                headers:{
                  
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setloading(true)
            
            const {data} = await axios.get(`/api/msg/${selectedChat._id}`,config)
                
              
                setmessages(data)
                // console.log(messages)
                setloading(false)
                socket.emit("join chat", selectedChat._id);
        } catch (error) {
            
            alert(error)
        }
    }
    
   
    const sendMessage =async(event:any)=>{
   
        if(event.key === "Enter" && newMessage){
            socket.emit("stop typing",selectedChat._id)
            try {
                const config ={
                    headers:{
                        "Content-type": "application/json", 
                        Authorization: `Bearer ${user.token}`,
                    }
                }
                setnewMessage("")
                const {data} = await axios.post("/api/msg",{
                    content:newMessage,
                    chatId:selectedChat,},config)
                    console.log(data)
                    socket.emit("new message", data);
                    setmessages([...messages,data])
                    console.log(messages)
                  
            } catch (error) {
                
                alert(error)
            }
        }

    }

    useEffect(() => {
      socket =io(ENDPOINT)
      socket.emit("setup",user)
      socket.on("connected",()=>setSocketConnected(true))
      socket.on("typing", () => setIsTyping(true));
     socket.on("stop typing", () => setIsTyping(false));
     
   
  }, [])

        
    useEffect(() => {
    fetchMessage()
    setUser(JSON.parse(localStorage.getItem('userInfo')))
    selectedChatCompare= selectedChat;
   
   }, [selectedChat])
   
    useEffect(() => {
      socket.on("message received", (newMessageReceived:any) => {
      console.log(newMessageReceived);
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageReceived.chat._id
        ) {
          if (!notification.includes(newMessageReceived)) {
            setNotification([newMessageReceived, ...notification]);
            setfetchAgain(!fetchAgain);
          }
        } else {
          console.log('newMessageReceived')
          setmessages([...messages, newMessageReceived]);
        }
      });
  },[]); 
 
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
       
  // const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setnewMessage(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
    
  return (
    <>
        
        {selectedChat?(
            <>
            <AppBar position="static" sx={{  bgcolor: deepPurple[500],boxShadow:0,height:"70px",position:"fixed"}}
             >
           

            {messages && (!selectedChat?.isGroupChat) ?(
             <>
           
             {getSender(user,selectedChat.users)}
             <Profile user={getSenderFull(user, selectedChat.users)} />
             </>)
             :
            (   
           <>{selectedChat?.chatName}
           <UpdateGroup fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/></>
            )
            }

             </AppBar>
             <Divider/>
             <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'flex-end',backgroundColor:'#E8E8E8',width:"100%",height:"100%",borderRadius:'large',overflowY:'hidden'}}>

             {loading?(<CircularProgress sx={{marginTop:'300px',marginLeft:'500px'}}/>) :(
             
             <div className="msg">

                <Scrollbar messages={messages}/>
             </div>
             )}
                <FormControl onKeyDown={sendMessage} required   >    

                    {istyping?( <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>):(<></>)}
                
          
           <div className="picker-container">
         
                
           {showPicker && <Picker
          pickerStyle={{ width: '250px' }}
          onEmojiClick={onEmojiClick} />}
                    <TextField  className="input-style"
                    placeholder="Enter Your Message" variant="outlined"
                    value={newMessage}
                     onChange={typingHandler}
                    />
                    <img 
                        className="emoji-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbl6zvP3BFY7imUStLv_YNFvByKjtBoTriCw&usqp=CAU"
                     onClick={() => setShowPicker(val => !val)} />
                     <Input type="file" value={newMessage}/>
                    </div>
                     
            
             </FormControl>
            
             </Box>
           </>
        ):(
           <Box sx={{color: 'black',marginTop:"300px",marginLeft:"150px",fontSize:"30px"}}>Click on user to Chat..!!!</Box> 
        )}
    </>
  )
}

export default SingleChat