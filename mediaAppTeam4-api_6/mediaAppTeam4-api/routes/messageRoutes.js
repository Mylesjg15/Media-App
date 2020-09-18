const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.post('/', (req, res) => {

    const {email, query} = req.body
    const message = new Message()

    message.email = email
    message.query = query
    message.save()
            .then(newMessage => res.json(newMessage))
            .catch(err => res.status(500).json(err))
})

router.delete('/:id', (req,res) => {
    const {id} = req.params
    Message.findByIdAndDelete(id)
        .then(message => res.json(message))
        .catch(err => res.status(500).json({
            "status": "Error",
            "message": err
        }))
})

router.get('/', (req, res) => {
    Message.find()
        .then(message => {
            res.json(message)
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

module.exports = router