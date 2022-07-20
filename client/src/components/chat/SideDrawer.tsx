import { Avatar, Box, Button, CircularProgress, Divider, InputLabel, Grid, Input, List, ListItem, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import { deepPurple,lime } from '@mui/material/colors';

import axios from 'axios';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Profile from './Profile';
// import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import ChatLoading from './ChatLoading';
import UserListItem from './user/UserListItem';
import MyChats from './MyChats';
import { getSender } from '../config/chatLogic';
import { ChatState } from '../context/Chatprovider';

interface mainProp{
  fetchAgain:boolean;
}
interface Sidedrawer{
  c: string
  _id:string;

}

interface chatProp{
  chat:string[]
  isGroupChat:boolean;
  chatName:string;
  _id:string;
  
  users:[] 

}
function  SideDrawer( {fetchAgain}:mainProp) {
  const{user,selectedChat,setSelectedChat,chats, setChats} = ChatState();
  const navigate = useNavigate();
 
  
    const[loggedUser,setloggedUser]= useState<any>()
   
    const [searchResult, setsearchResult] = useState([])
    const drawerWidth = 350;
    const [Loading, setLoading] = useState(false)
    const [search, setsearch] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [loadingChat, setLoadingChat] = useState(false)
    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };
// console.log(searchResult)
    
    useEffect(() => {
     
     setloggedUser(JSON.parse(localStorage.getItem("userInfo")))
    //  console.log(loggedUser.result._id);
      getChat();
    }, [fetchAgain])
    

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler=() => {
        localStorage.removeItem("userInfo")
        navigate('/')
    }

    const handleSearch = async() =>{
        if(!search){
          alert("Please enter something to search")
        }

        try {
          setLoading(true)

          const config ={ 
            headers: {
              Authorization: `Bearer ${user.token}`, 

            }
          }
          const {data} = await axios.get(`/api/user?search=${search}`,config)
         
          setLoading(false);
          setsearchResult(data)
        } catch (error) {
          
        }
    }

    const getChat = async() => {
   
      try {
       
        const config ={ 
        
          headers: {
            
            Authorization: `Bearer ${user?.token}`, 
  
          }
        }
        
        
        
        const {data} = await axios.get("/api/chat",config)
        console.log(data)
        setChats(data)
      
      } catch (error:any) {
        console.log("Error: " + error.message)
        
      }
  
    }

    const accessChat = async (userId:string) => {

      try {
        setLoadingChat(true)
        const config ={ 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, 

          }
        }
        const {data} = await axios.post("/api/chat",{userId}, config)
        if(!chats.find((c:any)=>c._id === data._id)) 
        setChats([data,...chats])

        setLoadingChat(false)
        setSelectedChat(data)
        // onclose()
      } catch (error) {
        
      }

    }

    
  return (
    <>
    <Box
      sx={{height:"100vh",padding:"10px", overflow: 'auto'}} >
      
    <Stack
        direction="column"
        justifyContent="space-between"
      >      
      <Box sx={{
        bgcolor: deepPurple[500],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginTop:"-15px",
        marginLeft:"-11px",
        padding: '5px 10px 5px 10px',
        borderWidth: '5px',
        height:"65px"
      }}>
        <Button
            id="basic-button"
          
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            // endIcon={<KeyboardArrowDownIcon />}
          >
            <Avatar sx={{ bgcolor: lime[500] }} src={user?.result?.image}>{user?.result?.name.split('')[0]}</Avatar>
          </Button>
       
        <Tooltip title="Search users for chat" arrow placement="bottom-end" >
         
          <Button  sx={{ color: 'black' ,width:"1800px"}}><i className='fas fa-search'></i>&nbsp;&nbsp; <Input placeholder="search users for chat" sx={{marginRight:"2px"}} value={search} onChange={(e)=> setsearch(e.target.value)} /><Button color="error" onClick={() =>handleSearch()}>GO</Button></Button>
        </Tooltip>
       
      
        <Grid xs={12}>

          
         
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            flex-grow={1}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }} 
          >
            <Profile user={user.result}>
              <MenuItem>My Profile</MenuItem>
            </Profile>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Box>
        
       
        <Divider />
        {Loading ? <ChatLoading/>:
          searchResult?.map((user:Sidedrawer)=>(
            <UserListItem key={user?._id}
            user={user}
            handleFunction={()=>{accessChat(user?._id)}}/>
          ))
        }
        {loadingChat && <CircularProgress />}
        {user && <MyChats fetchAgain={fetchAgain}  />} 

        <Box sx={{display: 'flex',
        flexDirection: 'column',
        padding:3,
        marginLeft:"-35px",
        backgroundColor:"#F8F8F8",
         width:"100%",height:"100%",
         borderRadius:"20px"}}>

          {chats?
          <Stack>
            {chats.map((chat:any)=>(
             <Box  onClick={()=> setSelectedChat(chat)} 
             sx={{cursor: 'pointer',marginLeft:'10px' ,
             marginBottom:'10px',height:'70px',
             backgroundColor: selectedChat===chat ? '#38B2AC' : '#E6E6E6',
             color: selectedChat===chat ? '#ffffff' : '#000000',
             borderRadius:'10px',textAlign: 'center',
             overflow: 'auto'
            }}
            key={chat._id}>
                <Typography>
                  {!chat?.isGroupChat ?
                     getSender(loggedUser,chat.users)
                  :
                  chat.chatName
                  }
                  
                </Typography>
             
                {chat.latestmsg && (

          <InputLabel sx={{marginLeft:"-55px",marginTop:"-30px"}} >
                
                  {chat.latestmsg.sender.name} : 

                  {chat.latestmsg.content.length > 50

                    ? chat.latestmsg.content.substring(0, 51) + "..."

                    : chat.latestmsg.content}

              
            </InputLabel>

)}
             </Box>
            ))}
          </Stack>
        
        :
          
            <ChatLoading/>
          }

        </Box>
       
      </Stack>
      </Box>
    
   </>
  )
}

export default SideDrawer