const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    active: {type: Boolean, required: true},
    passwordHash: { type: String, required: true }
}
// , {
//     timestamps: true
// }
)

UserSchema.statics.verifyToken = function (token) {
    return jwt.verify(token, 'abcd1234')
}

UserSchema.methods.generateToken = function() {
    const payload = {
        name: this.name,
        email: this.email
    }
    return jwt.sign(payload, 'abcd1234', {
        expiresIn: '1h'
    })
}



UserSchema.methods.generateUserObject = function() {
    return {
        email: this.email,
        name: this.name,
        active: this.active,
        token: this.generateToken()
    }
}

UserSchema.methods.generatePasswordHash = function(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    this.passwordHash = hash
}

UserSchema.methods.comparePasswordHash = function (password){
    return bcrypt.compareSync(password, this.passwordHash)
}

const User = mongoose.model('User', UserSchema)

module.exports = User