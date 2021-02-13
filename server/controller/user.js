import UserData from '../model/userSchema.js'
import songData from '../model/songSchema.js'


//user registeration
const addUser = async (req, res, next) => {
  const user = req.body
  try {
    const newUser = await UserData.create(user)
    res.status(201).send(`hi ${newUser.name} you successfully registerd`)
  } catch (err) {
    res.send('something went wrong, please try again')
    console.log(err)
    next()
  }
}


//geting all songs
const getAllSongs = async (req, res, next) => {
  try {
    res.send(songData)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}
//get one song
const getOneSong = async (req, res, next) => {
  const id = req.params.id
  try {
    const oneSong = songData.findById(id)
    res.send(oneSong)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}

export default {
  addUser,
  getAllSongs,
  getOneSong,
  replaceOneSong,
  editOneSong,
  deleteOneSong
}