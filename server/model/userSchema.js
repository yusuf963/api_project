import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

// song Schema
const userSchema = new mongoose.Schema({
  userName: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean }
})

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.password)
}

// password Confiration

// userSchema.virtual('pawwordConfirmation').set(function setPasswordConfirmation(passwordConfirmation) {
//   this._passwordConfirmation = passwordConfirmation
// })

// userSchema.pre('validate', function checkPassword(next) {
//   if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
//     this.invalidate('passwordConfirmation', 'should match password')
//   }
//   next()
// })


//password confirmaton ends here



userSchema.plugin(uniqueValidator)
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }))

const User = mongoose.model('User', userSchema)

export default User