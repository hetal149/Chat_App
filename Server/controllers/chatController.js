// const { default: Chat } = require("../../client/src/components/Chat")
const Chat = require("../models/chat")
const asyncHandler = require('express-async-handler')
const User = require("../models/user")

const accessChat =asyncHandler(async(req,res) =>{
   const{userId} =req.body

   if(!userId){
    console.log("UserId Params not sent with request")
    return res.sendStatus(400)
   }

   var isChat = await Chat.find(
    {
        isGroupChat: false,
        $and: [{
            users:{$elemMatch:{$eq:req.user._id}},
            users:{$elemMatch:{$eq:userId}},
        }]
    }
   ).populate("users","-password").populate("latestmsg")
   
   isChat=await User.populate(isChat,{
    path:"latestmsg.sender",
    select:"name image email"
   })

   if(isChat.length>0){
    res.send(isChat[0])
   }
   else{
    var chatData={
        chatName:"sender",
        isGroupChat:false,
        users:[req.user._id,userId]
    }
    try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users","-password");
        res.status(200).send(FullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
        
    }
   }
})
const getChat = asyncHandler(async (req, res) => {

    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("grpAdmin", "-password")
        .populate("latestmsg")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestmsg.sender",
            select: "name image email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

const createGroup= asyncHandler(async(req, res)=>{
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message:"Please Fill all the fields"})
    }

    var users= JSON.parse(req.body.users);

    if(users.length <2){
        return res.status(400).send({message:"More than 2 users required for group chat"})
    }

    users.push(req.user)

    try {
        const groupChat = await Chat.create({ 
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            grpAdmin:req.user,

        })
        const FullGroupChat = await Chat.findOne({_id: groupChat._id}).populate("users","-password")
        .populate("grpAdmin","-password");
        res.status(200).send(FullGroupChat)
    } catch (error) {

        throw new Error(err.message)
        
    }
})

const renameGroup = asyncHandler(async(req, res) =>{
    const {chatId,chatName} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,
        {
            chatName:chatName,

        },
        {new:true})
        .populate("users","-password")
        .populate("grpAdmin", "-password");

        if(!updatedChat){
            res.status(404);
            throw new Error("Chat not Found")
        }
        else{
            res.json(updatedChat)
        }
})

const addToGroup = asyncHandler(async (req, res) => {
    const {chatId,userId} = req.body;

    const added =await Chat.findByIdAndUpdate(chatId,{
        $push:{ users : userId},
                },
                {new: true})
                .populate("users", "-password")
                .populate("grpAdmin","-password")

    if(!added){
        res.status(404)
        throw new Error("Chat Not found")
    }
    else{
        res.json(added)
    }
})
const removeFromGroup = asyncHandler(async (req, res) => {
    const {chatId,userId} = req.body;

    const removed =await Chat.findByIdAndUpdate(chatId,{
        $pull:{ users : userId},
                },
                {new: true})
                .populate("users", "-password")
                .populate("grpAdmin","-password")

    if(!removed){
        res.status(404)
        throw new Error("Chat Not found")
    }
    else{
        res.json(removed)
    }
})

module.exports = {accessChat , getChat,createGroup,renameGroup,addToGroup,removeFromGroup}