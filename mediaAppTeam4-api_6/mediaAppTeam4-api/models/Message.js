const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    query: { type: String, required: true }
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message