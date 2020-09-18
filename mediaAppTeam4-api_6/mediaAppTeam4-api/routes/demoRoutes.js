// const express = require('express')
// const router = express.Router()
// const User = require('../models/User')


// router.get('/users/', (req,response) => {
//     User.find()
//         .then(users => {
//             response.json(users)
//         })
//         .catch(err => {
//             response.status(500).json({msg:err})
//         })
// })

// router.get('/users/:id', (req, response) => {
//     const { id} = req.params

//     User.findById(id)
//         .then(user => response.json(user))
//         .catch(err => response.status(500).json({
//             "status": "Error",
//             "message":err
//         }))
// })

// router.post('/users/', (req,res) => {
//     const {fullName, email, address, item} = req.body
//     const user = new User()

//     user.fullName = fullName
//     user.email = email
//     user.address= address
//     user.item = item
    
//     user.save()
//         .then(newUser => res.json(newUser))
//         .catch(err => res.status(500).json(err))
// })

// router.delete('/users/:id', (req,res) => {
//     const {id} = req.params
//     User.findByIdAndDelete(id)
//         .then(user => res.json(user))
//         .catch(err => res.status(500).json({
//             "status": "Error",
//             "message": err
//         }))
// })

// router.put('/users/:id', (req,res) => {
//     const {id} = req.params

//     User.updateOne({"_id": id}, { $set: req.body})
//         .then(user => res.json(user))
//         .catch(err=> res.status(500).json({
//             "status": "Error",
//             "message": err
//         }))
// })

// module.exports = router