// import React from 'react'
import {ChangeEvent, useEffect, useState}  from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Alert, Box, TextField } from '@mui/material';
import axios from 'axios';
import UserListItem from './user/UserListItem';
import UserBadge from './user/UserBadge';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/Chatprovider';
// import JSX from ''
interface mainProp{
  children?:React.ReactNode[]
}
interface groupchatProp{
 
  u:string
 delUser: string
  _id: string;
 
}
function GroupChat({children}:mainProp) {
    const [open, setOpen] =useState<boolean>(false);
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>()
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])
    const [groupChatName, setgroupChatName] = useState("")

    // console.log(selectedUsers)
    const {setUser,user,chats,setChats}= ChatState();
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
      //  console.log(selectedUsers)

    },[])
    const handleSearch=async(query:any)=>{

        setSearch(query);
        if(!query){
            return;
        }
        try {

            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user?.token}`

                }

            }
            const {data}=await axios.get(`/api/user?search=${search}`,config)
            // console.log(data)
            setLoading(false)
            setSearchResult(data)

        } catch (error) {
            alert(error)
        

        }

    }
    const handleSubmit = async() => {
       console.log(groupChatName)
        if(!groupChatName ||!selectedUsers){
            <Alert severity="success" color="error">
                Please fill all the fields
         </Alert>
          console.log("handle submit")
            return;
        }

        try {
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`

                }

            }
            const {data} =await axios.post("/api/chat/group",{
                name:groupChatName,
             
                users:JSON.stringify(selectedUsers.map((u:any)=>(
                    u._id)
                ))
            },config)
            console.log(data)
            setChats([data,...chats]);
            handleClose();
            <Alert severity="success" color="info">
               Group Chat Created Successfully.
            </Alert>
           
        } catch (error) {
            console.log(error);
            
        }
        }

    const handleDelete = (delUser:groupchatProp) => {
        setSelectedUsers(
            selectedUsers.filter((sel)=>sel._id!==delUser._id)
        )

        }
    const handleGroup = (userToAdd:string) => {
        if(selectedUsers.includes(userToAdd)){
            alert("User Already in the group")
        }
        setSelectedUsers([...selectedUsers,userToAdd])

        }
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  return (
    <div> 
          <span  onClick={handleClickOpen}>
       {children}
      </span>
        <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{fontSize:"35px",fontFamily:"Work sans",display:'flex',justifyContent: 'center'}}>
      {"Create Group Chat"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" sx={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
      <TextField
            autoFocus
            margin="dense"
            id="groupName"
            label="GroupName"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>setgroupChatName(e.target.value)}
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add user"
            onChange={(e)=>handleSearch(e.target.value)}
            fullWidth
            variant="standard"
          />
           <Box sx={{width:'100%',display: 'flex',flexWrap:'wrap'}}>

          {selectedUsers.map((u:any)=>(
            <><UserBadge

              key={u._id}
              user={u}
              handleFunction={()=>handleDelete(u)} admin={null} /></>
          ))}
          </Box>
          {loading ? (

// <ChatLoading />

            <div>Loading...</div>
            ) : (
            searchResult
            ?.slice(0, 4)
            .map((user:any) => (
                <UserListItem
                key={user?.result?._id}
                user={user}
                handleFunction={() => handleGroup(user)}

                />


            ))

)}
      </DialogContentText>  
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>handleSubmit()}>Create</Button>
    </DialogActions>
  </Dialog></div>
  )
}

export default GroupChat