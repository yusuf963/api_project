import express from 'express'
import router from './view/router.js'
import bodyParser from 'body-parser'
import connectToDb from './db/connectToDd.js'
import errorHandler from './middleware/errorHandling.js'
import logger from './middleware/logger.js'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const startServer = async () => {
  //connecting via mangoose to DB
  await connectToDb()
  console.log('connecting to db')
  app.use(express.json())
  //logging request
  app.use(logger)
  //pre rute key
  app.use('/api', router)
  // error handeler middle ware
  app.use(errorHandler)
  //choosing either defult enviroment port or a 5000 port to run server
  const port = process.env.PORT || 8000
  app.listen(port, () => console.log(`server up and running on port${port}`))
}


startServer()