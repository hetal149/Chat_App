import { Chip, Stack,Avatar } from '@mui/material'
import React from 'react'
// import ClearIcon from '@mui/icons-material/Clear';
interface badgeProps{
  user:any;
  admin:any;
  handleFunction:any
  key:any


}
function UserBadge({user,admin,handleFunction}:badgeProps) {
  // console.log(admin);
  // console.log(user._id)
  return (
    
        <Chip color='secondary' avatar={<Avatar  src={user.image} />} disabled={!admin?._id === user?._id } label={admin?._id === user?._id ?user.name + '(admin)  🞭': user.name + '  🞭' } onClick={handleFunction} />)} 

export default UserBadge
   