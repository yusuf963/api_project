import express from 'express'
import router from './view/router.js'
import bodyParser from 'body-parser'
import connectToDb from './db/connectToDd.js'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const startServer = async () => {
  connectToDb()
  app.use(express.json())

  app.use('/api', router)



  //choosing either defult enviroment port or a 5000 port to run server
  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`server up and running on port${port}`))
}


startServer()