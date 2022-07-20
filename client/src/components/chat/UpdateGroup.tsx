import Visibility from '@mui/icons-material/Visibility';
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import UserListItem from './user/UserListItem';
import UserBadge from './user/UserBadge';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/Chatprovider';

interface grpProp{
    query:string;
  
    userToAdd:string;
   
    user:string;
    u: string;
    _id: string;
    grpAdmin:boolean;
    user1: string;
}

interface mainProp{
    fetchAgain:boolean;
    setfetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}


function UpdateGroup({fetchAgain, setfetchAgain}:mainProp) {
    const [open, setOpen] = useState<boolean>(false);
 
    const [groupChatName, setgroupChatName] = useState("")
    const [renameLoading, setrenameLoading] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const{setUser,user,selectedChat,setSelectedChat} =ChatState();
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
    const handleClickOpen = () => {
        setOpen(true);
      };
     
      const handleAddUser =async(userToAdd:grpProp)=>{
        if(selectedChat?.users.find((u:grpProp)=>u._id===userToAdd._id)){
            alert("User Already in the group")
        }
       
        if(selectedChat.grpAdmin._id !== user.result._id){
            
            alert("Only Admin can do this")
        }
        try {
            setLoading(true)
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.put('/api/chat/groupadd',
            {
                chatId:selectedChat?._id,
                userId:userToAdd._id},config)
                setSelectedChat(data)
                setfetchAgain(!fetchAgain)
                setLoading(false)
        } catch (error) {
            alert(error)
        }
        // setSelectedUsers([...selectedUsers,userToAdd])
      }
      const handleRemove =async(user1:grpProp)=>{
      if(selectedChat?.grpAdmin?._id !== user._id && user1._id!==user._id){
        alert("Only Admin can do this")
    }
    try {
        setLoading(true)
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.put(`/api/chat/remove`,
        {
            chatId:selectedChat?._id,
            userId:user1._id},config)
            user1._id === user.result._id ? setSelectedChat(null): setSelectedChat(data)
            setfetchAgain(!fetchAgain)
            setLoading(false)
           
    } catch (error) {
        alert(error)
    }
        setgroupChatName("")
}
    const handleSearch=async(query:string)=>{

        setSearch(query);
        if(!query){
            return;
        }
        try {

            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`

                }

            }
            const {data}=await axios.get(`/api/user?search=${search}`,config)
            console.log(data)
            setLoading(()=>false)
            setSearchResult(data)

        } catch (error) {
            alert(error)
        

        }

    }
  
      const handleRename = async() => {
        if(!groupChatName) return;
        try {
            setrenameLoading(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.put(`/api/chat/rename`,{chatId:selectedChat._id,chatName:groupChatName},config)
            setSelectedChat(data)
            setfetchAgain(!fetchAgain)
            setrenameLoading(false)
        } catch (error:any) {
            alert('Error: ' + error.message)
        }
        setgroupChatName('')
      }
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <Box  ><IconButton onClick={()=>handleClickOpen()}><MoreVertIcon /></IconButton>
         <Dialog
       
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
        {selectedChat.chatName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ width:"300px",height:"50px" }}>
                {selectedChat.users.map((u:any)=>(
                     <UserBadge key={u._id}
                     user={u}
                     admin={selectedChat.grpAdmin}
                     handleFunction={()=>{handleRemove(u)}}/>
                ))}
            </Box>
            <TextField id="rename" label="Rename Group"
             value={groupChatName} onChange={(e)=> setgroupChatName(e.target.value)} variant="standard" />
           <Button variant="outlined"  onClick={()=>handleRename()}>Update</Button>
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add user"
            onChange={(e)=>handleSearch(e.target.value)}
            fullWidth
            variant="standard"
          />
         
          {Loading ? (



            <div>  <CircularProgress /></div>
            ) : (
            searchResult
            ?.slice(0, 4)
            .map((user:grpProp) => (
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}

                />

            )))}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>handleRemove(user) } autoFocus color="error" >
           Leave Group
          </Button>
          <Button onClick={()=>handleClose() } autoFocus color="error">
           Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
  )
}

export default UpdateGroup