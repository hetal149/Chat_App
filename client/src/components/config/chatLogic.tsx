import { Avatar, Box } from "@mui/material"

export const getSender=(loggedUser:any,users:any)=>{
  // console.log(user)
  // console.log(users)
    return users[0]?._id=== loggedUser?.result._id ? <>
    <Box sx={{display: 'flex',justifyItems:'space-around', marginTop: '4px'}}>
     <Avatar sx={{ height: '55px', width: '55px',mr:2 }} src={users[1]?.image}></Avatar>
            <b> {users[1]?.name}</b>
            </Box></> : <> <Box sx={{display: 'flex',justifyItems:'space-around', marginTop: '4px'}}>
     <Avatar sx={{ height: '55px', width: '55px',marginRight:'15px' }} src={users[0]?.image}></Avatar>
            <b> {users[0]?.name}</b>
            </Box></>

  
}


export const getSenderFull=(user:any,users:any)=>{
    // console.log(user._id)
    return users[0]._id===user?.result._id ?
   
   
            users[1]
          : users[0]
}



export const isSameSender = (message:any, m:any, i:any, userId:any) => {
  return (
    i < message.length - 1 &&
    (message[i + 1].sender._id !== m.sender._id ||
      message[i + 1].sender._id === undefined) &&
    message[i].sender._id !== userId
  );
};

export const isLastMessage = (message:any, i:any, userId:any) => {
  return (
    i === message.length - 1 &&
    message[message.length - 1].sender._id !== userId &&
    message[message.length - 1].sender._id
  );
};

export const isSameSenderMargin = (message:any, m:any, i:any, userId:any) => {
  // console.log(i === messages.length - 1);

  if (
    i < message.length - 1 &&
    message[i + 1].sender._id === m.sender._id &&
    message[i].sender._id !== userId
  )
    return 0;
  else if (
    (i < message.length - 1 &&
      message[i + 1].sender._id !== m.sender._id &&
      message[i].sender._id !== userId) ||
    (i === message.length - 1 && message[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};


export const isSameUser = (message:any, m:any, i:any, userId:any) => {
  return i > 0 && message[i - 1].sender._id === m.sender._id;
};