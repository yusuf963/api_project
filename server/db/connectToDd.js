import mongoose from 'mongoose'
import { dbURI } from './enviroment.js'

const connectToDb = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  return mongoose.connect(dbURI, options)
}

export default connectToDb