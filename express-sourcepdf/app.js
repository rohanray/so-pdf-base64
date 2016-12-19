const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())

app.get ('/', (request, response) => {
  response.send('This app sends PDF in base64')
})

app.get('/getBase64Pdf', (request, response) => {
  response.send(fs.readFileSync('./express-sourcepdf/lorem-ipsum.pdf').toString('base64'))
})

app.listen(5000)

exports.app = app
