const mongoose = require('mongoose')
const chat = mongoose.Schema(
    {
        chatName: { type: 'string',trim: true },
        isGroupChat: { type: 'boolean', default: false},
        users: [{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },],
        latestmsg:{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        grpAdmin:{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },


    },
    {
        timestamps:true,
    }
)
const Chat =mongoose.model("Chat",chat);
module.exports = Chat;