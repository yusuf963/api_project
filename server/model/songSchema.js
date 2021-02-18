import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, require: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', require: true }

}, {
  timestamps: true
})

const songSchema = new mongoose.Schema({
  title: { type: String, require: true, unique: true },
  src: { type: String, require: true },
  rate: { type: Number, min: 1, max: 9 },
  reviews: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
  comments: [commentSchema]
}, {
  timeStamp: true
})
const Song = mongoose.model('Song', songSchema)

commentSchema.plugin(uniqueValidator)
export default Song

