const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authentication')
const { loginValidator, registerValidator } = require('../middlewares/userRouteValidator')

const User = require('../models/User')

router.post('/login', loginValidator, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if(user){
                if(user.comparePasswordHash(password)){
                    res.json(user.generateUserObject())
                } else {
                    res.status(401).json({
                        msg: 'Password doesnt Match'
                    })
                }
            } else {
                res.status(404).json({
                    msg: 'User not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

router.post('/register', registerValidator, (req, res) => {
    const { name, email, password, active } = req.body
    const user = new User()

    user.name = name
    user.email = email
    user.active = active

    console.log(user)
    user.generatePasswordHash(password)

    user.save()
        .then( newUser => {
            res.json(newUser)
        })
        .catch( err => {
            res.status(500).json(err)
        })
})

router.get('/users',  (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ msg: err })
        })
})

router.delete('/users/:id', (req,res) => {
    const {id} = req.params
    User.deleteOne({_id:id})
        .then(user => res.json(user))
        .catch(err => res.status(500).json({
            "status": "Error",
            "message": err
        }))
})

router.patch('/users/:id', auth, (req, res)=>{
    const {active} = req.body
    console.log(active)
    User.updateOne({_id:req.params.id}, {$set: {active: active}})
    .then(user=> {
        console.log(user)
        res.json(user)})
    .catch(err =>{
        res.status(500).json
    })
})

module.exports = router

