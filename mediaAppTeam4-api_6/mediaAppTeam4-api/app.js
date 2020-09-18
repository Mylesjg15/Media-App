const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
const newsRoutes = require('./routes/newsRoutes')

mongoose.connect(
    'mongodb://localhost:27018/mediaAppTeam4',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log('DB Connected!')
)

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', userRoutes)
app.use('/news', newsRoutes)
app.use('/messages', messageRoutes)

module.exports = app