import UserData from '../model/userSchema.js'
import songData from '../model/songSchema.js'
import jwToken from 'jsonwebtoken'
import { secret } from '../db/enviroment.js'


//user rigesteration
const userRegirter = async (req, res, next) => {
  // if (req.body.isAdmin) {
  //   delete req.body.isAdmin
  //   console.log('broken')
  // }
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
  const password = req.body.password
  try {
    const checkingUserExist = await UserData.findOne({ email: req.body.email })
    //we are comparing two password, not to check if the user exist, is a function
    if (!checkingUserExist.validatePassword(password)) {
      return res.status(401).res.send('Unothrized')
    }
    const token = jwToken.sign(
      { payLoad: checkingUserExist._id },
      secret,
      { expiresIn: '24h' }
    )
    res.send(`welcome ${checkingUserExist.userName}... here is your Token ${token}`)

  } catch (err) {
    res.send('something wen wrong with your login')
    next(err)
  }
}




//geting all songs
const getAllSongs = async (req, res, next) => {
  const songList = await songData.find().populate('user')
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
    const oneSong = await songData.findById(id).populate('user')
    res.send(` there is the song you aske for: ${oneSong}`)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}

//post song
const postSong = async (req, res, next) => {
  const body = req.body
  body.user = req.currentUser
  console.log(req.currentUser)
  try {
    const newSong = await songData.create(body)
    res.send(`you successfully created a new song, ${newSong}`)
  } catch (err) {
    res.send('something went wrongggggg')
    next()
  }
}

//delete one song
const deleteOneSong = async (req, res, next) => {
  const id = req.params.id
  const currentUser = req.currentUser
  try {
    const deletedSong = await songData.findById(id)
    if (!currentUser.isAdmin && !currentUser._id.equals(deletedSong.user)) {
      return res.status(401).send('Unauthorized')
    }

    await songData.findByIdAndRemove(id)
    res.send(` you are successfully deleted this song: ${deletedSong}`)
  } catch (err) {
    console.log(err)
    res.send('something went wrong')
    next()
  }
}
//edit one song
const updateOneSong = async (req, res, next) => {
  const id = req.params.id
  const body = req.body
  try {

    const updatedSong = await songData.findByIdAndUpdate(id, body, { new: true })
    res.send(`you successfully edited this song${updatedSong}`)
  } catch (err) {
    res.send('something went wrong')
    next()
  }
}

//post comment
const postComment = async (req, res, next) => {
  const songid = req.params.songId
  const comment = req.body
  comment.user = req.currentUser
  try {
    const song = await songData.findById(songid)
    console.log('your song is ', song)
    console.log(songid)
    console.log(req.params.songId)

    if (!song) {
      res.status(404).send('not found')
    }
    song.comment.push(comment)
    const commentedOnSong = await song.save()
    res.send(commentedOnSong)
  } catch (err) {
    next()
  }
}

export default {
  userRegirter,
  userLogIn,

  getAllSongs,
  postSong,
  getOneSong,
  updateOneSong,
  deleteOneSong,
  postComment
}
