import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import { Box, Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Signin from './Signin';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  useEffect(() => {

    const value= localStorage.getItem("userInfo")
      
       if(typeof value=== 'string'){
        var user = JSON.parse(value)

       }
    

     if(user){
      navigate('chats')
     }


  },[navigate])
  const [value, setValue] = React.useState('1');

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg" >
        
        <Box sx={{backgroundColor:'white',
        width:"450px",
        marginTop:"30px",
        marginLeft:"300px",
        padding:2,
        borderRadius:"5px",borderWidth:"1px", 
        }}> <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="SignIn" value="1" sx={{ width: "200px"}}/>
            <Tab label="SignUp" value="2" sx={{ width: "200px"}}/>
            
          </TabList>
        </Box>
        <TabPanel value="1" ><Signin/> </TabPanel>
        <TabPanel value="2"><Signup/> </TabPanel>
       
      </TabContext></Box>
    </Container>
  )
}

export default Home