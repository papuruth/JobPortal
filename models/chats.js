const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema

const chatData = new ChatSchema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    messages: {
        type: Array,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('chats', chatData);