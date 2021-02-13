import mongoose from 'mongoose'


const songschema = new mongoose.Schema({
  title: { type: String, require: true },
  src: { type: String, require: true }
},
  { timestamp: true }
)

export default mongoose.model('song', songschema)
