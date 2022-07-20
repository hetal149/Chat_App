import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const ChatContext= createContext({} as any);

const ChatProvider =({children}) =>{
    const [user, setUser] = useState()
    const [chats, setChats] = useState<string[]>([])
    const [selectedChat, setSelectedChat] = useState()
    const [notification, setNotification] = useState([]);

    useEffect(() => {
       const userInfo= JSON.parse(localStorage.getItem("userInfo"))
       setUser(userInfo )



    },[])
    return (
        <ChatContext.Provider value={{user,  notification,
            setNotification,setUser,selectedChat,setSelectedChat,chats, setChats}}>

            {children}
        </ChatContext.Provider>
    )
}

export const ChatState =()=>{
    return useContext(ChatContext)
}
export default ChatProvider