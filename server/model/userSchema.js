import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import mongooseUniqueValidator from 'mongoose-unique-validator'

// song Schema
const schema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true }
},
  { timestamp: true }
)

export default mongoose.model('User', schema)