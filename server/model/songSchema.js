import mongoose from 'mongoose'

//build schema
// const userSchema = new mongoose.Schema({
//   name: String
// })
//make a model
// const Users = mongoose.model('Users', userSchema)
//create data base on schema as blue print and will be inserted in Users collection in DB
// const user = new Users({
//   name: 'Ted'
// })
// user.save()


const songSchema = new mongoose.Schema({
  title: { type: String, require: true },
  src: { type: String, require: true },
  rate: { type: Number, min: 1, max: 9 },
  reviews: { type: String, timeStamp: true }
  // user: { type: mongoose.Schema.ObjectId, ref: 'Users', require: true }
})
const Song = mongoose.model('Song', songSchema)


// const song = new Song({
//   title: 'under the bed',
//   src: 'https://www.youtube.com/watch?v=l9nh1l8ZIJQ',
//   user: user

// })
// song.save()


// Song.deleteMany({ title: 'Country' }, function (err) {
//   if (err) console.log(err)
//   else mongoose.connection.close()
// })

export default Song 
