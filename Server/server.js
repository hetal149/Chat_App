const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const connectDB = require('./config/db')
const app = express()
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errormiddleWare')
dotenv.config();
app.get('/',(req,res) => {
    res.send("API is running")


})
connectDB();

app.use(express.json())


app.get('/api/chat/:id',(req,res) => {
    // console.log(req.params.id)
    const singleChat=chats.find((c)=>c._id === req.params.id)
    res.send(singleChat)
})


app.use(errorHandler)

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/msg",messageRoutes)

const PORT = process.env.PORT;
const server = app.listen(PORT,console.log(`Server is running on port ${PORT}`))

const io =require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection",(socket) => 
{
    console.log("connected to socket");
    socket.on("setup",(userData)=>{
        socket.join(userData?._id)
        // console.log(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room)
        console.log("user join room: ",room);
    })
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageReceived) => {
    // console.log("/////",newMessageRecieved)
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user)=> {

      
      if (user._id === newMessageReceived.sender._id) return;
      
      socket.in(user._id).emit("message received", newMessageReceived);
      
    });
  })
  
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})
