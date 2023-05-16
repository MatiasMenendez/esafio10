import mongoose from "mongoose"
import pkg from 'validator'
const { isEmail } = pkg

const messagesCollection = 'messages'

const messageSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [ isEmail, 'invalid email' ]
    },
    date: {
        type: Date
    }
})

const messageModel = mongoose.model(messagesCollection, messageSchema)

export default messageModel