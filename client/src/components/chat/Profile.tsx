import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem } from '@mui/material';
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deepPurple } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    title:{
        fontSize:"40px",
        fontFamily:"Work Sans",
        display:'flex',
        justifyContent:"center",
        color:"blue"
    },
    img:{ 
       
        boxSize:'150px',
        height:'300px',
        width:'300px',
        fontSize:'50px',
        paddingBottom:"50px"

        
    },
    cancel:{
      color:'red'
    },
    img1:{ 
        height:'300px',
        width:'300px',
    }
})


function Profile({user,children}:any) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <div>{
        children ? (<span onClick={()=>handleClickOpen()}>{children}</span>):(
            <span onClick={()=>handleClickOpen()}>{<MoreVertIcon/>}</span>
        )}
         <Dialog
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          {user?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Avatar className={classes.img} src={user?.image}  >
            
          {user?.name}
            </Avatar>
            Email:{user?.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={()=>handleClose() } autoFocus className={classes.cancel} >
           Cancel
          </Button>
        </DialogActions>
      </Dialog></div>
  )
}

export default Profile