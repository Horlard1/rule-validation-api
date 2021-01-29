const express = require('express');
const { validateRule, sendData } = require('./controller/controller');
const errorHandler = require('./middlewares/error')


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())


app.get('/', sendData)

app.post('/validate-rule', validateRule)

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})