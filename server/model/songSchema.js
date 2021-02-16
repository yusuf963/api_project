import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
  title: { type: String, require: true },
  src: { type: String, require: true },
  rate: { type: Number, min: 1, max: 9 },
  reviews: { type: String, timeStamp: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'Users', require: true }
})
const Song = mongoose.model('Song', songSchema)


export default Song 
