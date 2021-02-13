import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import mongooseUniqueValidato from 'mongoose-unique-validato'

// song Schema
const schema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  date: { type: Date, default: Date.now }
})

export default mongoose.model('User', schema)