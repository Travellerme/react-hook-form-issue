const express = require('express')
const path = require('path')
const server = express()

const port = process.env.PORT || 8001
server.use(express.static(path.join(__dirname, '../build')))
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

server.listen(process.env.PORT || 8001, () => console.log(`Server is running on ${port} port`))
