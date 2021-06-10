const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()


const port = process.env.PORT || 4000

//Database Connection
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err) => {
    if (err) throw err
    console.log('Database Connected')
})

//Midleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//router
app.use('/author', require('./routers/author'))

app.use('/', (req, res) => {
    res.json({message: 'Welcome to My API:p'})
})

app.listen(port, () => {
    console.log('Server is running at port: ' + port)
})