import UserData from '../model/userSchema.js'
import songData from '../model/songSchema.js'
import jwToken from 'jsonwebtoken'
import { secret } from '../db/enviroment.js'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import nodeMailer from 'nodemailer'

console.log(nodeMailer)
console.log(sendgridTransport)


const transporter = nodeMailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}))
//user rigesteration
const userRegirter = async (req, res, next) => {
  // if (req.body.isAdmin) {
  //   delete req.body.isAdmin
  //   console.log('broken')
  // }
  const user = await req.body
  try {
    const newUser = await UserData.create(user)
    res.send(
      transporter.sendMail({
        to: newUser.email,
        from: 'mohammad963yusuf@gmail.com',
        subject: 'welcom',
        html: '<h1>welcome to song spirit music</h1>'
      }))
    // res.status(201).send(`hi ${newUser.userName}, you successfully registered`)
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
  const comment = req.body
  const songid = req.params.songid
  comment.user = req.currentUser
  try {
    const song = await songData.findById(songid).populate('comments.user')
    console.log('your song is ', song)
    console.log(songid)
    console.log(req.params.songid)
    if (!song) {
      res.status(404).send('not found')
    }
    song.comments.push(comment)
    const commentedOnSong = await song.save()
    res.send(commentedOnSong)
  } catch (err) {
    next(err)
  }
}
//update comment
const updateComment = async (req, res, next) => {
  const { commnetId, songId } = req.params
  const newComment = req.body
  const currentUser = req.currentUser
  try {
    const commentToUpdate = await (await songData.findById(songId)).populate('comments.user')
    if (!commentToUpdate) {
      return res.status(404).send({ message: 'Unauthorized' })
    }
    const comment = songData.comments.id(commnetId)
    if (!comment.user.equals(currentUser._id)) {
      return res.status(404).send({ message: 'Unauthorized' })
    }
    comment.set(newComment)
    const updatedComment = await songData.save()
    res.send(updatedComment)
  } catch (err) {
    next(err)
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

  postComment,
  updateComment
}
// 2 your frontend linking to watch