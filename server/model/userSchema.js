import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

// song Schema
const schema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true }
})

schema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.password)
}

schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

const User = mongoose.model('User', schema)

const user = new User({
  userName: 'Henry',
  email: 'henry@gmail.com',
  password: 'hhjhjj3643'
})
// user.save()
export default User