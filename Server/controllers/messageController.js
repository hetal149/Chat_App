
const asyncHandler = require('express-async-handler');
const Chat = require('../models/chat');
const Message = require('../models/message');
const User = require('../models/user');
const sendMessage = asyncHandler(async(req, res)=>{
    const {content,chatId} = req.body

    if(!content || !chatId){
        // console.log("first")
        return res.sendStatus(400);
    }
    var newMsg ={
        sender:req.user._id,
        content:content,
        chat:chatId
    }

    try {
        var message =await Message.create(newMsg);

        message =await message.populate("sender","name image")
        message =await message.populate("chat")
        message = await User.populate(message, {path:"chat.users",select:"name image email "})

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestmsg: message
        })

        res.json(message)
    } catch (error) {
        console.log(error.message)
    }

})

const allMessages = asyncHandler(async(req, res)=>{

    try {
        const message = await Message.find({chat:req.params.chatId}).populate("sender","name image email").populate("chat")
        res.json(message)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }

})

module.exports = {sendMessage, allMessages}