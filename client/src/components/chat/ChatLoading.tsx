import { Skeleton } from '@mui/material'
import React from 'react'

function ChatLoading() {
  return (
    <div>  
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px'}} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }}/>
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }}/>
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }} />
        <Skeleton sx={{ width: 350,marginLeft:'20px' ,height:'70px' }}/>
        </div>

  )
}

export default ChatLoading