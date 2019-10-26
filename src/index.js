const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const cycleRouter = require('./routers/cycle')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(cycleRouter)

app.listen(port, () => {
  console.log('server is up on port ' + port)
})