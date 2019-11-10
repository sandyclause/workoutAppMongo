const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const cycleRouter = require('./routers/cycle')
const workoutRouter = require('./routers/workout')
const weekRouter = require('./routers/week')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(cycleRouter)
app.use(workoutRouter)
app.use(weekRouter)

app.listen(port, () => {
  console.log('server is up on port ' + port)
})