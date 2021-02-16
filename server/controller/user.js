import UserData from '../model/userSchema.js'
import songData from '../model/songSchema.js'
import jwToken from 'jsonwebtoken'
import { secret } from '../db/enviroment.js'



//user rigesteration
const userRegirter = async (req, res, next) => {
  const user = req.body
  try {
    const newUser = await UserData.create(user)
    res.status(201).send(`hi ${newUser.userName}, you successfully registered`)
  } catch (err) {
    res.send('something went wrong, please try again')
    console.log(err)
    next()
  }
}

// User login
const userLogIn = async (req, res, next) => {
  const login = req.body
  const password = req.body.password
  try {
    const checkingUserExist = await UserData.findOne({ email: req.body.email })
    //we are comparing two password, not to check if the user exist
    if (!checkingUserExist.validatePassword(password)) {
      return res.status(401).res.send('Unothrized')
    }
    const token = jwToken.sign(
      { payLoad: checkingUserExist._id },
      secret,
      { expiresIn: '24h' }
    )
    res.send(`welcome ${login.userName}... here is your Token ${token}`)

  } catch (err) {
    res.send('something wen wrong with your login')
    next(err)
  }
}
//geting all songs
const getAllSongs = async (req, res, next) => {
  const songList = await songData.find()
  try {
    res.send(songList)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}
//get one song
const getOneSong = async (req, res, next) => {
  const id = req.params.id
  try {
    const oneSong = await songData.findById(id)
    res.send(` there is the song you aske for: ${oneSong}`)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}

//post song
const postSong = async (req, res, next) => {
  const body = await req.body
  try {
    const newSong = await songData.create(body)
    res.send('you successfully created a new song')
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}
//replace one song
const replaceOneSong = async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  try {
    const replacedSong = await songData.findByIdAndReplace(id, body)
    res.send(`you have replaced all the details of ${req.body.songName} song into this ${replacedSong}`)
  } catch (err) {
    res.send('something went wrong with replaceing all details by new details')
    next()
  }
}
//delete one song
const deleteOneSong = async (req, res, next) => {
  const id = req.params.id
  try {
    const deletedSong = await songData.findByIdAndRemove(id)
    res.send(` you are successfully deleted this song: ${deletedSong}`)
  } catch (err) {
    console.log(err)
    res.send('something went wrong')
    next()
  }
}
//edit one song
const editOneSong = async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  try {
    const editedSong = await songData.findByIdAndUpdate(id, body, { new: true })
    res.send('you successfully edited this song')
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}

export default {
  userRegirter,
  userLogIn,
  getAllSongs,
  postSong,
  getOneSong,
  replaceOneSong,
  editOneSong,
  deleteOneSong
}